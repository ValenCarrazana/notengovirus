//------CLASIFICADOR-----
let classifier;
const options = { probabilityThreshold: 0.7 };
let label;
let etiqueta;
const classModel = 'https://teachablemachine.withgoogle.com/models/9_s8Spwr_/'; //url del modelo producido con Teachable Machine

//---SONIDO CONFIG------------------------------------------------------------------------------------------------
let AMP_MAX= 0.1;
let AMP_MIN= 0.01;
let IMPRIMIR = false;

//ENTRADA DE AUDIO
let mic;

//AMPLITUD
let amp;
let haySonido = false;

//...............................CONFIG GENERAL...............................
let puntos = [];
let cantidad = 1000;

let imagen;
let imagen2;
let imagen3;
let foto;
let foto1;
let foto2;
let foto3;
let foto4;

let triangulos = [];
let cantTri = 12;

let imagenesGeneradas = false;
let imagenesFijas = [];
let cantPng = 1;

let usarSegundoCodigo = Math.random() < 1;
let usarPrimerCodigo = Math.random() < 0;
let usarTercerCodigo = Math.random() < 0; // Variable para decidir qué código usar
let posicionesPredeterminadas;

if (usarPrimerCodigo) {
  posicionesPredeterminadas = [
    [400, 800, 100],
    [800, 800, 500],
    [400, 400, 990],
    [600, 390, 50],
    [800, -1 + 150, 400],
    [800, 400, 200],
    [800, 180, -50],
    [400, 400, 100],
    [80, 400, 800],
    [-100, 0, 600],
    [0, 800, 300],
    [-500, -10, 400]
    
  ];
  
} else if (usarSegundoCodigo){
  posicionesPredeterminadas = [
    [0, 0, 0], //medio grando abajo 700,700,100
    [0, 0, 1300],
    [1000, 590, 0],// MEDIO
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 600], //arroba lateral iz
    [310, 290, -100],
    [500, 0, 800], //HORIZONTal ladso a lado derecha
    [1460, 800, 90], //parte de baajo iz
    [0, 0, 0],
    [0, 0, 0]
  ];

} else if (usarTercerCodigo){
  posicionesPredeterminadas = [
    [400, 0,700], //sup arriba
    [100, 0,600], //el de el medio arriba fondo
    [100, 400,800], // chiquito ARRIBA medio
    [700, 800,100], // chiquito ARRIBA medio
    [0, 200, 700], // TERCERO
    [800, 600, 100], //medio bajo derecha
    [800, 0,500], //ESQ sup DERECHA
    [0, 800,400], //esquina de abajo izquierda
    [0, 0,300], //ESQ superior izquerda
    [800, 800,300], //ESQ INFERIOR DERECHA
    [800, 800,600], //ESQ INFERIOR DERECHA
    [0, 200, 500], //ESQ INFERIOR DERECHA  
  ];
} else {
  posicionesPredeterminadas = [
    [400, 800, 100],
    [800, 800, 500],
    [400, 400, 990],
    [600, 390, 50],
    [800, -1 + 150, 400],
    [800, 400, 200],
    [800, 180, -50],
    [400, 400, 100],
    [80, 400, 800],
    [-100, 0, 600],
    [0, 800, 300],
    [-500, -10, 400]
    
  ];
}

//..................................SETUP...................................................

function setup() {

  createCanvas(800, 800, WEBGL);
  
  classifier.classify(gotResult);
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();


  grafico = createGraphics(width/2, height/2);
  crearPuntos();
  crearTriangulos();
  carga();
}


//...............................DRAW......................................................

function draw() {

  

   //config sonido
   amp = mic.getLevel();
   haySonido = amp > AMP_MIN;

   ////////////////////////////////////


  if (usarPrimerCodigo){
   grafico.image(imagen, 0, 0, 800, 800);

  }else if(usarSegundoCodigo){
   grafico.image(imagen2, 0, 0, 800, 800); 

  }else if(usarTercerCodigo) {
   grafico.image(imagen3, 0, 0, 800, 800);

  }else {
    grafico.image(imagen2, 0, 0, 800, 800);
  }
  


  

  //dibujar graficos 
  dibujarGrafico_Circulos();
  dibujarGrafico_LetrasChinas();
  dibujarGrafico_Lineales();
 
  translate(-width / 2, -height / 2);
  
  for (let i = 0; i < cantTri; i++) {
     triangulos[i].dibujarlinea();
    triangulos[i].dibujar(grafico);
   
  }

}



