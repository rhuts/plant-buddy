//imports

//my code
var game_step;
var game_redraw;
//var loggedIn;

// store user credemntials
var userId;
// Store password as well? and check it on the backend?
var password;
var name;
var history; 
//so this is global now?

stage=null;
interval=null;

function setupGame(){
	stage=new Stage(20,20,"stage");
	stage.initialize();
	document.addEventListener('keyup', myKeyPress);
}

function startGame(){
	function step(){
		//
		if (!stage.player.isDead){
			var sc = stage.step();
			document.getElementById("curr_score").innerHTML = "Score: " + sc;
			//alert("sage safhg" + stage.score);
		} else {
			pauseGame();

			// Update score
			var score = stage.score;
			alert("Oh no! You died! Your score is " + score);
			addScore(score);

			// Update views
			switchView('game', 'menu');
			document.getElementById("curr_score").innerHTML = "";

			// Setup for next game
			//loggedIn=false;
			userId=null;
			document.removeEventListener('keypress', myKeyPress);

			// Show a play again button? or logout
		}

	}

	function redraw(){
		stage.redraw();
	}

	function playerStep(){
		stage.player.update();
	}
	game_step = setInterval(step, 1000);
	player_step = setInterval(playerStep, 50);
	game_redraw = setInterval(redraw, 50);
	switchView('unpause', 'pause');
}

function pauseGame(){
	clearInterval(game_step);
	clearInterval(player_step);
	switchView('pause', 'unpause');
}

function login(){
	$.ajax({
		method: "GET",
		url: "/api/login/",
		data: {
			username: $("#loginUsername").val(),
			password: $("#loginPassword").val()
		}
	}).done(function(data){

		if(Object.keys(data["user"]).length == 0){ //if no user
			if(Object.keys(data["error"]).length == 0){ //if no errors
				document.getElementById("loginError").innerHTML = "No user with that username and password.";
			} else {
				alert(data["error"]);
			}
		//if logged in successfully
		} else {

			//Store the user credentials
			userId = $("#loginUsername").val(); // could use data as well
			name = data["user"][0]["name"];
			password = $("#loginPassword").val();

			switchView('login', 'menu')
			//$("#newuser").hide();
		}
	}).fail(function(data){
		alert("failed to perform login because of failed ajax request.");
	});
}

function addUser(){
	//alert("in add user");
	$("#createAccountButton").hide();
	$.ajax({
		method: "PUT",
		url: "/api/newuser/",
		data: {
			username: $("#newUsername").val(),
			password: $("#newPassword").val(),
			name: $("#newName").val()
		}
	}).done(function(data){
		//alert("alreadyExists:" + Object.keys(data["alreadyExists"])); WRONG
		//alert("also : " + JSON.stringify(data["alreadyExists"]));
		if(Object.keys(data["error"]).length == 0){ //if no error
			if(Object.keys(data["alreadyExists"]) == 1){ //if alreadyExists
				alert("User already Exists");
			}
		} else {
			alert(Object.keys(data["error"]));
		}
		//alert("done adding user");
		$("#createAccountButton").show();
	});
}

function changeUser(){
	$.ajax({
		method: "PUT",
		url: "/api/changeUser/",
		data: {
			username: userId,
			 password: $("#changePassword").val(),
			 name: $("#changeName").val()
		}
	}).done(function(data){
		//Theres no even data for this fam..should we have it?
		if(Object.keys(data["error"]).length == 0){ //if no error
			//alert("done changing user using AJAX");
		} else {
			alert(data["error"]);
		}
	}).fail(function(data){
		//alert("done ChangeUser");
	});

	//dontforget to change global password and name if youre storing
}

function setWater(pid, state){
	console.log("setWater(pid, state) in index.js");
	console.log("plantID is: "+pid);
	console.log("new state will be: "+state);
	$.ajax({
		method: "PUT",
		url: "/api/setWater/",
		data: {
			plantID: pid,
			state: state
		}
	}).done(function(data){
		//Theres no even data for this fam..should we have it?
		if(Object.keys(data["error"]).length == 0){ //if no error
			//alert("done changing user using AJAX");
		} else {
			alert(data["error"]);
		}
	}).fail(function(data){
		//alert("done ChangeUser");
	});

	//dontforget to change global password and name if youre storing
}



function switchView(from, to){
	$("#" + from).hide();
	$("#" + to).show();
}

function pullHistory(type){
	console.log("AJAX Pull History");
	$.ajax({
		method: "GET",
		url: "/api/getHistory/",
	}).done(function(data){
	console.log(data);
	drawHistory(data['history'], type);
	});
	
}



