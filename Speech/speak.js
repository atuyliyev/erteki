var myRec;
	var x, y;
	var dx, dy;
	var timedown=0;
	var restartTime=5551;

	var foundWord;

	// var socket;
	let speech = new p5.Speech();
	let speechRec = new p5.SpeechRec('en-US', gotSpeech);
	let lastSpeechTime=0;
	let silenceAllowed=30000;


	let doodles; 
	let offsetX = 0;
	let offsetY = 0;

	// var name;
	var button;
	var greeting;

	var readyToListen = false;
	var notRun = true;



	var myDrawingWords = ["strawberry","firetruck","fork","grass","steak","megaphone","string bean","arm","palm tree","swan","rifle","necklace","belt","asparagus","lighter","piano","tooth","dolphin","whale","couch","laptop","submarine","dragon","diamond","umbrella","fence","beard","axe","snorkel","snowflake","pig","chair","pool","basket","toothbrush","bed","camouflage","vase","the great wall of china","wheel","tractor","banana","bench","map","hot air balloon","yoga","police car","stereo","television","garden hose","crab","toilet","butterfly","aircraft carrier","face","trombone","envelope","bandage","ocean","snake","clarinet","dishwasher","wine glass","line","door","mailbox","hammer","river","calculator","leg","cello","knee","sleeping bag","grapes","sweater","squiggle","bottlecap","ceiling fan","spreadsheet","binoculars","diving board","toaster","crocodile","screwdriver","underwear","tornado","goatee","candle","castle","teddy-bear","guitar","zigzag","mosquito","campfire","skateboard","wine bottle","waterslide","rhinoceros","pineapple","stove","telephone","pliers","baseball","rake","sandwich","flying saucer","hedgehog","bowtie","triangle","compass","bracelet","camel","snowman","canoe","finger","trumpet","train","leaf","potato","panda","hot tub","hurricane","teapot","scissors","marker","blackberry","ice cream","jacket","lightning","tiger","power outlet","crown","bird","peanut","pillow","paper clip","fan","light bulb","cloud","toe","lantern","bus","brain","moustache","peas","rainbow","sun","boomerang","key","cactus","shovel","penguin","motorbike","stitches","octopus","shoe","stairs","mushroom","sink","oven","nail","stop sign","octagon","pond","saxophone","windmill","sea turtle","book","swing set","hexagon","microwave","bat","cat","mouse","bathtub","birthday cake","giraffe","mouth","fire hydrant","squirrel","passport","smiley face","bear","alarm clock","anvil","ant","van","spider","hat","golf club","barn","rabbit","computer","watermelon","animal migration","knife","purse","traffic light","remote control","hospital","clock","camera","suitcase","floor lamp","square","soccer ball","pencil","roller coaster","hockey stick","headphones","angel","phone","skull","hand","cow","baseball bat","dog","flashlight","church","hourglass","t-shirt","shorts","flip flops","eraser","matches","garden","bucket","tent","speedboat","feather","duck","frog","snail","owl","lobster","zebra","bee","house","tennis racquet","drums","broom","flamingo","circle","frying pan","elbow","hamburger","eyeglasses","calendar","donut","harp","microphone","bicycle","The Eiffel Tower","ear","basketball","mug","fireplace","tree","eye","carrot","spoon","drill","stethoscope","paintbrush","sock","streetlight","truck","shark","cannon","lion","coffee cup","keyboard","postcard","mermaid","helmet","airplane","cookie","broccoli","washing machine","horse","lighthouse","pickup truck","sword","rollerskates","apple","bush","violin","onion","skyscraper","bulldozer","flower","crayon","ladder","the mona lisa","toothpaste","sheep","bread","dumbbell","car","jail","cup","elephant","star","school bus","backpack","monkey","kangaroo","cruise ship","parachute","cooler","house plant","beach","blueberry","hot dog","lollipop","foot","parrot","popsicle","moon","sailboat","raccoon","radio","pear","ambulance","helicopter","wristwatch","pizza","pants","hockey puck","bridge","table","paint can","syringe","rain","lipstick","mountain","nose","chandelier","cake","scorpion","picture frame","dresser","fish"];

