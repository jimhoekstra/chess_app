import initializeChessboard from './src/initializeChessboard.js';


const appState = {
    debug: false,
    state: {
        chessboardState: initializeChessboard(),
        legalMoves: [],
        player: 'white'
    },
    getChessboardState: function() {
        return this.state.chessboardState;
    },
    setLegalMoves: function(legalMoves) {
        if (this.debug) console.log(`setting legal moves: ${JSON.stringify(legalMoves)}`);
        
        this.state.legalMoves = legalMoves;

        for (const legalMove in legalMoves) {
            const legalSquareID = legalMoves[legalMove].new;
            this.state.chessboardState[legalSquareID].isLegalMove = 'legal-move';
        };
    },
    getLegalMoves: function() {
        return this.state.legalMoves;
    },
    getPlayer: function() {
        return this.state.player;
    },
    setPlayer: function(player) {
        this.state.player = player;
    },
    clearLegalMoves: function() {
        if (this.debug) console.log('clearing legal moves');

        for (const legalMove in this.getLegalMoves()) {
            const legalSquareID = this.state.legalMoves[legalMove].new;
            this.state.chessboardState[legalSquareID].isLegalMove = 'illegal-move';
        };

        this.state.legalMoves = [];
    },
    movePiece: function(fromSquare, toSquare, checkIfLegal) {
        if (this.debug) console.log(`moving piece from ${JSON.stringify(fromSquare)} to ${JSON.stringify(toSquare)}`);
        
        if (!checkIfLegal || this.getLegalMoves().map(legalMove => legalMove.new).includes(toSquare)) {
            this.state.chessboardState[toSquare].piece = this.state.chessboardState[fromSquare].piece;
            this.state.chessboardState[toSquare].piece.setPosition(toSquare);
            this.state.chessboardState[fromSquare].piece = null;

            if (this.getPlayer() == 'white') {
                this.setPlayer('black');
            } else {
                this.setPlayer('white');
            }

            return true;
        } else {
            return false;
        }
    }
};


Vue.component('App', {
    template: `
        <div class="app">
            <Chessboard></Chessboard>
        </div>
    `
});


const app = new Vue({
    el: '#app',
    data: {
        appState: appState
    }
});
