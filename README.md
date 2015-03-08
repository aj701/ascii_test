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

####Methods
- <code>computeASCIIF()</code>
	- Create temporary canvas
	- Draw sprite and compute tonal values
	
- <code>animateASCIFF()</code> aka <code>update()</code>
	- Create a ASCIFF div
	- Output ASCIIF data
	- Animate ASCIFF 