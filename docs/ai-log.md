# Registro de uso de IA

Este documento registra el uso de agentes de inteligencia artificial durante el desarrollo de MoriHG. No debe contener tareas inventadas; solo trabajo realmente realizado.

## Plantilla de entrada

### [YYYY-MM-DD HH:MM] Título breve

- **Herramienta/Agente:** 
- **Fase:** 
- **Tarea solicitada:** 
- **Prompt o resumen del prompt:** 
- **Resultado obtenido:** 
- **Decisiones tomadas por el estudiante:** 
- **Errores encontrados:** 
- **Soluciones aplicadas:** 
- **Archivos afectados:** 
- **Verificación:** 

---

## Entradas

### [2026-11-22] Inspección inicial y propuesta de Fase 1

- **Herramienta/Agente:** OpenCode (modelo big-pickle).
- **Fase:** Fase 1 - Preparación.
- **Tarea solicitada:** Examinar el proyecto vacío, proponer estructura, configuración, organización de assets y primeros pasos del Bosque Esmeralda.
- **Prompt o resumen del prompt:** El usuario proporcionó el contexto general de MoriHG y pidió no programar todavía; revisar directorio, herramientas, proponer estructura, instalación/configuración, organización de recursos y primeros pasos.
- **Resultado obtenido:** Se identificó que el directorio estaba vacío, sin repo Git; se detectaron Node.js, npm.cmd y Git; se propuso estructura modular y plan inicial.
- **Decisiones tomadas por el estudiante:** Aprobar estructura propuesta; crear repo Git local llamado MoriHG; crear `.gitignore`, `README.md` y plantillas en `docs/`; usar Tiled desde el inicio; prototipo inicial single-player; sin imágenes aún, estilo pixel art top-down tipo Pokémon 2D.
- **Errores encontrados:** `npm` en PowerShell bloqueado por política de ejecución (`npm.ps1`); se comprobó que `npm.cmd` funciona.
- **Soluciones aplicadas:** Usar `npm.cmd`/CMD para npm cuando sea necesario.
- **Archivos afectados:** `docs/ai-log.md` (este registro).
- **Verificación:** Comprobación con listado de directorio, `git status`, versiones de Node/npm.cmd/Git.
