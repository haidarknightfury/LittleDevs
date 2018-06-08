var res = document.getElementById("result");
var btn = document.getElementById("startworker");

btn.addEventListener("click",callWorker);

function callWorker() {

    if (window.Worker) {
        var worker = new Worker('worker.js');
        var message = {
            add: {
                num1: 1,
                num2: 2
            }
        }

        worker.postMessage(message);
        worker.onmessage = function (e) {
            console.log(e.data.result);
            res.innerHTML = e.data.result;

        }
    }
}