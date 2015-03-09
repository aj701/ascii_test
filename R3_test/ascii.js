
function ASCIIF (idNum, w, h, totalFrames, spriteURL) {
	this.id = idNum;
	this.monospcW = this.findMonoWidth(); 
	this.url = spriteURL; 
	this.h = -1; //If no valid height input, the h = -1
	this.h = h;  
	this.w = w; 
	this.spriteW = 0; 
	this.frames = totalFrames; 
/*	this.rgbData = []; //2D array: Array of Array of rgb data of each frame
	this.toneData = []; //2D array: Array of Array of tonal data of each frame*/
	this.asciiData = ""; //Array of ascii characters that make up the picture
}

ASCIIF.prototype.findMonoWidth = function() {
/*	var tempChar = document.createElement("div");
	var tempSpan = tempChar.appendChild(document.createElement("span"));
	tempSpan.appendChild(document.createTextNode("0"));
	tempSpan.id = "testWidth";
	tempChar.id = "testWidthDiv";
	document.getElementById("container").appendChild(tempChar);
	var w = document.getElementById("testWidth").width;
	document.getElementById("container").removeChild(tempChar);
	return w; */

	return 6.45;
}


ASCIIF.prototype.computeASCIIF = function() {

	//Create a image of sprite on the page, hide it. 
	var tempSprite = document.createElement("img");
	tempSprite.src = this.url; 
	tempSprite.style.display = "none";

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
	var pixels = tc.getImageData(0, 0, tempSprite.width, this.h );


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
	var aniCanvas = document.createElement("pre");
	aniCanvas.id = this.id; 
	aniCanvas.className = "ascii";
	aniCanvas.style.width = this.w+"ex"; 
	aniCanvas.style.marginBottom = 10+"em"; 
	aniCanvas.style.marginLeft = 0+"px"; 

	//Load in ascii 
	for (var i = 0; i < this.h; i++){
		aniCanvas.appendChild(document.createTextNode(this.asciiData.slice(i*this.spriteW, this.spriteW*(i+1))));
		aniCanvas.appendChild(document.createElement("br"));
	};

	document.getElementById("container").appendChild(aniCanvas);
}

ASCIIF.prototype.animateASCIIF = function() {
	var aniCanvas = document.getElementById(this.id);
}

var testImgs = []; 

window.onload = function(){
	
	
	testImgs[0] = new ASCIIF(01, 161, 120, 22, "images/8805-sm.png" );	
	testImgs[1] = new ASCIIF(02, 161, 120, 22, "images/8805-sm.png" );	

	testImgs[0].computeASCIIF();
	testImgs[0].loadASCIIF();

	testImgs[1].computeASCIIF();
	testImgs[1].loadASCIIF();


}