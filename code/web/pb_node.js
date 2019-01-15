require('./port');
var express = require('express');
var app = express();

// http://www.sqlitetutorial.net/sqlite-nodejs/connect/
const sqlite3 = require('sqlite3').verbose();

// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// http://www.sqlitetutorial.net/sqlite-nodejs/connect/
// will create the db if it does not exist
var db = new sqlite3.Database('db/database.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the database.');
});

// https://expressjs.com/en/starter/static-files.html
app.use(express.static('static-content'));

app.listen(port, function () {
  	console.log('Example app listening on port '+port);
});

// db.close();

/* Our code */

// http://www.sqlitetutorial.net/sqlite-nodejs/query/

// get user data
app.get('/api/login/', function (req, res) {
	console.log("Entered login AJAX");
	var username = req.query.username;
	var password = req.query.password;

	let sql = 'SELECT * FROM user WHERE username=$1 AND password=$2;';
	db.all(sql, [username, password], (err, rows) => {
		var result = {};
		result["error"] = [];
		result["user"] = [];
  		if (err) {
    			result["error"] = err.message;
  		} else {
			rows.forEach((row) => {
				result["user"].push(row);
			});
		}
		res.json(result);
	});
	console.log("Done login AJAX");
});

// get user's plants
app.get('/api/getPlants/', function (req, res) {
	console.log("Requesting user's plants");
	var username = req.query.username;
	var password = req.query.password;

	let sql = 'SELECT * FROM user WHERE username=$1 AND password=$2;';
	db.all(sql, [username, password], (err, rows) => {
		var result = {};
		result["error"] = [];
		result["user"] = [];
  		if (err) {
    			result["error"] = err.message;
  		} else {
			console.log("no error in get plants authentication");
			console.log(rows); // TODO QUERY FOR PLANTS AFTER checking if user and pass in table --------
			if (rows.length != 0) {
				// "Authenticated"

				let sql = 'SELECT plantType, plantName FROM owner AS o, plant AS p WHERE o.username=p.username AND p.username=$1;';
				db.all(sql, [username], (err, rows) => {
					var result = {};
					result["error"] = [];
					result["plants"] = [];
					if (err) {
						result["error"] = err.message;
					} else {
						console.log("found some plants for: "+username);
						rows.forEach((row) => {
							result["plants"].push(row);
						});
					}
					res.json(result);
				});
			}
			// rows.forEach((row) => {
			// 	result["user"].push(row);
			// });
		}
		res.json(result);
	});
	console.log("Done getting user's plants AJAX");
});

// get a user's plants V2
app.get('/api/getPlants2/', function (req, res) {
	var username = req.query.username; //used to be query instead of body
	var password = req.query.password; //PUT uses body, GET uses query

	console.log("getPlants2 username:"+username+"password:"+password);
	if (!validateInput([username, password])) {
		console.log("Invalid Input");
		result['errors'] = "Invalid Input";
		res.json(result);
		return;
	}

	var exists = false;
	var checkedExistance;
	var result = {};

	// Check if the user exists
	let sql = 'SELECT * FROM user WHERE username=$1 AND password=$2;';
	db.get(sql, [username, password], (err, rows) => {

		result["error"] = [];
		result["user"] = [];
		result["userExists"] = [];
		result["plants"] = [];

  		if (err) {
			result["error"] = err.message;
			res.json(result);
			return;
  		}

		if (typeof rows == 'undefined') {
			console.log("cannot find plants for non existing user:"+username+"password:"+password);
			result["error"] = "cannot find plants for non existing user:"+username+"password:"+password;
			res.json(result);
			return;

		} else {
			let sql2 = 'SELECT p.plantType, p.plantName, p.plantID FROM owner AS o, plant AS p WHERE o.plantID=p.plantID AND o.username=$1;';
			db.all(sql2, [username], (err, rows) => {

				if (err) {
					result["error"] = err.message;
					res.json(result);
					return;
				} else {
					console.log("for each row in:"+rows);
					rows.forEach((row) => {
	  					result["plants"].push(row);
	  				});
					res.json(result);
					return;
				}
			});
		}
	});
});

app.put('/api/updateHistory', function (req, res){

	var pid = req.body.id;
	var d = new Date();
	var ds = d;
	var moisture = req.body.moisture;
	var temp = req.body.temp;
	var humidity = req.body.humidity;
	console.log("updateHistory in pb_node.js backend (pid="+pid+", date="+ds+", moisture="+moisture+", humidity="+humidity+", temp="+temp+")");

	var result = {};


	let sql = 'INSERT INTO history VALUES($1, $2, $3, $4, $5);';
	db.run(sql, [pid, ds, moisture, humidity, temp], (err, rows) => {
		if (err) {
			console.log(err.message);
			throw err;
		}
		console.log("done updatehistory");
		res.json(result);
	});

});

