import React, { Component } from "react";
import GameItem from "./components/GameItem";
import ScoreDisplay from "./components/ScoreDisplay";
import "./App.css";



class App extends Component {
  constructor(props) {
    super(props);

    const best = localStorage.getItem("best");

    this.state = {
      score: 0,
      prevScore: 0,
      games: 0,
      turns: 1,
      bestScore: best ? best : 0,
      images: [
        {
          content: "discoball",
          wasViewed: false,
          src: "/images/discoball.jpeg",
        },
        {
          content: "discocouple",
          wasViewed: false,
          src: "/images/discocouple.jpeg",
        },
        {
          content: "discogroup",
          wasViewed: false,
          src: "/images/discogroup.jpeg",
        },
        {
          content: "discogirl",
          wasViewed: false,
          src: "/images/discogirl.jpeg",
        },
        {
          content: "discokids",
          wasViewed: false,
          src: "/images/discokids.jpeg",
        },
        {
          content: "discoman",
          wasViewed: false,
          src: "/images/discoman.jpeg",
        },
        {
          content: "disconame",
          wasViewed: false,
          src: "/images/disconame.jpeg",
        },
        {
          content: "discoroller",
          wasViewed: false,
          src: "/images/discoroller.jpeg",
        },
      ]
    };

    this.checkScore = this.checkScore.bind(this);
    this.randomizeImages = this.randomizeImages.bind(this);
    this.displayResults = this.displayResults.bind(this);

  }

  randomizeImages() {
    let array = this.state.images;
    let index = this.state.images.length,
      temporaryIndex,
      randomIndex;


      while(0 !== index) {
        randomIndex = Math.floor(Math.random() * index);
        index -=1;

        temporaryIndex = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = temporaryIndex;
      }

      return array;
  }

  componentDidMount() {
    let array = this.randomizeImages();
    this.setState({images: array, bestScore: 0});
    localStorage.setItem("best", "");
  }

  displayResults() {
    const displayScore = document.getElementById("scoreDisplay");
    displayScore.classList.toggle("show-score");
    setTimeout(() => displayScore.classList.toggle("show-score"), 5000);
  }

  resetGame(tmp) {
    tmp.forEach((item) => {
      item.wasViewed = false;
    });
    this.setState({
      prevScore: this.state.score,
      games: this.state.games + 1,
      turns: 0,
      bestScore:
        this.state.bestScore > this.state.score
          ? this.state.bestScore
          : this.state.score,
      images: tmp,
      score: 0,
    });
    localStorage.setItem("best", this.state.bestScore);
  }

  checkScore(item, answer) {
    let tmp = this.randomizeImages();
    if (this.state.turns === 10) {
      //game over, display score, see if it's best, reset game
      this.displayResults();
      this.resetGame(tmp);
      return;
    }
    //otherwise, game continues
    this.setState({turns: this.state.turns + 1})
    // Checks item has been click vs user answer
  
    if (item.wasViewed === answer) {
      this.setState({score: this.state.score + 1 });
    } 
    
    //set viewed to true
    tmp.forEach((num) => {
      if (num.content === item.content) {
        num.wasViewed = true;
      }
    });  

  }


  render() {
    const randomIndex = Math.floor(Math.random() * this.state.images.length);
    const selectedImg = this.state.images[randomIndex];

    return (
      <main className="App">
        <header className="App-header">
          <h1>React Memory Game</h1>
          <p>
            Answer the questions to test your memory.<br></br>
            Highest score is 10!
          </p>
          <div className="App-scoreboard">
            <span>Score: {this.state.score}</span>
            <span>Best Score: {this.state.bestScore}</span>
            <span>Games: {this.state.games}</span>
            
          </div>
        </header>
        <section className="App-container">
            <ScoreDisplay value={this.state.prevScore}/>
          <div className="App-item-container">
            <GameItem value={selectedImg} />
            <div>
              <h3>Have you seen this image yet?</h3>
              <button
                id="no"
                className="btn"
                onClick={() => this.checkScore(selectedImg, false)}
              >
                No
              </button>
              <button
                id="yes"
                className="btn"
                onClick={() => this.checkScore(selectedImg, true)}
              >
                Yes
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default App;
