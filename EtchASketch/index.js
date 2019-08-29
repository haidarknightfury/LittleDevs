const NUM_SQUARES = 20;

(function init(NUM_SQUARES) {

    const NUM_SQUARE = NUM_SQUARES;

    var board = new Board();
    board.addSquare();

    

    function Board() {
        const GAP = 5;
        
        this.mainArea = document.getElementById('main');
        this.width = this.mainArea.offsetWidth;
        this.height = this.mainArea.offsetHeight;
        this.sqWidth = (this.width - NUM_SQUARE * GAP) / NUM_SQUARE;
        this.sqHeight = (this.height - NUM_SQUARE * GAP) / NUM_SQUARE;


        this.addSquare = function () {

            for (let i = 0; i < NUM_SQUARE; i++) {
                for (let j = 0; j < NUM_SQUARE; j++) {
                    var sq = document.createElement('div');
                    
                    sq.setAttribute('class', 'square');
                    sq.style.width = this.sqWidth+'px';
                    sq.style.height = this.sqHeight+'px';
                    sq.style.marginLeft = GAP + 'px';
                    sq.style.marginTop = GAP + 'px';

                    sq.addEventListener('mouseover',(event)=>{
                        event.target.style.background = '#6571af';
                    });

                    this.mainArea.appendChild(sq);
                }
            }
        }
    }

})(NUM_SQUARES);