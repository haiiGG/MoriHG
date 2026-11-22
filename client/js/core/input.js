/**
 * Gestiona el estado del teclado.
 * Guardamos qué teclas están pulsadas para consultarlas en cada frame del bucle.
 */
export class Input {
  constructor() {
    this.keys = new Set();

    window.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      this.keys.add(key);

      // Evita que las flechas desplacen la página mientras jugamos.
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
        event.preventDefault();
      }
    });

    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.key.toLowerCase());
    });
  }

  isDown(...keys) {
    return keys.some((key) => this.keys.has(key));
  }
}