//.............................TRIANGULOS........................................................

function crearTriangulos() {
  for (let i = 0; i < cantTri; i++) {
    let posiciones = posicionesPredeterminadas[i];
    let p1 = createVector(posiciones[0], posiciones[1]);
    let p2 = createVector(posiciones[0], posiciones[2]);
    let p3 = createVector(posiciones[2], posiciones[1]);
    triangulos[i] = new Triangulo([p1, p2, p3]);
  }
}

//.............................TRIANGULOS........................................................





function crearPuntos() {
  for (let i = 0; i < cantidad; i++) {
    puntos[i] = createVector(width, height);
  }
}


//..............................IMAGENES.......................................................

function carga() {
  imagen = loadImage('img/gradiente.png');
  imagen2 = loadImage('img/gradiente2.png');
  imagen3 = loadImage('img/gradiente3.png');

  //-----
  foto = loadImage('img/forma.png');
  foto1 = loadImage('img/circulo2.png');
  foto2 = loadImage('img/circulo.png');
  foto3 = loadImage('img/img.png');
  foto4 = loadImage('img/triangulo.png');
}

//..............CIRCULO.........................................................................


function dibujarGrafico_Circulos() {
  if (label == 'silbido') {
    for (let i = 0; i < cantPng; i++) {
      const posX = random(-800, 800);
      const posY = random(-800, 800);
      const tam = random(30, 40);
      const imagen = random() > 0.5 ? foto1 : foto2;

      const superposicion = verificarSuperposicion(posX, posY, tam, tam);
      if (!superposicion) {
        imagenesFijas.push({ x: posX, y: posY, tam: tam, imagen: imagen });
      }
    }
  }

  for (let i = 0; i < imagenesFijas.length; i++) {
    const { x, y, tam, imagen } = imagenesFijas[i];
    grafico.image(imagen, x, y, tam, tam);
  }
}

function dibujarGrafico_LetrasChinas() {
  if (label == 'shh') {
    for (let i = 0; i < cantPng; i++) {
      const posX = random(-800, 800);
      const posY = random(-800, 800);
      const tam = random(60, 80);
      const imagen = foto4;

      const superposicion = verificarSuperposicion(posX, posY, tam, tam);
      if (!superposicion) {
        imagenesFijas.push({ x: posX, y: posY, tam: tam, imagen: imagen });
      }
    }
  }

  for (let i = 0; i < imagenesFijas.length; i++) {
    const { x, y, tam, imagen } = imagenesFijas[i];
    grafico.image(imagen, x, y, tam, tam);
  }
}

function dibujarGrafico_Lineales() {
  if (label == 'aplauso') {
    for (let i = 0; i < cantPng; i++) {
      const posX = random(-800, 800);
      const posY = random(-800, 800);
      const tam = random(80, 90);
      const imagen = random() > 0.5 ? foto : foto3;

      const superposicion = verificarSuperposicion(posX, posY, tam, tam);
      if (!superposicion) {
        imagenesFijas.push({ x: posX, y: posY, tam: tam, imagen: imagen });
      }
    }
  }

  for (let i = 0; i < imagenesFijas.length; i++) {
    const { x, y, tam, imagen } = imagenesFijas[i];
    grafico.image(imagen, x, y, tam, tam);
  }
}

function verificarSuperposicion(posX, posY, width, height) {
  for (let i = 0; i < imagenesFijas.length; i++) {
    const pos = imagenesFijas[i];
    const distancia = dist(posX-1700, posY-1500, pos.x, pos.y);
    if (distancia < width && distancia < height) {
      return true; // Hay superposición
    }
  }

  return false; // No hay superposición
}


//--------CLASIFICADOR-------------------------------------------------------------------------------
function preload() {
  // Load SpeechCommands18w sound classifier model
  classifier = ml5.soundClassifier(classModel + 'model.json', options);
}

function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  //console.log(results);
  // Show the first label and confidence
  label = results[0].label;
  etiqueta = label;
}


