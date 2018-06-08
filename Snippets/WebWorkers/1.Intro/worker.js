let time = Date.now();

console.log('web worker starting');

for (let i = 1; i <= 1000000000; i++) {
  Math.sqrt(i);
  if (i % 1000 === 0) {
    postMessage({ type: 'progress', progress: '' + (100 * i / 1000000) });
  }
}

postMessage({ type: 'time', time: '' + (Date.now() - time) + ' ms' });
console.log('web worker ended');