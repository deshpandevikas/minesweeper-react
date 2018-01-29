import React, { Component } from 'react';
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";
import BoardFooter from "./components/BoardFooter";

class Minesweeper extends Component {
  constructor(){
    super();
    this.intervals = [];
  }
  state = {
    status: "waiting",
    rows: 10,
    columns: 10,
    flags: 10,
    mines: 10,
    time:0,
    openCells:0
  };


tick = () => {
  if(this.state.openCells > 0 && this.state.status === "running"){
    let time = this.state.time + 1;
    this.setState({time})
  }
}

setInterval = (fn, tim) => {
  this.intervals.push(setInterval(fn,tim));
}

handleCellClick = () => {
  if(this.state.openCells === 0 && this.state.status !== "running"){
    this.setState({
      status: "running"
    },() => {
      this.setInterval(this.tick,1000);
    })
  }
  this.setState(prevState => {
    return {openCells:prevState.openCells + 1};
  })
}

  render() {
    return (
      <div className="minsesweeper">
        <BoardHead time = {this.state.time} flagCount={this.state.flags}/>
        <Board
          rows = {this.state.rows}
          columns = {this.state.columns}
          mines = {this.state.mines}
          openCells = {this.state.openCells}
          openCellClick = {this.handleCellClick}/>
        
      </div>
    );
  }
}

export default Minesweeper;
