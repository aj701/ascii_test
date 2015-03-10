
function ASCIIF (idNum, w, h, totalFrames, spriteURL) {
	this.id = idNum;
	this.url = spriteURL; 
	this.h = -1; //If no valid height input, the h = -1
	this.h = h;  
	this.w = w; 
	this.spriteW = 0; 
	this.tFrames = totalFrames; 
	this.cFrame = 1; //Current frame
/*	this.rgbData = []; //2D array: Array of Array of rgb data of each frame
	this.toneData = []; //2D array: Array of Array of tonal data of each frame*/
	this.asciiData = ""; //Array of ascii characters that make up the picture
}



ASCIIF.prototype.computeASCIIF = function() {

	//Create a image of sprite on the page, hide it. 
	var tempSprite = document.createElement("img");
	tempSprite.src = this.url; 
	console.log(tempSprite.src);
	console.log("tempSprite width = " + tempSprite.width);
	//tempSprite.style.display = "none";

	//Create canvas element
	var tempCanvas = document.createElement("canvas");
	tempCanvas.width = tempSprite.width; 
	this.spriteW = tempSprite.width; 
	tempCanvas.height = this.h;

	//Draw on temporary canvas
	var tc = tempCanvas.getContext("2d");
	tc.fillStyle = "#FFFFFF";
	tc.fillRect(0, 0, tempSprite.width, this.h);
	tc.drawImage(tempSprite, 0, 0, tempSprite.width, this.h);

	//Access pixel data	
	var pixels = tc.getImageData(0, 0, tempCanvas.width, this.h );


	//every pixel gives 4 integers -> r, g, b, a
	//so length of rgbData array is W*H*4
	for (var i = 0; i < pixels.data.length; i = i+4){
		var r = pixels.data[i];
		var g = pixels.data[i+1];
		var b = pixels.data[i+2];

		//converting the pixel into grayscale
		var tone = r*0.2126 + g*0.7152 + b*0.0722; 

		var character; 
			//text for ascii art.
			//blackish = dense characters like "W", "@"
			//whitish = light characters like "`", "."
			if(tone > 250) character = " "; //almost white
			else if(tone > 230) character = "`";
			else if(tone > 200) character = ":";
			else if(tone > 175) character = "*";
			else if(tone > 150) character = "+";
			else if(tone > 125) character = "#";
			else if(tone > 50) character = "W";
			else character = "@"; //almost black

			this.asciiData = this.asciiData.concat(character);

	}

}

ASCIIF.prototype.loadASCIIF = function() {
	var aniCanvas = document.createElement("div");
	aniCanvas.className = "asciiBox";
	var asciifSprite = aniCanvas.appendChild(document.createElement("pre"));
	asciifSprite.id = this.id; 
	asciifSprite.className = "ascii";
	aniCanvas.style.width = this.w*charWidth+"px"; 
	console.log(this.w + " x " + charWidth + " = " + aniCanvas.style.width);
	aniCanvas.style.marginBottom = 10+"em"; 
	aniCanvas.style.marginLeft = 0+"px";

	//Load in ascii 
	for (var i = 0; i < this.h; i++){
		asciifSprite.appendChild(document.createTextNode(this.asciiData.slice(i*this.spriteW, this.spriteW*(i+1))));
		asciifSprite.appendChild(document.createElement("br"));
	};

	document.getElementById("container").appendChild(aniCanvas);
}

ASCIIF.prototype.animateASCIIF = function() {
	console.log(this.cFrame);

	//Check to see if page zoom / font-size has changed (jQuery)
	charWidth = $("#testWidth > span").width()/161;

	var asciifSprite = document.getElementById(this.id);

	//Check if last frame is reached, if yes, set current frame back to 0. 
	if (this.cFrame >= this.tFrames - 1 ) {
		this.cFrame = 0; 
	}
	asciifSprite.style.left = Math.ceil(-1 * this.cFrame * $("#testWidth > span").width()) + "px"; 
	this.cFrame++; 
	console.log(this.id + " is currently at frame " + this.cFrame);
}

var testImgs = []; 
var charWidth;

window.onload = function(){
	
	charWidth = $("#testWidth > span").width()/161;
	console.log("Char Width is " + charWidth);

	testImgs[0] = new ASCIIF(01, 161, 120, 9, "images/8805-sm.png" );	
	testImgs[1] = new ASCIIF(02, 160, 120, 9, "images/00002.png" );	

	testImgs[0].computeASCIIF();
	testImgs[0].loadASCIIF();

/*	testImgs[1].computeASCIIF();
	testImgs[1].loadASCIIF();*/

	setInterval( loop , 100);
	function loop() {
		testImgs[0].animateASCIIF();
		testImgs[0].animateASCIIF();
	}

}

/* jQuery */
$(document).ready(function(){
	console.log("wh0 l3t th3 pr0n out");
	console.log($("#testWidth > span").width());
});
