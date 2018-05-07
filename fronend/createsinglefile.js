var fs = require('fs');
var ndjson = require('ndjson');


var words = ["strawberry","firetruck","fork","grass","steak","megaphone","string bean","arm","palm tree","swan","rifle","necklace","belt","asparagus","lighter","piano","tooth","dolphin","whale","couch","laptop","submarine","dragon","diamond","umbrella","fence","beard","axe","snorkel","snowflake","pig","chair","pool","basket","toothbrush","bed","camouflage","vase","The Great Wall of China","wheel","tractor","banana","bench","map","hot air balloon","yoga","police car","stereo","television","garden hose","crab","toilet","butterfly","aircraft carrier","face","trombone","envelope","bandage","ocean","snake","clarinet","dishwasher","wine glass","line","door","mailbox","hammer","river","calculator","leg","cello","knee","sleeping bag","grapes","sweater","squiggle","bottlecap","ceiling fan","spreadsheet","binoculars","diving board","toaster","crocodile","screwdriver","underwear","tornado","goatee","candle","castle","teddy-bear","guitar","zigzag","mosquito","campfire","skateboard","wine bottle","waterslide","rhinoceros","pineapple","stove","telephone","pliers","baseball","rake","sandwich","flying saucer","hedgehog","bowtie","triangle","compass","bracelet","camel","snowman","canoe","finger","trumpet","train","leaf","potato","panda","hot tub","hurricane","teapot","scissors","marker","blackberry","ice cream","jacket","lightning","tiger","power outlet","crown","bird","peanut","pillow","paper clip","fan","light bulb","cloud","toe","lantern","bus","brain","moustache","peas","rainbow","sun","boomerang","key","cactus","shovel","penguin","motorbike","stitches","octopus","shoe","stairs","mushroom","sink","oven","nail","stop sign","octagon","pond","saxophone","see saw","windmill","sea turtle","book","swing set","hexagon","microwave","bat","cat","mouse","bathtub","birthday cake","giraffe","mouth","fire hydrant","squirrel","passport","smiley face","bear","alarm clock","anvil","ant","van","spider","hat","golf club","barn","rabbit","computer","watermelon","animal migration","knife","purse","traffic light","remote control","hospital","clock","camera","suitcase","floor lamp","square","soccer ball","pencil","roller coaster","hockey stick","headphones","angel","cell phone","skull","hand","cow","baseball bat","dog","flashlight","church","hourglass","t-shirt","shorts","flip flops","eraser","matches","garden","bucket","tent","speedboat","feather","duck","frog","snail","owl","lobster","zebra","bee","house","tennis racquet","drums","broom","flamingo","circle","frying pan","elbow","hamburger","eyeglasses","calendar","donut","harp","microphone","bicycle","The Eiffel Tower","ear","basketball","mug","fireplace","tree","eye","carrot","spoon","drill","stethoscope","paintbrush","sock","streetlight","truck","shark","cannon","lion","coffee cup","keyboard","postcard","mermaid","helmet","airplane","cookie","broccoli","washing machine","horse","lighthouse","pickup truck","sword","rollerskates","apple","bush","saw","violin","onion","skyscraper","bulldozer","flower","crayon","ladder","The Mona Lisa","toothpaste","sheep","bread","dumbbell","car","jail","cup","elephant","star","school bus","backpack","monkey","kangaroo","cruise ship","parachute","cooler","house plant","beach","blueberry","hot dog","lollipop","foot","parrot","popsicle","moon","sailboat","raccoon","radio","pear","ambulance","helicopter","wristwatch","pizza","pants","hockey puck","bridge","table","paint can","syringe","rain","lipstick","mountain","nose","chandelier","cake","scorpion","picture frame","dresser","fish"];




function readWordPromise(word) {
	return new Promise(function(resolve, reject) {
		var drawings = [];

		fs.createReadStream("/Users/akmyrat/Desktop/images/" + word + '.ndjson')
		  .pipe(ndjson.parse())
		  .on('data', function(obj) {
		    // obj is a javascript object
		    drawings.push(obj);
		  })
		  .on('end', function() {
		  	resolve(drawings);
		  });
	})
}

var drawings = {};

Promise.all(words.map(function(word) {
	return readWordPromise(word)
		.then(function(drawingsForWord) {
			drawings[word] = drawingsForWord;
		});
}))
.then(function(){
	console.log(drawings);
	fs.writeFile('./combinedDrawings.json', JSON.stringify(drawings));
})