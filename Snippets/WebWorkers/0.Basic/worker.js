this.onmessage = function (e){
    if(e.data.add !== undefined){
        this.postMessage({
            result:e.data.add.num1 + e.data.add.num2
        });
    }
}