/**
 * Jugador provisional para la Fase 2.
 * Tiene posición, movimiento, dibujo y colisión por rectángulo contra el mapa.
 */
export class Player {
  constructor({ x, y, image }) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.speed = 96; // píxeles por segundo
    this.image = image;

    // Hitbox más pequeña que el sprite para que el movimiento se sienta natural.
    this.hitbox = {
      offsetX: 8,
      offsetY: 16,
      width: 16,
      height: 14,
    };
  }

  getHitbox(nextX = this.x, nextY = this.y) {
    return {
      x: nextX + this.hitbox.offsetX,
      y: nextY + this.hitbox.offsetY,
      width: this.hitbox.width,
      height: this.hitbox.height,
    };
  }

  update(deltaSeconds, input, worldWidth, worldHeight, collisionMap) {
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

    const moveX = dx * this.speed * deltaSeconds;
    const moveY = dy * this.speed * deltaSeconds;

    this.moveAxis("x", moveX, worldWidth, worldHeight, collisionMap);
    this.moveAxis("y", moveY, worldWidth, worldHeight, collisionMap);
  }

  moveAxis(axis, amount, worldWidth, worldHeight, collisionMap) {
    if (amount === 0) return;

    const nextX = axis === "x" ? this.x + amount : this.x;
    const nextY = axis === "y" ? this.y + amount : this.y;

    const clampedX = Math.min(Math.max(0, nextX), worldWidth - this.width);
    const clampedY = Math.min(Math.max(0, nextY), worldHeight - this.height);

    const hitbox = this.getHitbox(clampedX, clampedY);
    const blocked =
      collisionMap?.isRectBlocked(hitbox.x, hitbox.y, hitbox.width, hitbox.height) ??
      false;

    if (!blocked) {
      this.x = clampedX;
      this.y = clampedY;
    }
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
