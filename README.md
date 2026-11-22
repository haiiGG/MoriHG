# MoriHG

MoriHG es un videojuego 2D multijugador de exploración, recolección, progresión y personalización, desarrollado como proyecto académico de DAM.

## Estado actual

- **Fase actual:** Fase 1 - Preparación del proyecto.
- **Prototipo:** single-player inicial para validar el escenario y las mecánicas base antes del multijugador.
- **Región inicial:** Bosque Esmeralda.

## Concepto

El jugador explora un mundo top-down en pixel art, recoge objetos de distintas rarezas, progresa y personaliza su parcela. El mundo principal no tiene final obligatorio; más adelante se añadirán eventos competitivos opcionales, como una búsqueda del tesoro.

## Tecnologías previstas

- **HTML5**: estructura de la interfaz.
- **CSS3**: estilos e interfaz.
- **JavaScript**: lógica del juego.
- **Canvas**: renderizado 2D.
- **Tiled**: diseño de mapas y tilesets.
- **Node.js + Socket.IO**: multijugador y eventos (fases posteriores).
- **Git/GitHub**: control de versiones.

No se añadirán tecnologías innecesarias sin justificar antes su necesidad.

## Estructura del proyecto

```text
MoriHG/
├─ client/      # Cliente web: HTML, CSS, JS, assets
├─ server/      # Servidor Node.js/Socket.IO (preparado para fases posteriores)
├─ shared/      # Constantes/datos compartidos cliente-servidor
└─ docs/        # Documentación técnica, decisiones y registro de IA
```

## Ejecución local (Fase 1)

Todavía no hay código ejecutable del juego. En las siguientes fases se documentará aquí cómo lanzar el cliente y, más adelante, el servidor.

## Documentación

- `docs/decisiones.md`: decisiones técnicas y de diseño.
- `docs/ai-log.md`: registro de uso de IA.
- `docs/arquitectura.md`: visión de la arquitectura del proyecto.

## Nota académica

Este proyecto debe demostrar funcionamiento multijugador real, comunicación entre máquinas, gestión de eventos, objetivo/ganador en minijuegos y un endpoint para gestionar/devolver resultados. La documentación debe reflejar solo tareas realmente realizadas.
