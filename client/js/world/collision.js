/**
 * Mapa de colisiones basado en una capa de tiles.
 * Cualquier valor distinto de 0 se considera bloqueado.
 */
export class CollisionMap {
  constructor(data, width, height, tileSize) {
    this.data = data;
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
  }

  isBlockedTile(tileX, tileY) {
    // Fuera del mapa se considera bloqueado para evitar salir por bordes.
    if (tileX < 0 || tileY < 0 || tileX >= this.width || tileY >= this.height) {
      return true;
    }

    const index = tileY * this.width + tileX;
    return this.data[index] !== 0;
  }

  /**
   * Comprueba si un rectángulo en píxeles pisa algún tile bloqueado.
   * Se usa para la hitbox del jugador.
   */
  isRectBlocked(x, y, width, height) {
    const left = Math.floor(x / this.tileSize);
    const right = Math.floor((x + width - 1) / this.tileSize);
    const top = Math.floor(y / this.tileSize);
    const bottom = Math.floor((y + height - 1) / this.tileSize);

    for (let tileY = top; tileY <= bottom; tileY += 1) {
      for (let tileX = left; tileX <= right; tileX += 1) {
        if (this.isBlockedTile(tileX, tileY)) {
          return true;
        }
      }
    }

    return false;
  }
}
