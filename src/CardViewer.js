import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

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

    componentDidUpdate(prevProps) {
      if (this.props.cards !== prevProps.cards) {
        this.setState({cards: this.props.cards, length: this.props.cards.length});
      }
    }

  render() {
    if (!isLoaded(this.props.cards)) {
      return <div>Loading</div>;
    }
    if (isEmpty(this.props.cards)) {
      return <div>Page not found</div>;
    }
    return (
      <div>
        <h2>{this.props.name}</h2>
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
        <Link to="/editor">Go to card editor</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(state);
  const deck = state.firebase.data[props.match.params.deckId];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  return {cards: cards, name: name};
}

export default compose(
  withRouter,
  firebaseConnect(props => {
    const deckId = props.match.params.deckId;
    return [{path: `/flashcards/${deckId}`, storeAs: deckId}];
  }),
  connect(mapStateToProps),
)(CardViewer);