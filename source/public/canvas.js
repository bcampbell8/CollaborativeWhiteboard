
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let draw_bool = false;
let mouseX = 0;
let mouseY = 0;

const init = () => {
    context.strokeStyle = "#FF0000";
    context.lineWidth = 4;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.style.backgroundColor = "#ffffff";
    //backgroundButton.value = "#ffffff";
	console.log(context.strokeStyle);
	// console.log("init complete");
};

// Get mouse/touch coordinates
const getXY = (e) => {
    let rect = canvas.getBoundingClientRect();
    mouseX = e.pageX - rect.left;
    mouseY = e.pageY - rect.top;
};

const startDrawing = (e) => {
    draw_bool = true;
    getXY(e);
    context.beginPath();
    context.moveTo(mouseX, mouseY);
};

const drawOnCanvas = (e) => {
    if (!draw_bool) return;
    getXY(e);
    context.lineTo(mouseX, mouseY);
    context.stroke();
};

const stopDrawing = () => {
    draw_bool = false;
    context.closePath();
    // saveHistory();
};
const stopDrawingEvent = () => {
	stopDrawing();
	window.parent.document.dispatchEvent(new CustomEvent("iframeCanvas", { detail: canvas.toDataURL() }));
}



function saveHistory() {
	if (History.includes(canvas.toDataURL())) {
		return;
	}
}

function cleanCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}


canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawOnCanvas);
canvas.addEventListener("mouseup", stopDrawingEvent);
canvas.addEventListener("mouseleave", stopDrawing);

window.onload = init;