app.get('/api/getHistory', function (req, res){

	console.log("in getHistory in pb_node.js backend");

	var result = {};

	let sql = 'SELECT * FROM history';
	db.all(sql, [], (err, rows) => {
		result["history"] = [];
		if (err){
			throw err;
		}

		rows.forEach((row) => {
			console.log(row);
			result["history"].push(row);
		});
		//console.log(result);
		res.json(result);
	});
});

app.get('/api/getThreshold/', function (req, res) {

	console.log("in getOpt in pb_node.js backend");
	//var pid=req.query.plantID;
	var result = {};
	result["moisture"]=[];


	//let sql = 'SELECT optMoisture FROM optimal, plant WHERE plant.plantType=optimal.plantType AND plantplantID=$1;';
	var sql = 'SELECT optimal.optMoisture FROM optimal JOIN plant ON plant.plantType = optimal.plantType WHERE plant.plantID=1;';

	db.all(sql, [], (err, rows) => {
		if (err) {
			console.log(err.message);
			throw err;
		} else {
			console.log(rows);

			rows.forEach((row) => {
				result["moisture"].push(row);
			});
			res.json(result);
		}
	});

});

// add a new user
// you still have to login after creating accoutn tho
app.put('/api/newuser/', function (req, res) {
	var username = req.body.username; //used to be query instead of body
	var password = req.body.password; //PUT uses body, GET uses query
	var name = req.body.name;


	if (!validateInput([username, password, name])){
		console.log("Invalid Input");
		//result['errors'] = "Invalid Input";
	} else {

		var alreadyExists = false;
		var checkedExistance;
		var result = {};

		// Check if the user is in there already
		let sql = 'SELECT * FROM user WHERE username=$1 AND password=$2;';
		db.all(sql, [username, password], (err, rows) => {
			result["error"] = [];
			result["user"] = [];
			result["alreadyExists"] = [];
	  		if (err) {
					result["error"] = err.message;
	  		} else {
				rows.forEach((row) => {
					result["user"].push(row);
				});
			}
			if (result["user"].length != 0){
				alreadyExists = true;
				result["alreadyExists"].push(1);
			} else {
				result["alreadyExists"].push(0);
			}

			// Add the newuser
			if (!alreadyExists){
				let sql = 'INSERT INTO user (username, password, name) VALUES($1, $2, $3);';
				db.all(sql, [username, password, name], (err, rows) => {
					//console.log(sql);
					var result = {};
					  if (err) {
							result["error"] = err.message;
							console.log(err.message);
					  }
				});
			}
			res.json(result);
		});
	}
});

app.put('/api/changeUser/', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var name = req.body.name;


	if (!validateInput([username, password, name])){
		console.log("Invalid Input");
	} else {

		var result = {};

		if (!validateInput([username, password, name])){
			console.log("Invalid Input");
		} else {


			//dont need to check if username is in there cuz youre loggen in already
			// let sql = 'UPDATE appuser SET password=$2, name=$3 WHERE id=$1;';
			// db.all(sql, [username, password, name], (err, rows) => {
			// 		if (err) {
			// 			console.log(err.message);
			// 			throw err;
			// 		}
			// 		console.log(username);
			// 		console.log(password);
			// 		console.log(name);
			// });
			// console.log("changed pwd ot " + password);

			let sql = 'DELETE FROM user WHERE username=$1;';
			db.all(sql, [username], (err, rows) => {
				if (err) {
					console.log(err.message);
					throw err;
				}
			});

			sql = 'INSERT INTO user (username, password, name) VALUES($1, $2, $3);';
			db.all(sql, [username, password, name], (err, rows) => {
				if (err) {
					console.log(err.message);
					throw err;
				}
			});
		}
	}

});


app.put('/api/setWater/', function (req, res) {

	console.log("in setWater in pb_node.js backend");
	var pid = req.body.plantID;
	var state = req.body.state;
	console.log(pid);
	console.log(req.body);
	var result = {};


	let sql = 'UPDATE manualWater SET doWater=$1 WHERE plantID=$2;';
	db.run(sql, [state, pid], (err, rows) => {
		if (err) {
			console.log(err.message);
			throw err;
		}
	});

});


//add a user2
app.get('/api/newuser2/', function (req, res) {


	var username = req.query.username;
	var password = req.query.password;
	var name = req.query.name;

	var alreadyExists = false;

	console.log("about to add " + username);
	let sql = 'INSERT INTO user (username, password, name) VALUES($1, $2, $3);';
	db.all(sql, [username, password, name], (err, rows) => {
		if (err){
			throw err;
		}
		rows.forEach((row) => {
			console.log(row.name);
		});
	});

	console.log("doen adding " + username);
});

