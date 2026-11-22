# Bosque Esmeralda - Mapa (Tiled)

Este mapa es la base inicial de la región Bosque Esmeralda para MoriHG.

## Archivos

- `bosque-esmeralda.tmj`: mapa en formato JSON de Tiled, listo para cargar desde el juego.

## Configuración

- **Orientación:** orthogonal
- **Tamaño de tile:** 16x16 px
- **Tamaño del mapa:** 30x20 tiles (480x320 px)
- **Tileset:** Tiny RPG - Forest (provisional, CC0)
  - Imagen: `../../tilesets/bosque-esmeralda/tiny-rpg-forest/tiny-RPG-forest-files/PNG/environment/tileset.png`

## Capas

- `ground`: suelo base.
- `paths_water`: caminos, agua, bordes.
- `decor`: decoración sin colisión.
- `collision`: colisiones (capa dedicada; se usará al implementar movimiento).
- `interactives`: objetos interactivos futuros.
- `spawn`: punto de aparición del jugador (`player_spawn`).

## Notas

- El `.tmj` fue generado como JSON compatible con Tiled porque la aplicación Tiled no está instalada en este entorno. Puede abrirse en Tiled para editarlo y volver a exportarlo.
- Al editar en Tiled, mantener **rutas relativas** y exportar como `.tmj`/JSON.
- Este mapa es un placeholder inicial: todas las celdas de `ground` usan el mismo tile de hierba y las demás capas están vacías, para preparar el pipeline antes de diseñar el mapa real.
