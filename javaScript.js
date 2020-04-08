//on page load it shuffles the images
window.onload = function () {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        shuffleImg();
        localStorage.setItem("hasCodeRunBefore", true);
    }
}
//timer variables
var minutesLabel;
var secondsLabel;
var totalSeconds;
var valString;
var intreval;
//timer functions
function startTimer(){
	minutesLabel = document.getElementById("minutes");
	secondsLabel = document.getElementById("seconds");
	totalSeconds = 0;
	intreval=setInterval(setTime, 1000);

	function setTime() {
	  ++totalSeconds;
	  secondsLabel.innerHTML = pad(totalSeconds % 60);
	  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
	}

	function pad(val) {
	  var valString = val + "";
	  if (valString.length < 2) {
	    return "0" + valString;
	  } else {
	    return valString;
	  }
	}
}
//starting  function
var firstClick = 1;
function startFunction() {
    if(firstClick ==1){
    	startTimer();
	}
	firstClick++;
}
//reseting values function
function reset(){
	firstClick=1;
	minutesLabel = document.getElementById("minutes");
	secondsLabel = document.getElementById("seconds");
	secondsLabel.innerHTML = "00";
	minutesLabel.innerHTML = "00";
	clearInterval(intreval);
	shuffleImg();
	match=0;
}
var clicks = 0; //counts how may picks have been made in each turn
var firstchoice; //stores index of first card selected
var secondchoice; //stores index of second card selected
var match = 0; //counts matches made
var backcard = "p1.png"; //shows back of card when turned over
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
var faces = []; //array to store card images
faces[0] = 'm1.png';
faces[1] = 'm2.png';
faces[2] = 'm3.png';
faces[3] = 'm4.png';
faces[4] = 'm5.png';
faces[5] = 'm6.png';
faces[6] = 'm1.png';
faces[7] = 'm2.png';
faces[8] = 'm3.png';
faces[9] = 'm4.png';
faces[10]= 'm5.png';
faces[11]= 'm6.png';

function shuffleImg() {
	shuffle(faces);
	document.images[firstchoice].src = backcard;
    document.images[secondchoice].src = backcard;
    match=0;
}

var all=finish();

function choose(card) {
        if (clicks == 2) {
            return;
        }
        if (clicks == 0) {
            firstchoice = card;
            document.images[card].src = faces[card];
            clicks = 1;
        } else {
		    clicks = 2;
			secondchoice = card;
            document.images[card].src = faces[card];
            timer = setInterval("check()", 1000);
        }
}
/* Check to see if a match is made */
function check() {
    clearInterval(timer); //stop timer
    clicks = 0;
    if (faces[secondchoice] == faces[firstchoice] && secondchoice!=firstchoice) {
        match++;
        document.getElementById("matches").innerHTML = match;
        //when all the card are turned
        if(match==6){
        	all=finish();
        	Alert("YAY WON in: "+parseInt(totalSeconds / 60)+":"+totalSeconds % 60);
			clearInterval(intreval);
        }
    } else {
        document.images[firstchoice].src = backcard;
        document.images[secondchoice].src = backcard;
        return;
    }
}
function finish() {
	var all=false;
	var i;
	for (i = 0; i < faces.length; i++) { 
	    if(document.images[i]!= backcard){
	    	all=true;
	    }else{
	    	all=false;
	    	break;
	    }
	}
	return all;
}
//pops up the mini window
function Alert(intrevalo) {
  var timeoutID = window.setTimeout(alert(intrevalo), 100);
}