//add a high score
app.put('/api/newscore/', function (req, res) {
	console.log("Entered add score AJAX");
	var username = req.body.username;
	var score = req.body.score;


	if (!validateInput([username, score])){
		console.log("Invalid Input");
		//result['errors'] = "Invalid Input";
		} else {

		let sql = 'INSERT INTO scores (id, score) VALUES($1, $2);';
		db.all(sql, [username, score], (err, rows) => {
			if (err){
				throw err;
			}
		});
	}

});


//print db
app.get('/api/db/', function (req, res) {
	console.log("Entered print db AJAX");

	let sql1 = 'SELECT * FROM user';
	db.all(sql1, [], (err, rows) => {
		if (err){
			throw err;
		}
		console.log("USER:");
		rows.forEach((row) => {
			console.log(row); //row.name
		});
		console.log("");
	});

	let sql2 = 'SELECT * FROM owner';
	db.all(sql2, [], (err, rows) => {
		if (err){
			throw err;
		}
		console.log("OWNER:");
		rows.forEach((row) => {
			console.log(row); //row.name
		});
		console.log("");
	});

	let sql3 = 'SELECT * FROM plant';
	db.all(sql3, [], (err, rows) => {
		if (err){
			throw err;
		}
		console.log("PLANT:");
		rows.forEach((row) => {
			console.log(row); //row.name
		});
		console.log("");
	});

	let sql4 = 'SELECT * FROM history';
	db.all(sql4, [], (err, rows) => {
		if (err){
			throw err;
		}
		console.log("HISTORY:");
		rows.forEach((row) => {
			console.log(row); //row.name
		});
		console.log("");
	});

	let sql5 = 'SELECT * FROM optimal';
	db.all(sql5, [], (err, rows) => {
		if (err){
			throw err;
		}
		console.log("OPTIMAL:");
		rows.forEach((row) => {
			console.log(row); //row.name
		});
		console.log("");
	});

	let sql6 = 'SELECT * FROM manualWater';
	db.all(sql6, [], (err, rows) => {
		if (err){
			throw err;
		}
		console.log("MANUALWATER:");
		rows.forEach((row) => {
			console.log(row); //row.name
		});
		console.log("");
	});
});

//print scores db
app.get('/api/getScores/', function (req, res) {
	var result = {};
	console.log("Entered print scores AJAX");

	let sql = 'SELECT * FROM scores ORDER BY score DESC LIMIT 10';
	db.all(sql, [], (err, rows) => {
		result["scores"] = [];
		if (err){
			throw err;
		}

		rows.forEach((row) => {
			console.log(row);
			result["scores"].push(row);
		});
		//console.log(result);
		res.json(result);
	});
});

// get water state of a plant
app.get('/api/getState/', function (req, res) {
	var result = {};
	console.log("Entered get water state AJAX");
	var pid = req.query.id;
	console.log("getting state for plant with id: "+pid);

	let sql = 'SELECT * FROM manualWater WHERE plantID=$1';
	db.all(sql, [pid], (err, rows) => {
		result["state"] = [];
		if (err){
			throw err;
		}

		rows.forEach((row) => {
			console.log(row);
			result["state"].push(row["doWater"]);
		});
		console.log(result);
		res.json(result);
	});
});

//get history
app.get('/api/getHistory/', function (req, res) {
	var result = {};
	console.log("Entered get history AJAX");

	let sql = 'SELECT * FROM history ORDER BY recordDate ASC';
	db.all(sql, [], (err, rows) => {
		result["history"] = [];
		if (err){
			throw err;
		}

		rows.forEach((row) => {
			console.log(row);
			result["history"].push(row);
		});
		//console.log(result);
		res.json(result);
	});
});

function validateInput(inputs){
	for (let i=0; i < inputs.length; i++){
		var userinput = inputs[i];
	//var regex = new RegExp("[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]{1,20}");
	//var regex = new RegExp("[a-zA-Z0-9]*");
	//console.log("regex is " + regex);
	//console.log("match is " + userinput.match(regex) + " length is " + userinput.match(regex).length);

	// Sanitize
	//console.log(userinput + " on " + regex + " is " + regex.test(userinput));
	//console.log("length of userinput is " + userinput.length);
	//console.log("pass if statement " + userinput.match(regex).length == userinput.length);


		var letters = /^[0-9a-zA-Z]+$/;
		if(userinput.match(letters)){
		//if (regex.test(userinput) && userinput.length < 21){
		//if (userinput.match(regex).length == userinput.length && userinput.length < 21){
			//alert("fine" + i);
			/*
			if (args===null){
				func();
			} else {
				alert("args");
			}*/
		} else {
			//alert("Please only use alphanumeric characters up to 20 in length.");
			return false;
		}
	}
	//on success
	return true;
}
