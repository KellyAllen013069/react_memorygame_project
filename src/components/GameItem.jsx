//import "./GameItem.css";
import * as React from "react";

class GameItem extends React.Component {
  
  render() {
    return (
      <div
        className="GameItem-div">
        <img src={this.props.value.src} alt={this.props.value.content}/>
      </div>
    );
  }
}

export default GameItem;
