# ascii_test
testing ascii conversions based on http://thecodeplayer.com/walkthrough/cool-ascii-animation-using-an-image-sprite-canvas-and-javascript
  
##ASCIIF Object  
####Properties
- <code>ID</code>
- <code>height</code>
- <code>width</code>
- <code>frames</code>
- <code>spriteURL</code>
- <code>toneData[]</code>
- <code>rgbData[]</code>
- <code>asciiData[]</code>

####Methods
- <code>computeASCIIF()</code>
	- Create temporary canvas
	- Draw sprite and compute tonal values
	
- <code>animateASCIFF()</code> aka <code>update()</code>
	- Create a ASCIFF div
	- Output ASCIIF data
	- Animate ASCIFF 


##Sprite CSV 
	+---------+---------+---------+
	+ img url + width   + frames  +
	+---------+---------+---------+
	+ ./01.gif+ 600		+ 28      +
	+---------+---------+---------+

##Pageload Flow
<code>onload()  </code>
1. Iterate through CSV and create ASCIFF object for each entry in CSV, place all into <code>allImage[]</code> array. 
2. <code>ComputeASCIIF()</ocde> for each object in <code>allImage[]</code> array. 
3. loop: call<code>animateASCIFF();<code>