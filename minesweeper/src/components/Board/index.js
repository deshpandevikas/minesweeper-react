import React, { Component } from 'react';
import Row from "../Row";

class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      rows: this.createMinesweeperBoard(props)
    }
  }

  createMinesweeperBoard = props =>{
    let board = [];
    for(let i = 0; i < props.rows; i++) {
      board.push([]);

      for(let j=0; j< props.columns; j++){
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false
        });
      }
    }

    //after board - Mines
    for(let i=0 ; i<props.mines; i++){
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomColumn = Math.floor(Math.random() * props.columns);

      let cell = board[randomRow][randomColumn];

      if(cell.hasMine){
        i--;
      } else {
        cell.hasMine = true;
      }

      //console.log(cell);
    }
    //console.table(board);
    return board;
  }



openCellFunction = cell => {
  let asyncCountNumberOfMines = new Promise(resolve => {
    let mines = this.calculateNumberOfMinesAdjacentToTheCell(cell);
    resolve(mines);
  })

  asyncCountNumberOfMines.then(numberOfMines =>{
    //console.log(numberOfMines);
    let rows = this.state.rows;
    let current = rows[cell.y][cell.x];

    // If the first cell selected by the player is Mine, then restart the game again
    if(current.hasMine && this.props.openCells === 0){
      console.log("Cell has Mine. Start Over!");
      //Setting the new game with same properties received in the function
      let newRows = this.createMinesweeperBoard(this.props);
      this.setState({
        rows: newRows
      }, () => {
          this.openCellFunction(cell);
      })
    } else {
      if(!cell.hasFlag && !current.isOpen){
        this.props.openCellClick();
        current.isOpen = true;
        current.count = numberOfMines;
        this.setState({rows});
        if(!current.hasMine && numberOfMines === 0){
          this.findAdjacentCell(cell);
        }
        //console.log(this.state.rows);
      }
    }

  })
};

// function to check which adjacent cells are opened
findAdjacentCell = cell => {
  let rows = this.state.rows;
  for(let row = -1; row <= 1; row++){
    for(let column =-1;column<=1;column++){
      if(cell.y + row >= 0 && cell.x + column >=0){
        if(cell.y + row < rows.length && cell.x + column < rows[0].length){
          if(!rows[cell.y + row][cell.x + column].hasMine && !rows[cell.y + row][cell.x + column].isOpen){
              this.openCellFunction(rows[cell.y+row][cell.x+column]);
          }
        }
      }
    }
  }
}

//function to count the number of mines adjacant to the current cell
calculateNumberOfMinesAdjacentToTheCell = cell => {
  let numberOfMinesAdjacent = 0;
  for(let row = -1; row <= 1; row++){
    for(let column = -1; column<=1; column++){
      if(cell.y + row >= 0 && cell.x + column >=0){
        if(cell.y + row < this.state.rows.length && cell.x + column < this.state.rows[0].length){
          if(this.state.rows[cell.y + row][cell.x + column].hasMine && !(row ===0 && column===0)){
            numberOfMinesAdjacent++;
          }
        }
      }
    }
  }
  return numberOfMinesAdjacent;
}

  render() {
    let rows = this.state.rows.map((row,index) => {
        return (
          <Row
            cells = {row}
            key = {index}
            open = {this.openCellFunction}
          />
        )
    })
    return <div className="board">{rows}</div>;
  }
}

export default Board;
