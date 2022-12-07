import React from 'react';

class CardViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {index: 0, total: 20, flip: 0};
      }

    nextCard = () => {
        this.setState({index: this.state.index + 1});
    }

    prevCard = () => {
        this.setState({index: this.state.index - 1});
    }

    flip = () => {
        this.setState({flip: 1 - this.state.flip});
    }

  render() {
    return (
      <div>
        <h2>Card Viewer</h2>
        <h1>
        {this.state.flip === 0 &&
            this.props.cards[this.state.index].front
        }
        {this.state.flip === 1 &&
            this.props.cards[this.state.index].back
        }
        </h1>
        <button onClick={this.flip}>Flip</button>
        <h4>Progress: {this.state.index + 1}/{this.state.total + 1}</h4>
        <button onClick={this.prevCard} disabled={this.state.index === 0}>Prev</button>
        <button onClick={this.nextCard} disabled={this.state.index === this.state.total}>Next</button>
        <hr />
        <button onClick={this.props.switchMode}>Go to card editor</button>
      </div>
    );
  }
}

export default CardViewer;