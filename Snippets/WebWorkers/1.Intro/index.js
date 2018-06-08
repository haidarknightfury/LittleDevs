var w;

function startWorker() {

  if (typeof (Worker) !== 'undefined') {

    if (typeof (w) == 'undefined') {
      w = new Worker('./worker.js');
    }

    w.onmessage = function (event) {
      switch (event.data.type) {
        case 'progress':
          document.getElementById('progress').innerHTML = event.data.progress;
          break;
        case 'time':
          document.getElementById('time').innerHTML = event.data.time;
          break;
      }
    }
  }
  else {
    alert("no web worker support");
  }
}

function stopWorker() {
  w.terminate();
  w = undefined;
}