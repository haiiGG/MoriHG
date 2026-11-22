/**
 * Jugador provisional para la Fase 2.
 * Por ahora solo tiene posición, movimiento y dibujo del sprite.
 * Las colisiones se añadirán en el siguiente paso.
 */
export class Player {
  constructor({ x, y, image }) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.speed = 96; // píxeles por segundo
    this.image = image;
  }

  update(deltaSeconds, input, worldWidth, worldHeight) {
    let dx = 0;
    let dy = 0;

    if (input.isDown("arrowup", "w")) dy -= 1;
    if (input.isDown("arrowdown", "s")) dy += 1;
    if (input.isDown("arrowleft", "a")) dx -= 1;
    if (input.isDown("arrowright", "d")) dx += 1;

    // Normaliza el movimiento diagonal para no ir más rápido en diagonal.
    if (dx !== 0 && dy !== 0) {
      const diagonalFactor = Math.SQRT1_2;
      dx *= diagonalFactor;
      dy *= diagonalFactor;
    }

    this.x += dx * this.speed * deltaSeconds;
    this.y += dy * this.speed * deltaSeconds;

    // Limita al jugador dentro del mundo.
    this.x = Math.min(Math.max(0, this.x), worldWidth - this.width);
    this.y = Math.min(Math.max(0, this.y), worldHeight - this.height);
  }

  draw(ctx) {
    if (this.image) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      return;
    }

    // Fallback por si no carga el sprite.
    ctx.fillStyle = "#ff5ca8";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
