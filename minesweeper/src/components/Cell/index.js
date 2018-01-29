import React from 'react';
//import Minesweeper from '../Minesweeper';

const Cell = props => {
  console.log(props.data)
  let eachCell = () => {
    if(props.data.isOpen){
      if(props.data.count === 0){
        return (
          <div className="cell open" onClick={() => props.open(props.data)}>

          </div>
        )
      } else if(props.data.hasMine){
        console.log("Banth Banth");
        return (
          <div className="cell open" onClick={() => props.open(props.data)}>
            m
          </div>
        )
        return;
      } else {
        return (
          <div className="cell open" onClick={() => props.open(props.data)}>
            {props.data.count}
          </div>
        )
      }
    } else {
      return (
        <div className="cell" onClick={() => props.open(props.data)}>

        </div>
      )
    }
  }
  return eachCell();
};


export default Cell;
