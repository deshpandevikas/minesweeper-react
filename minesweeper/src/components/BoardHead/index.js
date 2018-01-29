import React from 'react';


const BoardHead = props => {

  let timeInMinutes = Math.floor(props.time / 60);
  let timeInSeconds = props.time - timeInMinutes * 60 || 0;

  let displayedTime = timeInSeconds < 10 ? `0${timeInSeconds}` : timeInSeconds;
  let time = `${timeInMinutes}:${displayedTime}`;

  return (
      <div className="board-head">
          <div className = "flag-count">{props.flagCount}</div>
          <div><h1>Play Minesweeper</h1></div>
          <div className = "timer">{time}</div>
      </div>
  );
};


export default BoardHead;
