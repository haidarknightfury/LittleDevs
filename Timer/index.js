var min = 25;
var sec = 0;

var minElement = document.getElementById("minute");
var secElement = document.getElementById("second");
var btnStartElement = document.getElementById("btn-start")

btnStartElement.addEventListener("click",start,true);

function init(){
	minElement.innerHTML = min;
	secElement.innerHTML = sec;
}

function start(){
	setInterval(updateTimer,1000);
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

