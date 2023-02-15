import "./ScoreDisplay.css"
import * as React from "react";

class ScoreDisplay extends React.Component {
   
  render() {

    return (
      <div id="scoreDisplay" className="Score-div">
        <h3>For this game, your score was {this.props.value}</h3>
      </div>
    );
  }
}

export default ScoreDisplay;
