import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
        }
    }

    setter = () => {
        if(this.props.value !== null){
            return;
        }
        if(!this.props.turn){
            this.setState({value: 'X'});
        }
        else{
            this.setState({value: 'O'});
        }
        this.props.toggleTurn(this.props.row, this.props.col)
    }

    render() {
        return (
            <button
                className="square"
                onClick={this.setter}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {

    displayWinner = () => {
        let winner = "Player 2";
        if(this.state.turn){
            winner = "Player 1";
        }
        alert(winner + " wins!");
    }

    getInitialState = () => {
        const initialState = {
            turn: false,
            status: 'turn X',
            board: [
                [null,null,null],
                [null,null,null],
                [null,null,null]
            ]
        };
        return initialState;
    }

    constructor(props){
        super(props);
        this.state = this.getInitialState()
    }

    resetState = () => {
        this.setState(this.getInitialState())
    }

    toggleTurn = (i,j) => {
        let updateBoard = this.state.board;
        updateBoard[i][j] = 'O';
        let status = 'turn X';

        if(!this.state.turn){
            status = 'turn O';
            updateBoard[i][j] = 'X';
        }
        this.setState({ turn: !this.state.turn, status: status, board: updateBoard}, this.computeRow);
    }

    computeRow = () => {
        //check row
        let matchCounter;
        for(let i = 0; i < 3; i++){
            let firstValue = this.state.board[i][0];
            matchCounter = 0;
            if(firstValue === null){
                continue;
            }
            for(let j = 0; j < 3; j++){
                if(this.state.board[i][j] !== firstValue){
                    break;
                }
                matchCounter++;
            }
            if(matchCounter > 2){
                this.displayWinner();
                this.resetState();
                return;
            }
        }
        this.computeColumn();
    }

    computeColumn = () => {
        let matchCounter;
        for(let j = 0; j < 3; j++){
            let firstValue = this.state.board[0][j];
            matchCounter = 0;
            if(firstValue === null){
                continue;
            }
            for(let i = 0; i < 3; i++){
                if(this.state.board[i][j] !== firstValue){
                    break;
                }
                matchCounter++;
            }
            if(matchCounter > 2){
                this.displayWinner();
                this.resetState();
                return;
            }

        }
        this.computeDiagonal();
    }

    computeDiagonal = () => {
        let matchCounter = 0;
        //top left to bottom right
        for(let i = 0; i < 3; i++){
            let firstValue = this.state.board[0][0];
            if(firstValue === null){
                break;
            }
            if(this.state.board[i][i] !== firstValue){
                break;
            }
            matchCounter++;
        }
        if(matchCounter > 2){
            this.displayWinner();
            this.resetState();
            return;
        }
        matchCounter = 0;
        let j = 2;
        for(let i = 0; i < 3; i++){
            let firstValue = this.state.board[0][2];
            if(firstValue === null){
                break;
            }
            if(this.state.board[i][j] !== firstValue){
                break;
            }
            matchCounter++;
            j--;
        }
        if(matchCounter > 2){
            this.displayWinner();
            this.resetState();
            return;
        }
        this.isGameComplete();

    }

    isGameComplete = () => {
        let board = this.state.board;
        let nullFlag = false;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] === null){
                    nullFlag = true;
                    break;
                }
            }
        }
        if(!nullFlag){
            alert("The game is drawn!");
            this.resetState();
            return;
        }
        
    }

    renderSquare(i,j) {

        return <Square row={i} col={j} value = {this.state.board[i][j]} turn={this.state.turn} toggleTurn={this.toggleTurn}/>;
    }

    render() {
        return (

            <div>
                <div className="status">{this.state.status}</div>
                <div className="new-game"> <button onClick={this.resetState}> New Game </button> </div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
