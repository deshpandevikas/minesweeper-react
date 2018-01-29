import React, { Component } from 'react';
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";
import BoardFooter from "./components/BoardFooter";

class Minesweeper extends Component {
  constructor(){
    super();
    this.timeIntervals = [];
  }

//Defining the state of minesweeper board.
// Example: status which can range from waiting, running or ended, number of rows and columns, flags, mines, timer and cells which are open
  state = {
    status: "waiting",
    rows: 10,
    columns: 10,
    flags: 10,
    mines: 10,
    time:0,
    openCells:0
  };



//function to keep track of time and increment the timer everytime an open cell is still there and the game status is running
timerTick = () => {
  if(this.state.openCells > 0 && this.state.status === "running"){
    let time = this.state.time + 1;
    this.setState({time})
  }
}

// setting time interval and passing the values function and the timer.
setInterval = (funcn, timer) => {
  this.timeIntervals.push(setInterval(funcn,timer));
}

// function to handle the cell click event handling
cellClick = () => {
  if(this.state.openCells === 0 && this.state.status !== "running"){
    this.setState({
      status: "running"
    },() => {
      this.setInterval(this.timerTick,1000);
    })
  }
  this.setState(prevState => {
    return {openCells:prevState.openCells + 1};
  })
}


// the main part where everything on the web page is rendered.
  render() {
    return (
      <div className="minsesweeper">
        <BoardHead time = {this.state.time} flagCount={this.state.flags}/>
        <Board
          rows = {this.state.rows}
          columns = {this.state.columns}
          mines = {this.state.mines}
          openCells = {this.state.openCells}
          openCellClick = {this.cellClick}/>
      </div>
    );
  }
}

export default Minesweeper;
