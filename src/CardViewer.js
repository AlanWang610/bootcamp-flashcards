import React from 'react';

class CardViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {index: 1, total: 20};
      }

    nextCard = () => {
        this.setState({index: this.state.index + 1});
    }

    prevCard = () => {
        this.setState({index: this.state.index - 1});
    }

  render() {
    return (
      <div>
        <h2>Card Viewer</h2>
        <h4>Progress: {this.state.index}/{this.state.total}</h4>
        <button onClick={this.prevCard}>Prev</button>
        <button onClick={this.nextCard}>Next</button>
        <hr />
        <button onClick={this.props.switchMode}>Go to card editor</button>
      </div>
    );
  }
}

export default CardViewer;