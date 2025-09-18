const express = require('express');


const app = express();


let rooms = [];



function getPage(request, response, page) {
	response.sendFile(page, {root: "."}, function (err) {
		if (err) {
			response.status(404);
			return;
		}
	});
	response.status(200);
}



app.get("/host", (request, response) => {
	getPage(request, response, "host.html");
});



app.get("/close/:id", (request, response) => {
	let roomIndex = rooms.indexOf(request.params.id);
	rooms.splice(roomIndex, 1);
	response.status(200);
});

app.get("/allrooms", (request, response) => {
	response.send(JSON.stringify(rooms));
});




app.get("/", (request, response) => {
	getPage(request, response, "main.html");
});

app.get("/join", (request, response) => {
	getPage(request, response, "participant.html");
});

app.post("/joinroom", (request, response) => {
	console.log(request.body);
});




app.listen(2211, () => {
	console.log("app listening on port 2211");
});