function preload(){
	  // apparently jquery is faster so we just use it but have to make sure to not
	  // use the data eslewhere before it is available 
	  // (somehow jquery doesnt seem to work as expected in p5's preload function)
	  $.getJSON('json/doodles.json',function(data){
	    doodles = data;
	    //console.log(data);
	  });
	}

	function setup(){
			// graphics stuff:
			var canvas = createCanvas(900, 2000);
			// canvas.position(0,200);

			//goodName = createInput('');
			//goodName.position(100, 100);
			//button = createButton('submit');
			//button.position(goodName.x + goodName.width, 100);
			//button.mousePressed(greet);
			//greeting = createElement('h2', 'Hi! \n What is your name?');
			//greeting.position(20, 5);
			//textAlign(CENTER);
			//textSize(50);





			// canvas = createCanvas(canvasSizeHeight, canvasSizeWidth);
			// canvas.position(0,0);
			// background(255, 255, 255);
			background(0);
			// instructions:
			//textSize(48);
			//textAlign(CENTER);

			// speechRec.onEnd = stopped;
			speechRec.continuous = true; // do continuous recognition
			// speechRec.interimResults = true; // allow partial recognition (faster, less accurate)

			// speechRec.start(); // start engine

			// client-side socket.io:
			//socket = io();

	}

	function  reset(){
		console.log("reseting");
		  speechRec = new p5.SpeechRec('en-US', gotSpeech);
		  speechRec.continuous = true; // do continuous recognition
		  // speechRec.interimResults = true; // allow partial recognition (faster, less accurate)
		  speechRec.start(); // start engine
		  //clear que for new text to come in
		  if(random(100)>40){
			  speech.cancel(); // only once rec that cancel
		    //background(clearingColor);
		  }
	}


	function draw(){
		  //if we think the speechRec stopped working
		  	if(readyToListen && notRun){
		  		speechRec.start();
		  		notRun = false;
		  		console.log('button pressed and listening!')
		  	}

		  	if(readyToListen){
		  		let now=millis();
		  		if(lastSpeechTime+silenceAllowed<now ){
		   			lastSpeechTime=millis();		
		    		reset();
			  	}
		  	}

		  	//background(255);
		  	//text((now-(lastSpeechTime+silenceAllowed))/1000,150,150);
	}

	function drawWord(word, offsetX, offsetY){
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
	    stroke([random(255),random(255), random(255)]);
	    // stroke(3);
	    strokeWeight(3);
	    noFill();
	    let x11 = oneStroke[0][index];
	    let y11 = oneStroke[1][index]
	    let x21 = oneStroke[0][index+1];
	    let y21 = oneStroke[1][index+1]
	    line(offsetX + x11, offsetY + y11, offsetX + x21, offsetY + y21);


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

	String.prototype.pluralize = function(count, plural)
	{
	  if (plural == null)
	    plural = this + 's';

	  return (count == 1 ? this : plural) 
	}

	function gotSpeech() {
		console.log("GOT SPEECH");
		lastSpeechTime=millis();
		if (speechRec.resultValue) {
			let input = speechRec.resultString.toLowerCase();
			// 'I can can'
			// speech.speak(input);
			// background(0);
			// text(input, width/2, height/2, width,height);
			console.log(input);
			inputArray = input.split(' ');
			//['I', 'can', 'can'];	
			// for(let i = 0; i < inputArray.length; i++) {
			// 	if(i > 0) {
			// 		if(input[i] == input[i-1]) inputArray.splice(i, 1);
			// 	}
			// }
			// ['I', 'can'];

			// cycle thru elements in inputArray and see if that word is in myDrawingWords
			// 

			console.log(inputArray);
			for(words in myDrawingWords){







				if(inputArray.indexOf(myDrawingWords[words]) > -1 || inputArray.indexOf(myDrawingWords[words].pluralize()) > -1){


					foundWord = myDrawingWords[words];
					console.log("found " + foundWord);
					fill(0);
					noStroke();
					rect(offsetX, offsetY, 300, 300);
					drawWord(foundWord, offsetX, offsetY);
					offsetX += 300;
					if(offsetX > (windowWidth-301)){
						offsetY+=300;
						offsetX =0;

					}

	 	
				}
			}
			
	/*
			for(var k = 0;k<myDrawingWords.length;k++){
				if(input == myDrawingWords[k]) {
					//console.log("im in the if inside the if and the for");
					fill(255);
					noStroke();
					rect(offset, 0, 300, 300);
					drawWord(input, offset);
					offset += 300;
	 				if(offset > (width - 301)){
					    offset = 0;
		  			}	
				}
			} 	
	  	*/
	  	}
	  	reset();	
	}	
	// function windowResized() {
	//   resizeCanvas(displayWidth, displayHeight);
	// }

$(document).ready(function(){
	function greet(userName){
		$('#greeting').hide();
		$('#result').show().find('h2').html('A Story by '+userName);
		readyToListen = true;
	}
	
	// on form submit
	$('#greeting-form').submit(function(e){
		e.preventDefault();
		if ($('#user-name').val().length){ 
			greet($('#user-name').val())
		}
	});
})
