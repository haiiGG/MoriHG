# Arquitectura de MoriHG

Este documento describe la arquitectura prevista y la que se vaya implementando. Debe actualizarse solo con información real del proyecto.

## Visión general

MoriHG se desarrollará por fases. El primer prototipo será **single-player** en navegador, usando HTML/CSS/JavaScript y Canvas. El multijugador con Node.js y Socket.IO se incorporará en fases posteriores.

## Componentes previstos

### Cliente (`client/`)

- **Responsabilidad:** renderizado, entrada de usuario, cámara, carga de mapas/assets, UI e interacción local.
- **Tecnologías:** HTML, CSS, JavaScript, Canvas.
- **Datos:** mapas exportados desde Tiled y manifiestos de assets.

### Servidor (`server/`)

- **Responsabilidad futura:** conexiones multijugador, sincronización, validación de acciones, eventos, puntuaciones y endpoint de resultados.
- **Tecnologías previstas:** Node.js, Socket.IO.
- **Estado actual:** preparado en estructura, sin implementación.

### Compartido (`shared/`)

- **Responsabilidad futura:** constantes y contratos compartidos entre cliente y servidor (IDs, rarezas, eventos, tipos).
- **Estado actual:** preparado en estructura, sin implementación.

## Organización de assets

Los recursos gráficos se guardarán en `client/assets/` separados por tipo:

- `tilesets/`: imágenes de tiles.
- `sprites/`: personajes, objetos, decoraciones.
- `maps/`: mapas exportados desde Tiled.
- `ui/`: elementos de interfaz.
- `manifests/`: metadatos y registros de recursos.

La lógica del juego debe depender de IDs/datos y no de rutas de imagen dispersas por el código.

## Mapa y Tiled

- **Herramienta:** Tiled.
- **Uso previsto:** crear el mapa del Bosque Esmeralda con capas (suelo, decoración, colisiones, objetos/interactivos, spawn).
- **Formato de exportación:** pendiente de confirmar, preferiblemente JSON compatible con Tiled (`.tmj`/`.json`).
- **Convención pendiente:** nombres de capas, propiedades personalizadas y ubicación de tilesets.

## Flujo inicial previsto (Fase 2)

1. Cargar mapa exportado de Tiled.
2. Cargar tilesets/imágenes referenciadas.
3. Dibujar capas en Canvas.
4. Actualizar entrada y movimiento del jugador.
5. Aplicar colisiones.
6. Actualizar cámara centrada en el jugador.

## Decisiones pendientes

- Formato exacto de exportación de Tiled.
- Estructura de manifiestos de assets.
- Convención de colisiones (capa de objetos, propiedad de tile o capa dedicada).
- Herramienta para servir el cliente en local durante desarrollo.
