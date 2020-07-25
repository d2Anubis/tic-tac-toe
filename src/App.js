import React , {Component} from 'react';
import './App.css';

class App extends Component {
  constructor()
  {
    super();
    this.state={
      turn: 'X',
      board:Array(9).fill(""),
      terminate:false,
      count:1,
      winner:undefined,
    }
    this.handleClick=this.handleClick.bind(this)
    this.restart=this.restart.bind(this)
  }
  
  restart(event)
  {
    window.location.reload(false)
  }

  handleClick(event)
  {
    if(this.state.terminate) return;
    if(this.state.count === 9)
    {
      this.setState({
        terminate: true,
        winner: 'Match is draw',
      })} 
    if(this.state.turn === 'X')
    {
      event.target.style.background= "#aba4a4"
      event.target.style.color="#FFFFFF"
    }
    if(this.state.board[event.target.dataset.square]==="")
    {
      this.state.board[event.target.dataset.square]=this.state.turn;
      event.target.innerText=this.state.turn;
      this.setState({
      turn:this.state.turn === 'X' ? 'O' : 'X',
      board:this.state.board,
      winner: "Next player: " + (this.state.turn ==="X" ? "O" : "X")
      })
      this.setState(prevState => {
        return {count:prevState.count + 1}
     });
    }
    
    var result = this.winner();
    if(result == 'X') {
      this.state.terminate = true;
      this.setState({
        winner: 'The winner is : X',

      })}
    if(result == 'O') {
      this.state.terminate= true;
      this.setState({
        winner: 'The winner is : O',
        })}
      console.log(this.state.board);
    console.log(this.state.count);
  }

  winner() {
    var lines = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    for(let i=0;i<lines.length;i++) {
      if(this.state.board[lines[i][0]] == this.state.board[lines[i][1]] && this.state.board[lines[i][1]] == this.state.board[lines[i][2]])
          return this.state.board[lines[i][0]];
    }
    }


  render()
  {
    return (
      <div id="app">
        <div id="heading">Tic Tac Toe</div>
        <div className="Final">
          {this.state.winner}
          </div>
      <div>
      <div id="board" onClick={this.handleClick}>
      <div className="square" data-square="0"></div>
      <div className="square" data-square="1"></div>
      <div className="square" data-square="2"></div>
      <div className="square" data-square="3"></div>
      <div className="square" data-square="4"></div>
      <div className="square" data-square="5"></div>
      <div className="square" data-square="6"></div>
      <div className="square" data-square="7"></div>
      <div className="square" data-square="8"></div>
      </div>
      <button type="submit" id="refresh" onClick={this.restart}>Restart</button>
      </div>
      </div>
    );
  }
  
}

export default App;
