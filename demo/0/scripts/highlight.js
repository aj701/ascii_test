<script type="text/javascript">
/* 
   Animated Highlighting
   Version 1.0
   September 27, 2010

   Will Bontrager
   http://www.willmaster.com/
   Copyright 2010 Bontrager Connection, LLC

   Bontrager Connection, LLC grants you 
   a royalty free license to use or modify 
   this software provided this notice appears 
   on all copies. This software is provided 
   "AS IS," without a warranty of any kind.
*/

// Three places to customize.

// Place 1 --
// What highlight shall be applied?
//   Use "b" for bold character.
//   Use "i" for italic character.
//   Use "u" for underlined character.
//   Use "o" for overlined character.
//   Specify the color (with "#") for colored 
//      character. Example: "#0000ff";

var Highlight = "o";

// Place 2 --
// How quickly shall the highlight changes occur?
//   Specify in milliseconds.

var Interval = 400;


// Place 3 --
// Specify the id value of the word/phrase to highlight.

var ID = "flash";


// No other customizations required. //
var ThisID = document.getElementById(ID);
var ThisContent = ThisID.innerHTML;
var LastCharacter = ThisContent.length - 1;
var NowPoint = -1;
var HightlightCode = new String();
Highlight = Highlight.toLowerCase();
switch(Highlight) {
   case "b" : HightlightCode = '<span style="font-weight:bold;">'; break;
   case "i" : HightlightCode = '<span style="font-style:italic;">'; break;
   case "u" : HightlightCode = '<span style="text-decoration:underline;">'; break;
   case "o" : HightlightCode = '<span style="text-decoration:overline;">'; break;
   default  : HightlightCode = '<span style="color: white'+Highlight+';">'; break;
   }

function HighlightCharacter() {
var s = new String();
NowPoint++;
if(NowPoint>LastCharacter) { NowPoint = 0; }
if(NowPoint==0) { s = HightlightCode + ThisContent.substr(0,1) + "</span>" + ThisContent.substr(1); }
else if(NowPoint==LastCharacter) { s = ThisContent.substr(0,LastCharacter) + HightlightCode + ThisContent.substr(LastCharacter) + "</span>"; }
else { s = ThisContent.substr(0,NowPoint) + HightlightCode + ThisContent.substr(NowPoint,1) + "</span>" + ThisContent.substr(NowPoint+1); }
ThisID.innerHTML = s;
}

setInterval("HighlightCharacter()",Interval);
</script>

