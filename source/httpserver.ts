const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



function getPage(request, response, page: string) {
	response.sendFile(page, {root: "./public"}, function (err) {
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


app.get("/open", (request, response) => {
	response.status(200);
	response.send(shortid.generate());
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

app.get("/join/:id", (request, response) => {
	// `:id` is never used because participant.html retrieves the code from the url
	getPage(request, response, "participant.html");
});

app.post("/joinroom", (request, response) => {
	let code = request.body.code;
	response.redirect(`/join/${code}`);
});




app.listen(2211, () => {
	console.log("app listening on port 2211");
});

