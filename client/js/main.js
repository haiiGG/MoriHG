/**
 * MoriHG - Paso 2.1: Renderizado inicial del mapa del Bosque Esmeralda.
 *
 * Este archivo se encarga de:
 * 1. Cargar el mapa TMJ exportado/generado para Tiled.
 * 2. Cargar las imágenes de tilesets referenciadas por el mapa.
 * 3. Dibujar las capas visibles en un <canvas>.
 *
 * De momento NO hay movimiento, cámara ni colisiones. Eso llegará en pasos posteriores.
 */

const MAP_PATH = "assets/maps/bosque-esmeralda/bosque-esmeralda.tmj";
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const layer of map.layers) {
    if (shouldRenderLayer(layer)) {
      drawTileLayer(layer, map, tilesets);
    }
  }
}

async function main() {
  try {
    setStatus("Cargando mapa...");

    const map = await loadJson(MAP_PATH);

    canvas.width = map.width * map.tilewidth;
    canvas.height = map.height * map.tileheight;

    setStatus("Cargando tilesets...");
    const tilesets = await loadTilesets(map, MAP_PATH);

    drawMap(map, tilesets);

    setStatus(
      `Mapa cargado: ${map.width}x${map.height} tiles, ${tilesets.length} tilesets.`
    );
  } catch (error) {
    console.error(error);
    setStatus(`Error: ${error.message}`, true);
  }
}

main();
