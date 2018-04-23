var min;
var sec;

var minElement = document.getElementById("minute");
var secElement = document.getElementById("second");
var btnStartElement = document.getElementById("btn-start");
var btnPauseElement = document.getElementById("btn-pause")
var btnRestartElement = document.getElementById("btn-restart")

btnStartElement.addEventListener("click",start,true);
btnPauseElement.addEventListener("click",pause,true);
btnRestartElement.addEventListener("click",restart,true);

var intervalID;

function init(){
	min =25;
	sec=0;
	minElement.innerHTML = min;
	secElement.innerHTML = sec+"0";
}

function start(){
	intervalID = setInterval(updateTimer,1000);
}
function pause(){
    clearInterval(intervalID);
}

function restart(){
	init();
}

function updateTimer(){
	sec = sec-1;
	if(sec  == -1){
		sec = 59;
		min = min -1;
	}

	minElement.innerHTML = min;
	secElement.innerHTML = sec;
}

init();

