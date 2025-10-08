import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }));


function getPage(request, response, page: string) {
	console.log("getpage entered");
	response.sendFile(page, {root: "../client/dist"}, (err) => { response.status(404); console.log("getpage err"); });
	console.log("file sent");
	response.status(200);
}



app.get("/", (request, response) => {
	getPage(request, response, "main.html");
});



app.get("/host", (request, response) => {
	getPage(request, response, "host.html");
});

// host will need additional button to close room
app.get("/close/:id", (request, response) => {
	let roomIndex = rooms.indexOf(request.params.id);
	rooms.splice(roomIndex, 1);
	response.status(200);
});


app.get("/join/:id", (request, response) => {
	// `:id` is never used because participant.html retrieves the code from the url
	getPage(request, response, "participant.html");
});

app.post("/joinroom", (request, response) => {
	let code = request.body.code;
	response.redirect(`/join/${code}`);
});


// page dependencies
// participant and host canvas js
app.get("/canvas.js", (request, response) => {
	getPage(request, response, "canvas.js");
});
// participant and host central html
app.get("/body.html", (request, response) => {
	getPage(request, response, "body.html");
});




// tests -------------------------------------

app.get("/test", (req, res) => {
	console.log("/test requested");
	getPage(req, res, "index.html");
});

app.get("/index-CTMzIyRX.js", (req, res) => {
	console.log("js requested");
	getPage(req, res, "assets/index-CTMzIyRX.js");
});


// -------------------------------------------



app.listen(2211, () => {
	console.log("Http server listening on port 2211");
});