function showPlants(){
	switchView('menu', 'plants');
	console.log("showing plants for:"+userId+" "+password);

	$.ajax({
		method: "GET",
		url: "/api/getPlants2/",
		data: {
			username: $("#loginUsername").val(),
			password: $("#loginPassword").val()
		}
	}).done(function(data){
		//alert("done getting scores."); //not printed
		//alert(JSON.stringify(data));


		//update the inner html of the scores table with this html:
		var s = "<tr><th class=\"plantsTable\"><b>Plant Type</b></th><th class=\"plantsTable\"><b>Plant Name</b></th><th class=\"plantsTable\"><b>Manual Water</b></th>";
		console.log("received response containing plants: ");
		console.log(data)
		for (let i = 0; i < Object.keys(data["plants"]).length; i++) {
			s+="<tr><td class=\"plantsTable\">";
			curr_row = data["plants"][i];
			s+=curr_row["plantType"];

			s+="</td><td class=\"plantsTable\">";
			s+=curr_row["plantName"];

			s+="</td><td class=\"plantsTable\">";
			s+="<input class=\"box\" type=\"button\" id=\"toggleWaterButtonOn"+curr_row["plantID"]+"\" value=\"Water ON\" onclick=\"setWater("+curr_row["plantID"]+", 1)\">"
			s+="<input class=\"box\" type=\"button\" id=\"toggleWaterButtonOff"+curr_row["plantID"]+"\" value=\"Water OFF\" onclick=\"setWater("+curr_row["plantID"]+", 0)\">"

			s+="</td></tr>";

			// <input class="box" type="button" id="toggleWaterButtonOff" value="Water ON" onclick="setWater(1, 1)">
			// <input class="box" type="button" id="toggleWaterButtonOn" value="Water OFF" onclick="setWater(1, 0)">
		}
		document.getElementById("plantsTable").innerHTML = s;
		//switchView('showScoresButton', 'hideScoresButton');
	});
	// setupGame();
	// startGame();
	// document.getElementById("curr_score").innerHTML = "Score: " + 0;
}

/* accountPage */

function showAccountPage(){
	switchView('menu', 'accountPage');
	document.getElementById("yourUsername").innerHTML = userId;
	document.getElementById("yourName").innerHTML = "Your name is: " + name;
}



/* Scores */

function addScore(userScore){
	$.ajax({
		method: "PUT",
		url: "/api/newscore/",
		data: {
			username: userId,
			score: userScore
		}
	}).done(function(data){
		//alert("done addscore");
	});
}

// function hideScores(){
// 	document.getElementById("scores").innerHTML = "";
// 	switchView('hideScoresButton', 'showScoresButton');
// }

function getScores(){
	$.ajax({
		method: "GET",
		url: "/api/getScores/",
	}).done(function(data){
		//alert("done getting scores."); //not printed
		//alert(JSON.stringify(data));


		//update the inner html of the scores table with this html:
		var s = "<tr><td class=\"mytd\"><b>Name</b></td><td class=\"mytd\"><b>Score</b></td>";
		for (let i = 0; i <Object.keys(data["scores"]).length; i++) {
			s+="<tr><td class=\"mytd\">";
			curr_score = data["scores"][i];
			s+=curr_score["id"];
			s+="</td><td class=\"mytd\">";
			s+=curr_score["score"];
			s+="<td></tr>";
		}
		document.getElementById("scores").innerHTML = s;
		//switchView('showScoresButton', 'hideScoresButton');
	});
}

function getState(){
	$.ajax({
		method: "GET",
		url: "/api/getState/?id=1"
	}).done(function(data){

	});
}

function menuToStatistics(){
	switchView('menu', 'statistics');
	// getScores();
}


function printDB(){
	$.ajax({
		method: "GET",
		url: "/api/db/",
	}).done(function(data){
		//alert("done printing db");
	});
}

/* Controls */

function myKeyPress(event) {
	const keyName = event.key;
	buttonClick(keyName);
}

function buttonClick(button){
	switch(button){
		case 'q':
			//stage.player.move(-1, -1);
			stage.player.setDirection(-1, -1);
			break;

		case 'w':
			stage.player.setDirection(0, -1);
			break;

		case 'e':
			stage.player.setDirection(1, -1);
			break;

		case 'a':
			stage.player.setDirection(-1, 0);
			break;

		case 'd':
			stage.player.setDirection(1, 0);
			break;

		case 'z':
			stage.player.setDirection(-1, 1);
			break;

		case 'x':
			stage.player.setDirection(0, 1);
			break;

		case 'c':
			stage.player.setDirection(1, 1);
			break;
		}
	// Could instead do:
	// when they click, change dx dy,
	//and you move player with dx, dy in step
	//i.e. put player.move here
	//stage.player.update();
	//THIS IS RLy bad cuz u can jump over boxes
}

function validateForm(formid, errorId, func){
	var validated = true;
	for (let i=0; i < formid.length; i++){
		var userinput = $("#" + formid[i]).val();
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
			validated = false;
			//alert("Please only use alphanumeric characters up to 20 in length.");
			document.getElementById(errorId).innerHTML = "Please only use alphanumeric characters up to 20 in length."
			return false;
		}
	}
	//on success
	func();

}
