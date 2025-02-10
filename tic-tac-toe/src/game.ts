type Cell = Player | null
export type Player = 'x' | 'o'
type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]
type WinState = 'won' | 'tie' | 'ongoing'
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const initialGameState: GameState = {
    board: [null, null, null, null, null, null, null, null, null],
    currentPlayer: 'x',
    state: 'ongoing'
}

const checkWin = ( board: Board, player: Player): Player | undefined => {
    for(let i=0; i < winConditions.length; i++) {
        let count:number = 0
        for (let j=0; j < winConditions[i].length; j++) {
            if(board[winConditions[i][j]] === player) {
                count++
            }
            if(count === 3) {
                return player
            }
        }
    }
    
    return undefined;
}

export type GameState = {
    board: Board,
    currentPlayer: Player,
    state: WinState
}

function move( prevGameState: GameState, index:number ): GameState {
    const cloneGameState: GameState = structuredClone(prevGameState)

    // find cell number and replace with current player
    if(prevGameState.board[index] === null && prevGameState.state === 'ongoing') {
        cloneGameState.board[index] = cloneGameState.currentPlayer
        
        // check if game is won
        const winState: Player | undefined = checkWin(cloneGameState.board, cloneGameState.currentPlayer)
        if(winState !== undefined) {
            cloneGameState.state = 'won'
            return cloneGameState
        }

        //check if game is a tie
        if(!cloneGameState.board.includes(null)) {
            cloneGameState.state = 'tie'
            return cloneGameState
        }

        // change player
        cloneGameState.currentPlayer = cloneGameState.currentPlayer === 'x' ? cloneGameState.currentPlayer = 'o' : cloneGameState.currentPlayer = 'x'
    }

    return cloneGameState
}

export {move, checkWin, initialGameState}