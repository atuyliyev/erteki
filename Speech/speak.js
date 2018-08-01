 var myRec;
	var x, y;
	var dx, dy;
	var timedown=0;
	var restartTime=5551;

	var foundWord;
	var foundWordKey;

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


	var myDrawingDict = {"essay": "book", "farsighted": "shark", "mug": "cup", "vermin": "spider", "rod": "arm", "sleet": "rain", "crocodile": "crocodile", "nursery": "garden", "railing": "fence", "mansion": "house", "chair": "bench", "disk": "wheel", "airliner": "airplane", "sports car": "pickup truck", "cow": "cow", "apartment": "house", "cliff": "mountain", "flask": "wine bottle", "graph": "map", "swan": "swan", "mosque": "church", "bludgeon": "cow", "nose": "nose", "shack": "house", "program": "calendar", "dressing": "bandage", "cooler": "cooler", "exit": "door", "wildcat": "lion", "whack": "nail", "sniper": "owl", "dragonfly": "spider", "string": "belt", "screwdriver": "screwdriver", "syringe": "syringe", "vase": "vase", "cowboy boot": "shoe", "print": "map", "spoon": "spoon", "fan": "fan", "scour": "rake", "knapsack": "backpack", "fall": "sink", "fur": "moustache", "ticket": "passport", "fireplace": "fireplace", "strand": "moustache", "chapel": "church", "passport": "passport", "parrot": "parrot", "asparagus": "asparagus", "dig": "sink", "list": "calendar", "satchel": "suitcase", "roadblock": "fence", "crustacean": "lobster", "settle": "sink", "saxophone": "saxophone", "burgeon": "mushroom", "mammal": "whale", "light bulb": "light bulb", "dip": "sink", "shed": "barn", "whirlwind": "tornado", "paperback": "book", "plummet": "sink", "bicycle": "bicycle", "meadow": "grass", "fence": "fence", "grasshopper": "spider", "nail": "nail", "crook": "owl", "rate": "ladder", "design": "map", "reply": "postcard", "repetition": "drill", "cactus": "cactus", "strum": "drums", "panda": "panda", "ribbon": "belt", "bully": "cow", "dial": "phone", "desktop computer": "laptop", "darkness": "cloud", "wreck": "sink", "sun": "lighthouse", "skiff": "sailboat", "trinket": "bracelet", "cell": "jail", "running shoe": "shoe", "booklet": "book", "judicious": "shark", "cagey": "shark", "net": "fence", "power outlet": "power outlet", "bird": "bird", "station wagon": "car", "flash": "lighthouse", "swimming pool": "pool", "crouch": "duck", "leg": "leg", "bowtie": "bowtie", "herb": "flower", "kangaroo": "kangaroo", "stallion": "horse", "speedboat": "speedboat", "beacon": "lantern", "remote control": "remote control", "baseball": "baseball", "sink": "sink", "box": "house", "casing": "envelope", "yellow light": "traffic light", "outbuilding": "barn", "kitty": "cat", "bow": "duck", "trial": "matches", "smoke": "cloud", "peanut": "peanut", "raccoon": "raccoon", "mussel": "lobster", "strong-arm": "cow", "hexagon": "hexagon", "pillow": "pillow", "astute": "shark", "conditioning": "drill", "wig": "moustache", "bike": "bicycle", "shovel": "shovel", "love": "triangle", "home": "house", "overpass": "bridge", "caravan": "van", "sherbet": "ice cream", "bayonet": "knife", "off-white": "camel", "strap": "belt", "kayak": "canoe", "motor": "car", "duck": "duck", "limb": "leg", "beak": "nose", "bra": "underwear", "ape": "monkey", "training": "drill", "ocean liner": "cruise ship", "eye": "eye", "serpent": "snake", "warship": "aircraft carrier", "sweater": "sweater", "flip flops": "flip flops", "frog": "frog", "camera": "camera", "crab": "crab", "ridge": "mountain", "bodice": "t-shirt", "scope": "ladder", "megaphone": "megaphone", "limousine": "car", "blueberry": "blueberry", "authorization": "passport", "hospital": "hospital", "ladybug": "spider", "entrance": "mouth", "diamond": "diamond", "door": "mouth", "company": "octopus", "trousers": "pants", "envelope": "envelope", "dishwasher": "dishwasher", "floor lamp": "floor lamp", "hockey puck": "hockey puck", "phone": "phone", "train": "train", "bullhorn": "megaphone", "rip": "rifle", "rabbit": "rabbit", "brochure": "book", "ward": "hospital", "pouch": "purse", "circle": "circle", "aircraft carrier": "aircraft carrier", "parachute": "parachute", "car": "car", "ride": "car", "work": "book", "red light": "traffic light", "turnabout": "flip flops", "cat": "cat", "wallet": "purse", "condominium": "house", "can": "bucket", "drill": "drill", "mortar": "cannon", "elbow": "elbow", "cab": "airplane", "luxury liner": "cruise ship", "criminal": "owl", "rollerskates": "rollerskates", "house plant": "house plant", "shark": "shark", "fringe": "feather", "hamburger": "hamburger", "stream": "rain", "dolphin": "dolphin", "frighten": "cow", "sphere": "circle", "carrot": "carrot", "rainstorm": "rain", "bend": "duck", "sharp": "shark", "pond": "pond", "tan": "camel", "bowl": "cup", "trumpet": "trumpet", "airplane": "airplane", "garden": "garden", "prawn": "lobster", "hog": "pig", "sailboat": "sailboat", "bunk": "bed", "spreadsheet": "spreadsheet", "rhinoceros": "rhinoceros", "lamp": "lighthouse", "vital": "key", "forest": "tree", "sword": "sword", "elephant": "elephant", "frying pan": "frying pan", "gate": "mouth", "furnace": "fireplace", "beach": "beach", "passenger car": "pickup truck", "encampment": "campfire", "map": "map", "sandwich": "sandwich", "wily": "shark", "dive": "duck", "wristwatch": "wristwatch", "encouragement": "carrot", "machine": "car", "tack": "nail", "bluff": "mountain", "waterfront": "beach", "lap": "leg", "penitentiary": "jail", "workstation": "laptop", "outline": "map", "deluge": "rain", "coat": "jacket", "counter": "table", "liner": "cruise ship", "dragon": "dragon", "shore": "beach", "assailant": "crocodile", "truck": "car", "lagoon": "pond", "parish": "church", "basket": "basket", "diary": "calendar", "vapor": "cloud", "wing": "arm", "wind": "tornado", "wine": "grapes", "cushion": "pillow", "estuary": "river", "owl": "owl", "sloop": "sailboat", "radiation": "lighthouse", "colt": "horse", "haircut": "moustache", "sickle": "knife", "flying saucer": "flying saucer", "brain": "brain", "perceptive": "shark", "terrace": "garden", "oven": "oven", "keyboard": "keyboard", "clarinet": "clarinet", "lounge": "couch", "thumb": "finger", "TV set": "television", "grand piano": "piano", "mattress": "bed", "platform": "bridge", "window": "lighthouse", "hot tub": "hot tub", "chimney": "fireplace", "bout": "matches", "main": "key", "cutter": "sailboat", "sapling": "tree", "snout": "nose", "fling": "triangle", "frond": "leaf", "auto": "car", "plaster": "bandage", "rake": "rake", "dike": "fence", "reversal": "flip flops", "answer": "postcard", "snorkel": "snorkel", "greenhouse": "garden", "snake": "snake", "flea": "spider", "bar": "table", "courtship": "triangle", "association": "octopus", "bread": "bread", "gloom": "cloud", "Eiffel": "The Eiffel Tower", "back yard": "garden", "kerosene lamp": "lantern", "drop": "sink", "automobile": "car", "evade": "duck", "sierra": "mountain", "explode": "mushroom", "stimulus": "carrot", "lingerie": "underwear", "fiddle": "violin", "proportion": "ladder", "monsoon": "rain", "volcano": "mountain", "popsicle": "popsicle", "submerge": "sink", "vessel": "sailboat", "lantern": "lighthouse", "picture frame": "picture frame", "windmill": "windmill", "square": "square", "microwave oven": "oven", "ring finger": "finger", "house": "house", "hare": "rabbit", "torch": "lantern", "spider": "spider", "hot air balloon": "hot air balloon", "society": "octopus", "the mona lisa": "the mona lisa", "zebra": "zebra", "fist": "hand", "beetle": "spider", "mollusk": "lobster", "sweatshirt": "sweater", "event": "matches", "ice cream": "ice cream", "harp": "harp", "album": "book", "canvas": "tent", "flower": "flower", "container": "cooler", "lipstick": "lipstick", "armor": "helmet", "alarm clock": "alarm clock", "crucial": "key", "race": "matches", "barley": "grass", "burglar": "owl", "cyclone": "hurricane", "smog": "cloud", "ladder": "ladder", "sound system": "stereo", "fiber": "moustache", "umbrella": "umbrella", "octopus": "octopus", "dictionary": "book", "pear": "pear", "leopard": "tiger", "cockroach": "spider", "warm-up": "drill", "loafer": "shoe", "giraffe": "giraffe", "cookie": "cookie", "pendant": "necklace", "grapes": "grapes", "skewer": "knife", "shun": "duck", "embarrass": "cow", "pup": "dog", "lollipop": "lollipop", "card": "calendar", "monkey": "monkey", "underwear": "underwear", "river": "river", "audio system": "stereo", "lemur": "monkey", "headphones": "headphones", "skateboard": "skateboard", "timer": "clock", "dumbbell": "dumbbell", "keen": "shark", "liaison": "triangle", "plane": "airplane", "swine": "pig", "U-turn": "flip flops", "turf": "grass", "castle": "castle", "porpoise": "whale", "drink": "cup", "recite": "parrot", "flood": "rain", "major": "key", "dwelling": "house", "primary": "key", "crib": "bed", "slipper": "shoe", "hook": "finger", "pizza": "pizza", "chopper": "helicopter", "carry": "bear", "scissors": "scissors", "ring": "circle", "mist": "rain", "camcorder": "camera", "zap": "microwave", "sheep": "sheep", "horse": "horse", "basketball": "basketball", "publication": "book", "jet": "airplane", "paint": "lipstick", "blossom": "flower", "leading": "key", "top": "face", "system": "ladder", "fiction": "book", "attach": "nail", "station": "television", "storm": "hurricane", "streetlight": "streetlight", "daunt": "cow", "subdue": "cow", "twister": "hurricane", "spaceship": "flying saucer", "mermaid": "mermaid", "beard": "beard", "relationship": "triangle", "shorts": "pants", "memo": "postcard", "needle": "leaf", "school bus": "school bus", "stoplight": "traffic light", "padding": "pillow", "crayon": "crayon", "part": "leg", "rifle": "rifle", "rain": "rain", "copy": "book", "stairs": "stairs", "institution": "hospital", "scalpel": "knife", "television": "television", "catamaran": "sailboat", "tunic": "jacket", "tree": "tree", "board": "table", "bed": "garden", "banana": "banana", "specs": "eyeglasses", "swindler": "owl", "stalk": "leaf", "enticement": "carrot", "light": "flashlight", "video": "television", "toe": "toe", "torrent": "rain", "tractor": "tractor", "ingenious": "shark", "bridge": "bridge", "hairstyle": "moustache", "nursing home": "hospital", "capsize": "sink", "angel": "angel", "fowl": "bird", "partnership": "octopus", "sag": "sink", "synagogue": "church", "bathtub": "bathtub", "tide": "ocean", "gale": "hurricane", "showers": "rain", "calendar": "calendar", "ray": "lighthouse", "mountain": "mountain", "microphone": "microphone", "bake": "microwave", "mic": "microphone", "potato": "potato", "trowel": "shovel", "camouflage": "camouflage", "couch": "bed", "donut": "donut", "palm tree": "palm tree", "edge": "line", "pivotal": "key", "take": "bear", "jail": "jail", "hourglass": "hourglass", "parka": "jacket", "snowflake": "snowflake", "channel": "line", "butterfly": "spider", "fundamental": "key", "pail": "bucket", "pastel": "crayon", "tornado": "hurricane", "ambulance": "ambulance", "camper": "van", "sausage": "hot dog", "zigzag": "zigzag", "tryst": "triangle", "necklace": "necklace", "visa": "passport", "mouth": "mouth", "plan": "map", "handbag": "purse", "knee": "knee", "machete": "knife", "oyster": "lobster", "sauerkraut": "broccoli", "t-shirt": "t-shirt", "stereo": "stereo", "hot dog": "hot dog", "docket": "calendar", "urn": "vase", "clock": "clock", "cleat": "shoe", "drive": "sink", "face": "face", "patio": "garden", "pineapple": "pineapple", "hedgehog": "hedgehog", "dot": "peas", "affair": "triangle", "sanctuary": "church", "convoy": "train", "ceiling fan": "ceiling fan", "text": "book", "stove": "fireplace", "memorandum": "postcard", "crate": "basket", "paintbrush": "paintbrush", "frozen yogurt": "ice cream", "bright": "lighter", "chandelier": "chandelier", "radio": "radio", "shoe": "shoe", "hard hat": "helmet", "range": "ladder", "recliner": "chair", "principal": "key", "gnat": "spider", "ratio": "ladder", "anvil": "anvil", "underpants": "pants", "filly": "horse", "jar": "vase", "cloak": "camouflage", "cougar": "lion", "bush": "bush", "wood": "tree", "rich": "lighter", "tennis racquet": "tennis racquet", "piano": "keyboard", "wool": "moustache", "skyscraper": "skyscraper", "dodge": "duck", "extent": "ladder", "triangle": "triangle", "barbed wire": "fence", "cannon": "cannon", "schooner": "sailboat", "sunny": "lighter", "bear": "bear", "coast": "beach", "pocket": "purse", "joint": "elbow", "watermelon": "watermelon", "lighter": "lighter", "compass": "compass", "report": "postcard", "pavilion": "tent", "pellet": "peas", "gem": "diamond", "bat": "bat", "dishearten": "cow", "string bean": "string bean", "sea turtle": "sea turtle", "eyebrow": "moustache", "bag": "suitcase", "yacht": "sailboat", "pickup truck": "pickup truck", "steak": "steak", "paint can": "paint can", "steam": "cloud", "knickers": "pants", "view": "eye", "sew": "stitches", "bulldozer": "bulldozer", "kiln": "oven", "sly": "shark", "puddle": "pond", "vine": "flower", "rhinestone": "diamond", "seat": "bench", "edition": "book", "lion": "lion", "computer": "computer", "sea": "ocean", "transportation": "pickup truck", "luminous": "lighter", "bee": "bee", "hammer": "hammer", "arm": "arm", "barn": "barn", "preparation": "drill", "closet": "dresser", "crawfish": "lobster", "ornament": "bracelet", "pump": "shoe", "finger": "finger", "wok": "frying pan", "wise": "shark", "boundary": "line", "baboon": "monkey", "timepiece": "wristwatch", "pirate": "owl", "tent": "tent", "discipline": "drill", "go down": "sink", "rattle": "cow", "suitcase": "suitcase", "deliver": "bear", "termite": "spider", "mailbox": "mailbox", "toothbrush": "toothbrush", "aircraft": "airplane", "key": "passport", "boomerang": "boomerang", "probing": "shark", "condo": "house", "comb": "rake", "pickup": "car", "roller": "wheel", "guitar": "guitar", "feeling": "eye", "drum": "wheel", "cot": "bed", "license": "passport", "conch": "lobster", "baseball bat": "baseball bat", "onion": "onion", "bandit": "owl", "the great wall of china": "the great wall of china", "devotion": "triangle", "puff": "cloud", "broom": "broom", "loaf": "cake", "backpack": "backpack", "roller coaster": "roller coaster", "wall": "fence", "armchair": "chair", "pot": "bucket", "motivation": "carrot", "cranium": "skull", "tennis shoe": "shoe", "pamphlet": "book", "pole": "leg", "church": "church", "call up": "phone", "table": "table", "writing": "book", "flourish": "mushroom", "convertible": "car", "belt": "sock", "decline": "sink", "lighthouse": "lighthouse", "motorbike": "motorbike", "instrument": "piano", "toothpaste": "toothpaste", "traffic light": "traffic light", "undershirt": "underwear", "yam": "potato", "submarine": "submarine", "fog": "cloud", "eraser": "eraser", "basic": "key", "helicopter": "helicopter", "basin": "pond", "crafty": "shark", "emergency room": "hospital", "swing set": "swing set", "lockup": "jail", "mike": "microphone", "ram": "sink", "squirrel": "squirrel", "dalliance": "triangle", "mind": "eye", "sunshine": "lighthouse", "tiger": "tiger", "turtleneck": "t-shirt", "craft": "sailboat", "bulb": "lighthouse", "overturn": "sink", "teapot": "teapot", "robber": "owl", "golf club": "golf club", "ordnance": "cannon", "ant": "spider", "novel": "book", "tank": "pool", "look": "face", "corset": "underwear", "seedling": "tree", "hat": "helmet", "blue-green": "apple", "cask": "bucket", "air": "face", "bikini": "underwear", "barricade": "fence", "smart": "shark", "taxi": "pickup truck", "residence": "house", "wireless": "radio", "public address system": "megaphone", "moustache": "moustache", "taupe": "camel", "canoe": "canoe", "moth": "spider", "petal": "leaf", "calculator": "calculator", "purse": "purse", "telephone": "telephone", "surface": "face", "rim": "mouth", "adultery": "triangle", "thug": "crocodile", "violin": "violin", "mouse": "mouse", "disappear": "sink", "helmet": "helmet", "traffic control": "traffic light", "fedora": "hat", "squiggle": "squiggle", "toaster": "toaster", "undergarment": "underwear", "aphid": "spider", "matches": "matches", "fruit fly": "spider", "descend": "sink", "bunny": "rabbit", "mane": "moustache", "wheel": "wheel", "ball": "basketball", "workout": "drill", "snail": "lobster", "assignment": "drill", "waterslide": "waterslide", "permit": "passport", "rail": "fence", "octagon": "octagon", "hand": "hand", "binoculars": "binoculars", "squad car": "police car", "lobster": "lobster", "canister": "bucket", "boiler": "stove", "soccer ball": "soccer ball", "dinner table": "table", "whale": "whale", "broccoli": "broccoli", "expand": "mushroom", "lower": "sink", "perennial": "flower", "weapon": "sword", "pickpocket": "owl", "ocean": "ocean", "shoot up": "mushroom", "contact": "phone", "mare": "horse", "audio": "television", "animal migration": "animal migration", "drawing": "map", "drilling": "drill", "snowman": "snowman", "eyeglasses": "eyeglasses", "outrigger": "canoe", "camel": "camel", "laptop": "laptop", "high-rise": "skyscraper", "rodent": "rabbit", "foot": "foot", "clinic": "hospital", "aspect": "face", "enterprise": "octopus", "fire hydrant": "fire hydrant", "cruise ship": "cruise ship", "marker": "marker", "timber": "tree", "flashlight": "flashlight", "note": "postcard", "impetus": "carrot", "console": "keyboard", "cup": "cup", "lake": "pool", "bench": "table", "hay": "grass", "shrine": "church", "pile": "mountain", "cub": "tiger", "about-face": "flip flops", "hockey stick": "hockey stick", "warrant": "passport", "homework": "drill", "grip": "hand", "elevation": "mountain", "wagon": "car", "mop": "broom", "pants": "pants", "game": "matches", "flamingo": "flamingo", "traffic": "truck", "bandage": "bandage", "desk": "table", "pullover": "t-shirt", "tick": "spider", "precipitation": "rain", "mugger": "owl", "elude": "duck", "clam": "lobster", "apple": "apple", "terrorize": "cow", "minicomputer": "laptop", "scallop": "lobster", "howitzer": "cannon", "message": "postcard", "bracelet": "bracelet", "police car": "police car", "lightning": "lightning", "postcard": "postcard", "mosquito": "spider", "claw": "finger", "birthday cake": "birthday cake", "sketch": "map", "glare": "lighthouse", "piglet": "pig", "manual": "keyboard", "sorbet": "ice cream", "crown": "crown", "thief": "crocodile", "hail": "rain", "chronology": "calendar", "boar": "elephant", "daylight": "lighthouse", "scooter": "motorbike", "palm": "hand", "escape": "duck", "trombone": "trombone", "pasture": "grass", "blade": "sword", "intellect": "brain", "olive": "apple", "clock radio": "alarm clock", "leaf": "leaf", "jewelry": "necklace", "cavity": "mouth", "prison": "jail", "kettle": "bucket", "hurricane": "hurricane", "slick": "shark", "microwave": "microwave", "moon": "moon", "track": "train", "campfire": "campfire", "passion": "triangle", "cloud": "cloud", "scalp": "skull", "temple": "church", "knife": "knife", "blackberry": "blackberry", "khaki": "camel", "business": "octopus", "sensible": "shark", "goatee": "goatee", "journal": "calendar", "choker": "necklace", "buffet": "table", "drums": "drums", "pliers": "pliers", "mite": "spider", "stage": "leg", "stone": "peas", "goods": "truck", "transmission": "radio", "jeep": "car", "sleeping bag": "sleeping bag", "biscuit": "cookie", "pocketbook": "purse", "rainfall": "rain", "shrimp": "lobster", "magazine": "book", "carrier": "aircraft carrier", "stand": "table", "paper clip": "paper clip", "tributary": "river", "shiny": "lighter", "tome": "book", "block": "fence", "peak": "mountain", "heater": "stove", "gauze": "bandage", "dagger": "sword", "sod": "grass", "appall": "cow", "stop sign": "stop sign", "sneaker": "shoe", "bath": "pool", "canny": "shark", "carafe": "wine bottle", "involvement": "triangle", "washing machine": "washing machine", "hospice": "hospital", "wine bottle": "wine bottle", "stitches": "stitches", "sunglasses": "eyeglasses", "infidelity": "triangle", "van": "car", "indispensable": "key", "sock": "sock", "sunlight": "sun", "groundnut": "peanut", "glimmer": "pencil", "decisive": "key", "glow": "lighthouse", "fish": "fish", "fork": "fork", "shower": "rain", "plunge": "sink", "jug": "coffee cup", "bus": "car", "slump": "sink", "patrol car": "police car", "smiley face": "smiley face", "volume": "book", "timetable": "calendar", "plume": "feather", "link": "bridge", "teddy-bear": "teddy-bear", "line": "train", "ear": "ear", "feather": "feather", "penguin": "penguin", "operating system": "spreadsheet", "skull": "skull", "stethoscope": "stethoscope", "diving board": "diving board", "bucket": "bucket", "wardrobe": "dresser", "strawberry": "strawberry", "pest": "spider", "cello": "cello", "lynx": "tiger", "cake": "cake", "wine glass": "wine glass", "grass": "moustache", "agenda": "calendar", "alarm": "clock", "toilet": "toilet", "penetrating": "shark", "pin": "nail", "pencil": "pencil", "taste": "eye", "jewel": "diamond", "sidestep": "duck", "unnerve": "cow", "textbook": "book", "pig": "pig", "slacks": "pants", "candle": "lighthouse", "sheath": "jacket", "ship": "sailboat", "tooth": "tooth", "cream": "camel", "hit": "nail", "rainbow": "rainbow", "submersible": "submarine", "yoga": "yoga", "mushroom": "mushroom", "contest": "matches", "boot": "shoe", "scrape": "rake", "drizzle": "rain", "field": "garden", "book": "book", "boom": "mushroom", "branch": "arm", "test": "matches", "headgear": "hat", "puppy": "dog", "dresser": "dresser", "picture": "map", "proliferate": "mushroom", "star": "star", "toad": "frog", "scorpion": "scorpion", "axe": "axe", "firetruck": "firetruck", "peas": "peas", "sideburn": "moustache", "frankfurter": "hot dog", "chimpanzee": "monkey", "flirtation": "triangle", "cooker": "stove", "prudent": "shark", "veil": "cloud", "pool": "pond", "shrub": "tree", "building": "house", "orangutan": "monkey", "wafer": "cookie", "bottlecap": "bottlecap", "faze": "cow", "dog": "dog", "mask": "face", "jacket": "jacket", "gorilla": "monkey", "drown": "sink", "almanac": "calendar", "tryout": "drill", "fasten": "stitches", "lineup": "calendar", "coffee cup": "coffee cup", "garden hose": "garden hose", "stick": "sink"};

	var drawingDictKeys = Object.keys(myDrawingDict);

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
			for(words in drawingDictKeys){







				if(inputArray.indexOf(drawingDictKeys[words]) > -1 || inputArray.indexOf(drawingDictKeys[words].pluralize()) > -1){

					foundWordKey = drawingDictKeys[words];
					foundWord = myDrawingDict[foundWordKey];
					console.log("found " + foundWord);
					fill(0);
					noStroke();
					rect(offsetX, offsetY, 300, 300);
					drawWord(foundWord, offsetX, offsetY);
					offsetX += 300;
					if(offsetX > 600){
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

	function keyPressed() {
	  if (keyCode === BACKSPACE) {
			clear();
			offsetY=0;
			offsetX=0;
	  }
	}

	function keyTyped() {
  if (key === 's') {
    saveCanvas();
  	}
	}


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
