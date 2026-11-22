# Decisiones del proyecto

Este documento registra las decisiones técnicas y de diseño tomadas durante el desarrollo de MoriHG. Solo se deben incluir decisiones realmente acordadas o implementadas.

## Plantilla

### [YYYY-MM-DD] Título de la decisión

- **Fase:** 
- **Contexto:** 
- **Opciones consideradas:** 
- **Decisión:** 
- **Motivo:** 
- **Impacto:** 
- **Pendientes:** 

---

## Decisiones registradas

### [2026-11-22] Estructura inicial del proyecto

- **Fase:** Fase 1 - Preparación.
- **Contexto:** El proyecto comienza vacío y se necesita una base modular para crecer por fases.
- **Opciones consideradas:** Estructura simple solo cliente; estructura modular cliente/servidor/shared/docs.
- **Decisión:** Usar estructura modular con `client/`, `server/`, `shared/` y `docs/`.
- **Motivo:** Separar lógica, recursos, red y documentación; facilitar multijugador futuro y sustitución de assets.
- **Impacto:** Mayor orden desde el inicio, aunque algunas carpetas quedarán preparadas antes de usarse.
- **Pendientes:** Definir formato final de manifiestos y datos compartidos.

### [2026-11-22] Prototipo inicial single-player

- **Fase:** Fase 1 - Preparación.
- **Contexto:** Se quiere validar primero el escenario y funcionamiento base.
- **Decisión:** El primer prototipo será single-player.
- **Motivo:** Reducir complejidad y comprobar movimiento, mapa, cámara y colisiones antes de sincronización en red.
- **Impacto:** Socket.IO y lógica de servidor se implementarán en fases posteriores.
- **Pendientes:** Planificar Fase 4 de multijugador.

### [2026-11-22] Uso de Tiled desde el inicio

- **Fase:** Fase 1 - Preparación.
- **Contexto:** Se necesita definir cómo se construirá el mapa del Bosque Esmeralda.
- **Opciones consideradas:** JSON propio; Tiled.
- **Decisión:** Usar Tiled desde el principio.
- **Motivo:** Facilita diseñar mapas tile-based, capas y colisiones visualmente; es adecuado para un top-down 2D.
- **Impacto:** Habrá que definir convención de exportación (`.tmj`/JSON), capas y propiedades personalizadas.
- **Pendientes:** Instalar/configurar Tiled y definir la estructura del primer mapa.
