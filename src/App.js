import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';
import { Routes, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
      ], 
    };
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  render() {
    const cardEditor = 
      <CardEditor
      addCard={this.addCard}
      cards={this.state.cards}
      deleteCard={this.deleteCard}
    />;
    const cardViewer =
      <CardViewer 
      cards={this.state.cards} 
    />;
    return (
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/editor" element={cardEditor}/>
        <Route path="/viewer" element={cardViewer}/>
      </Routes>
    );
  }
}

export default App;