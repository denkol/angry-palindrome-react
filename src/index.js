import React from 'react';
import ReactDOM from 'react-dom';
import Helpers from './helpers';
import Motivies from './data/motivies';

class MyFirstComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      answer: "",
      name: this.props.name || "",
      sumbitCounter: Number(this.props.goodbye) || 0,
      palindromesCounter: 0, 
    };
  }
  submitForm = (event) => {
    event.preventDefault();
    const isPalindrome = Helpers.isPalindrome(this.state.value);
    let itAnswer;
    if(isPalindrome && this.state.sumbitCounter < 5) {
      this.setState({palindromesCounter: this.state.palindromesCounter + 1});
      itAnswer = this.say('positive');
    } else {
      itAnswer = this.say('negative');
    }
    
    if(this.state.sumbitCounter > 5) {
      localStorage.setItem("goodbye", this.state.sumbitCounter);  
      itAnswer = this.say("goodbye");
    }

    this.setState({ 
      name: this.state.value,
      answer: itAnswer,
      sumbitCounter: this.state.sumbitCounter + 1
    });
  }
  inputHandler = () => {
    this.setState({
      value: this.refs.input.value
    });
  }
  say(motiv) {
    switch(motiv) {
      case 'negative': 
        return Motivies.negative[Helpers.getRandomInt(Motivies.negative.length, 0)];
        break;
      case 'positive':
        return Motivies.positive[Helpers.getRandomInt(Motivies.positive.length, 0)];
        break;
      case 'goodbye':
        return Motivies.goodbye[Helpers.getRandomInt(Motivies.goodbye.length, 0)];
        break;
      case 'persistent':
        return Motivies.persistent[Helpers.getRandomInt(Motivies.persistent.length, 0)];
        break;
      default:
        return Motivies.fallback[Helpers.getRandomInt(Motivies.fallback.length, 0)];
        break;
    }
  }
  renderHeadline = (name) => {
    if(name) {
      return (
        <div className="headline">
          <h2>{name || ""}</h2>
          <h3>{this.state.answer}</h3>
        </div>
      );
    } 
    else {
      return <p>Напиши что нибудь сюда, любое слово:</p>
    }
  }
  render() {
    return (
      <div className="hello-block">
        <h1> ANGRY PALINDROM CHECKER </h1>
        { this.renderHeadline(this.state.name) }
        <form onSubmit={this.submitForm}>
          <input type="text" ref="input" onChange={this.inputHandler} value={this.state.value} />
          <button type="submit">Click me!</button>
        </form>
        <br/>
        <i>Кол-во найденых палиндромов: {this.state.palindromesCounter}</i>
      </div>
    );
  }
};

ReactDOM.render( <MyFirstComponent goodbye={localStorage.goodbye} />, document.getElementById('root'));