

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

class Point {
	x = 0;
	y = 0;
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}


var clientLocation; // Point object encapsulating X and Y positions of top left of canvas

function sendToParent(message) {
	window.top.postMessage(JSON.stringify(message))
}
window.onmessage = function(e) {
    message = JSON.parse(e.data);
	if (message.x && message.y) {
		clientLocation = message;
    }
	alert('It works!' + message);
};


