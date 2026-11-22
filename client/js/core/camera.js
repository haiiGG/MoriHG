/**
 * Cámara 2D simple que sigue al jugador.
 * La cámara define qué parte del mundo se ve en el canvas.
 */
export class Camera {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
  }

  follow(target, worldWidth, worldHeight) {
    // Centra la cámara en el objetivo.
    this.x = target.x + target.width / 2 - this.width / 2;
    this.y = target.y + target.height / 2 - this.height / 2;

    // Limita la cámara a los bordes del mapa.
    const maxX = Math.max(0, worldWidth - this.width);
    const maxY = Math.max(0, worldHeight - this.height);

    this.x = Math.min(Math.max(0, this.x), maxX);
    this.y = Math.min(Math.max(0, this.y), maxY);

    // Redondeamos para evitar desenfoque en pixel art.
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }
}
