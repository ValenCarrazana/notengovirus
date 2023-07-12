class Triangulo {
    constructor(puntos) {
      this.p1 = puntos[0];
      this.p2 = puntos[1];
      this.p3 = puntos[2];
  
      let dist1 = this.p1.dist(this.p2);
      let dist2 = this.p1.dist(this.p3);
      this.relacion = dist2 / dist1;
  
      let ang1 = this.p1.angleBetween(this.p2);
      let ang2 = this.p1.angleBetween(this.p3);
      this.angulo = ang2 - ang1;
  
      // this.uv1 = createVector(random(0,0.3), random(0,0.3)); 
      // this.uv2 = createVector(random(0.7,1), random(0.7,1)); 

      // this.distUV = this.uv1.dist(this.uv2);
      // this.angUV = this.uv1.angleBetween(this.uv2);
  
      // let nuevoAngulo = this.angUV + this.angulo;
      // let nuevoRadio = this.distUV * this.relacion;
      // let x = this.uv1.x + nuevoRadio * cos(nuevoAngulo);
      // let y = this.uv1.y + nuevoRadio * sin(nuevoAngulo);
      
      // this.uv3 = createVector(x, y);

      let offsetx = random(-50, 50);
      let offsety = random(-50, 50);
      this.uv1 = createVector(map(constrain(this.p1.x + offsetx, 0, width), 0, width, 0, 1), map(constrain(this.p1.y + offsety, 0, height), 0, height, 0, 1));
      this.uv2 = createVector(map(constrain(this.p2.x + offsetx, 0, width), 0, width, 0, 1), map(constrain(this.p2.y + offsety, 0, height), 0, height, 0, 1));
      this.uv3 = createVector(map(constrain(this.p3.x + offsetx, 0, width), 0, width, 0, 1), map(constrain(this.p3.y + offsety, 0, height), 0, height, 0, 1)); 
    }
    
    //  dibujar() {
    //   strokeWeight(5);
    //   stroke(0);
    //   triangle(
    //     this.p1.x,
    //     this.p1.y,
    //     this.p2.x,
    //    this.p2.y,
    //    this.p3.x,
    //    this.p3.y
    //    );
      

    //  }
    
    dibujar(imagen) {
    push();
      texture(imagen);
      textureMode(NORMAL);
      beginShape();
      vertex(this.p1.x, this.p1.y, this.uv1.x, this.uv1.y);
      vertex(this.p2.x, this.p2.y, this.uv2.x, this.uv2.y);
      vertex(this.p3.x, this.p3.y, this.uv3.x, this.uv3.y);
      endShape(CLOSE);
      pop();
      
     
    }

    dibujarlinea() {
      push();
      strokeWeight(2);
      stroke(40);
      triangle(  this.p1.x, this.p1.y, this.p2.x, this.p2.y,  this.p3.x,   this.p3.y  );
        pop();
       
      }
  }
  
  
  
  
  
  
  
  