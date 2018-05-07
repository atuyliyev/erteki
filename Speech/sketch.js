//This sketch was written with kind help from Leon Eckert and Nouf Aljowaysir

let doodles; 

function preload(){
  // apparently jquery is faster so we just use it but have to make sure to not
  // use the data eslewhere before it is available 
  // (somehow jquery doesnt seem to work as expected in p5's preload function)
  $.getJSON('json/doodles.json',function(data){
    doodles = data;
    console.log(data);
  });
}

function setup() {
  // createCanvas(1600, 800);
}

// Dear Akmyrat, 
// this function is designed to be used in events that are triggered, 
// but does not do all that well in the good old draw loop
// you can call it for example when a new word that's said is detected
// or as we do, in this example script, on mousePressed (see at bottom)
function drawWord(word, offset){
  // background(255);

  // here we get the drawing of the particular word
  let strokeData = doodles[word];
  // pick a random number
  let randomIndex = Math.floor(Math.random()*strokeData.length);
  // and slelect just ONE random drawing of the word:
  let drawing = strokeData[randomIndex].drawing;

  let indexInterval = 20; // this is the interval between lines (within a stroke)
  let strokeInterval = 100; // this is the interval between strokes (aka when the pen is lifted)

  // we call this function once, it then draw the first stroke (line of a stroke)
  // it then calls itself to draw the next one
  // and does that until there is no more stroke left to draw

  // these two keep track of where in the drawing we are, 
  // these two variables are changed consistently inside this drawStroke() function
  // e.g. they are increased so that we draw the subsequent stroke.
  let currentStroke = 0;
  let index = 0;

  function drawStroke(){
    // picks the current stroke
    let oneStroke = drawing[currentStroke];

    // when the drawing is done we just return
    // which means the rest of this function doesnt execute
    // which means the function will not call itself again
    if(oneStroke == undefined) return;

    // we draw lines from point (index) to the next (index+1)
    // stroke([random(255),random(255), random(255)]);
    stroke(0);
    strokeWeight(3);
    noFill();
    let x11 = oneStroke[0][index];
    let y11 = oneStroke[1][index]
    let x21 = oneStroke[0][index+1];
    let y21 = oneStroke[1][index+1]
    line(offset + x11, y11, offset + x21, y21);


    if(index > oneStroke[0].length - 1){
      // if the current stroke doesnt have any more line element left
      // we reset index (so that in the next stroke in points to the first line element)
      index = 0;
      // we increase currentStroke, so we continue to draw the next stroke
      // when this function is called again
      currentStroke++;
      // stroke([random(255),random(255), random(255)]);
      // we call this function again, 
      // but only after the time we defined above
      // that should pass in between pen lifts (strokes)
      setTimeout(function(){
        drawStroke();
      }, strokeInterval);

    }else{
      // if there is still line elements that need to be drawn for the current stroke
      // we just increase the index
      index++;
      // and call this function again with the line interval defined above
      setTimeout(function(){
        drawStroke();
      }, indexInterval);
    }
  }

  // here we inititalise the whole drawing:
  drawStroke();
}


// an event!
let offset = 0;
function mousePressed(){
  
  fill(255);
  noStroke();
  rect(offset, 0, 300, 300);

  drawWord("cat", offset);
  offset += 300;
  if(offset > (width - 301)){
    offset = 0;
  }
}