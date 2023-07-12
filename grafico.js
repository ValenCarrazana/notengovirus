class Grafico_png {
  constructor(grafico) {
    this.posicionesCirculo = [];
    this.foto1 = grafico.loadImage('img/circulo1.png');
    this.foto2 = grafico.loadImage('img/circulo2.png');
    this.grafico = grafico;
  }

  generarCirculo() {
    const posX = random(-400, 400);
    const posY = random(-400, 400);
    const tam = random(20, 50);
    const imagen = random() > 0.5 ? this.foto1 : this.foto2;
    this.posicionesCirculo.push({ x: posX, y: posY, tam: tam, imagen: imagen });
  }

  dibujarCirculos() {
    for (let i = 0; i < this.posicionesCirculo.length; i++) {
      const pos = this.posicionesCirculo[i];
      this.grafico.image(pos.imagen, pos.x, pos.y, pos.tam, pos.tam);
    }
  }
}