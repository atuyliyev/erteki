//This sketch was written by Leon Eckert and Nouf Aljowaysir

let doodles; 

function preload(){
  $.getJSON('json/doodles.json',function(data){
    doodles = data;
    // console.log(doodles);
  });
  // doodles = loadJSON('json/doodles.json');
}

var drawings = {};
let imageList;
let image; 
let strokes = [];
let strokeColor;



function pickDrawing() {
  imageList = doodles['apple'];
  let num = Math.floor(Math.random()*5); 
  image = doodles['apple'][num];
  strokes = image.drawing; 

  stroke([random(255), random(255), random(255)]);
  strokeWeight(3);
}
function setup() {
  createCanvas(800, 800);

  // load all the drawings
  setTimeout(function(){
    pickDrawing();
  }, 500);
  
}

let currentStroke = 0;
let index = 0;
let indexnterval = 20;
let strokeInterval = 500;
let nextStroke = 0; //this will define when the next stroke should be drawn

function draw() {

  // ths is how we can draw images in side the drawn loop
  if(strokes.length > 0){
    if(millis() > nextStroke){

      let oneStroke = strokes[currentStroke];

      let x11 = oneStroke[0][index];
      let y11 = oneStroke[1][index]
      let x21 = oneStroke[0][index+1];
      let y21 = oneStroke[1][index+1]
      line(x11, y11, x21, y21);


      if(index > oneStroke[0].length - 1){
        index = 0;
        currentStroke++;
        stroke([random(255), random(255), random(255)]);

        nextStroke = millis() + strokeInterval;
      }else{
        index++;
        nextStroke = millis() + indexnterval;
      }
      if(currentStroke > strokes.length-1){
        currentStroke = 0;
        // noLoop();
      }
      
    }
  }

}



