/**
 * MoriHG - Paso 2.2a: renderizado del mapa, jugador, movimiento y cámara.
 *
 * Este archivo se encarga de:
 * 1. Cargar el mapa TMJ y sus tilesets.
 * 2. Crear el jugador y la cámara.
 * 3. Ejecutar el bucle de juego: actualizar y dibujar en cada frame.
 *
 * Todavía NO hay colisiones. Se implementarán en el siguiente paso.
 */

import { Camera } from "./core/camera.js";
import { Input } from "./core/input.js";
import { Player } from "./entities/player.js";

const MAP_PATH = "assets/maps/bosque-esmeralda/bosque-esmeralda.tmj";
const PLAYER_SPRITE_PATH =
  "assets/tilesets/bosque-esmeralda/tiny-rpg-forest/tiny-RPG-forest-files/PNG/sprites/hero/idle/hero-idle-front/hero-idle-front.png";

// Tamaño de la ventana visible del juego (en píxeles del mundo).
// El CSS escala el canvas manteniendo el pixel art nítido.
const VIEWPORT_WIDTH = 320;
const VIEWPORT_HEIGHT = 192;
const canvas = document.getElementById("game-canvas");
const statusEl = document.getElementById("status");
const ctx = canvas.getContext("2d");

// Desactiva el suavizado para que el pixel art se vea nítido.
ctx.imageSmoothingEnabled = false;

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#ff9f9f" : "#8fd694";
}

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${url} (${response.status})`);
  }
  return response.json();
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`No se pudo cargar la imagen: ${url}`));
    image.src = url;
  });
}

/**
 * Convierte rutas relativas del TMJ (relativas al archivo del mapa)
 * en URLs utilizables por el navegador desde index.html.
 */
function resolveMapAssetPath(mapPath, assetPath) {
  return new URL(assetPath, new URL(mapPath, window.location.href)).href;
}

async function loadTilesets(map, mapPath) {
  const loadedTilesets = [];

  for (const tileset of map.tilesets) {
    if (!tileset.image) {
      // Los tilesets externos (.tsx/.tsj) se tratarían aquí más adelante.
      throw new Error(`Tileset "${tileset.name}" no tiene imagen embebida en el TMJ.`);
    }

    const imageUrl = resolveMapAssetPath(mapPath, tileset.image);
    const image = await loadImage(imageUrl);

    loadedTilesets.push({
      ...tileset,
      imageElement: image,
    });
  }

  // Ordenamos por firstgid para buscar rápidamente a qué tileset pertenece un GID.
  loadedTilesets.sort((a, b) => a.firstgid - b.firstgid);
  return loadedTilesets;
}

function findTilesetForGid(tilesets, gid) {
  let found = null;
  for (const tileset of tilesets) {
    if (gid >= tileset.firstgid) {
      found = tileset;
    } else {
      break;
    }
  }
  return found;
}

/**
 * Dibuja un tilelayer de Tiled.
 * Un GID (Global ID) identifica un tile dentro de todos los tilesets del mapa.
 * GID 0 significa celda vacía.
 */
function drawTileLayer(layer, map, tilesets) {
  const { tilewidth: tileWidth, tileheight: tileHeight, width: mapWidth } = map;

  for (let index = 0; index < layer.data.length; index += 1) {
    const rawGid = layer.data[index];
    if (rawGid === 0) continue;

    // Tiled puede codificar flips en bits altos. Por ahora los limpiamos.
    const gid = rawGid & 0x0fffffff;
    if (gid === 0) continue;

    const tileset = findTilesetForGid(tilesets, gid);
    if (!tileset) continue;

    const localId = gid - tileset.firstgid; // Índice del tile dentro del tileset
    const tilesPerRow = tileset.columns;

    const sourceX = (localId % tilesPerRow) * tileset.tilewidth;
    const sourceY = Math.floor(localId / tilesPerRow) * tileset.tileheight;

    const destX = (index % mapWidth) * tileWidth;
    const destY = Math.floor(index / mapWidth) * tileHeight;

    ctx.drawImage(
      tileset.imageElement,
      sourceX,
      sourceY,
      tileset.tilewidth,
      tileset.tileheight,
      destX,
      destY,
      tileWidth,
      tileHeight
    );
  }
}

function shouldRenderLayer(layer) {
  if (!layer.visible) return false;
  if (layer.type !== "tilelayer") return false;
  // La capa collision es para lógica de juego; no la dibujamos en esta vista normal.
  if (layer.name === "collision") return false;
  return true;
}

function drawMap(map, tilesets) {
  for (const layer of map.layers) {
    if (shouldRenderLayer(layer)) {
      drawTileLayer(layer, map, tilesets);
    }
  }
}

function getSpawnPoint(map) {
  const spawnLayer = map.layers.find((layer) => layer.name === "spawn");
  const spawnObject = spawnLayer?.objects?.find(
    (object) => object.name === "player_spawn"
  );

  if (spawnObject) {
    return { x: spawnObject.x, y: spawnObject.y - (spawnObject.height || 0) };
  }

  return { x: 128, y: 128 };
}

async function main() {
  try {
    setStatus("Cargando mapa...");

    const [map, playerImage] = await Promise.all([
      loadJson(MAP_PATH),
      loadImage(PLAYER_SPRITE_PATH),
    ]);

    const worldWidth = map.width * map.tilewidth;
    const worldHeight = map.height * map.tileheight;

    canvas.width = VIEWPORT_WIDTH;
    canvas.height = VIEWPORT_HEIGHT;

    setStatus("Cargando tilesets...");
    const tilesets = await loadTilesets(map, MAP_PATH);

    const spawn = getSpawnPoint(map);
    const player = new Player({ x: spawn.x, y: spawn.y, image: playerImage });
    const camera = new Camera(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    const input = new Input();

    let lastTime = performance.now();

    function gameLoop(currentTime) {
      const deltaSeconds = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      player.update(deltaSeconds, input, worldWidth, worldHeight);
      camera.follow(player, worldWidth, worldHeight);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(-camera.x, -camera.y);

      drawMap(map, tilesets);
      player.draw(ctx);

      ctx.restore();

      requestAnimationFrame(gameLoop);
    }

    setStatus(
      `Mapa listo: ${map.width}x${map.height} tiles. Usa WASD o flechas para moverte.`
    );
    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.error(error);
    setStatus(`Error: ${error.message}`, true);
  }
}

main();
