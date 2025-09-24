
// let canvas = document.getElementById("canvas");
// let context = canvas.getContext("2d");

// ccu stands for canvas, context, updated
// bundling these into a single object reduces the handling of parallel arrays
let ccu = [];
{
	let canvasArray = document.getElementsByClassName("canvasarea");
	// let contextArray = [];
	for (let c of canvasArray) {
		// contextArray.push(canvas.getContext("2d"));
		ccu.push({ canvas: c, context: c.getContext("2d"), updated: false });
	}
}

class globalcontext {
	static strokeStyle = "#FF0000";
	static lineWidth = 4;
	
	static totalCanvasDimensions = Math.sqrt(ccu.length);
	
	// update properties of all contexts in the context array
	static update() {
		for (let i = 0; i < ccu.length; i++) {
			ccu[i].context.strokeStyle = this.strokeStyle;
			ccu[i].context.lineWidth = this.lineWidth;
		}
	}
	
	static whichCanvas() {
		;
	}
	
	static beginPath() {
		// determine which canvas/context the mouse is on
		// then call the beginPath method on that one
	}
	
	static moveTo(x, y) {}
	
	static lineTo(x, y) {}
	
	static stroke() {}
	
	static closePath() {}
	
	static clearRect() {
		for (let i = 0; i < ccu.length; i++) {
			ccu[i].context.clearRect(0, 0, canvas.width, canvas.height)
		}
	}
}

class globalcanvas {
	
	static backgroundColour = "#ffffff";
	
	static update() {
		for (let i = 0; i < ccu.length; i++) {
			ccu[i].canvas.backgroundColour = this.backgroundColour;
		}
	}
	
	static getBoundingRect() {
		// only the `top` and `left` properties of this object are ever accessed
		// so no need to check with the bottom right canvas at all
		return ccu[0].canvas.getBoundingClientRect();
	}
	
	static listenForEvent(name, callback) {
		for (let i = 0; i < ccu.length; i++) {
			ccu[i].canvas.addEventListener(name, callback);
		}
	}
}

let draw_bool = false;
let mouseX = 0;
let mouseY = 0;

const init = () => {
    globalcontext.strokeStyle = "#FF0000";
    globalcontext.lineWidth = 4;
    // canvas.width = canvas.offsetWidth; // set canvas width to css element width
    // canvas.height = canvas.offsetHeight;
    globalcanvas.backgroundColor = "#ffffff";
    //backgroundButton.value = "#ffffff";
	// console.log("init complete");
};

// Get mouse/touch coordinates
const getXY = (e) => {
    let rect = globalcanvas.getBoundingRect();
    mouseX = e.pageX - rect.left;
    mouseY = e.pageY - rect.top;
	console.log("Mouse pos: (" + mouseX + ", " + mouseY + ")");
};

const startDrawing = (e) => {
	console.log("start draw");
	globalcontext.update();
    draw_bool = true;
    getXY(e);
    globalcontext.beginPath();
    globalcontext.moveTo(mouseX, mouseY);
};

const drawOnCanvas = (e) => {
	console.log("draw on canvas called");
    if (!draw_bool) return;
    getXY(e);
    globalcontext.lineTo(mouseX, mouseY);
    globalcontext.stroke();
	stopDrawing()
};

const checkStopDrawing = () => {
	stopDrawingEvent();
};

const stopDrawing = () => {
	console.log("stop draw called");
    draw_bool = false;
    globalcontext.closePath();
    // saveHistory();
};
// const stopDrawingEvent = () => {
	// stopDrawing();
	// window.parent.document.dispatchEvent(new CustomEvent("iframeCanvas", { detail: canvas.toDataURL() }));
// };



// function saveHistory() {
	// if (History.includes(canvas.toDataURL())) {
		// return;
	// }
// }

function cleanCanvas() {
	globalcontext.clearRect();
}


globalcanvas.listenForEvent("mousedown", startDrawing);
globalcanvas.listenForEvent("mousemove", drawOnCanvas);
globalcanvas.listenForEvent("mouseup", stopDrawing);
globalcanvas.listenForEvent("mouseleave", stopDrawing);

window.onload = init;





