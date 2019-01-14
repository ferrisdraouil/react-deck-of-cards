import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deckId: 0, remaining: 0, imageUrls: [] };
    this.drawCard = this.drawCard.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
      `);
      const deckId = response.data.deck_id;
      const remaining = response.data.remaining;
      this.setState({ deckId, remaining });
    } catch (error) {
      console.log(error);
    }
  }

  async drawCard() {
    console.log('INSIDE DRAWCARD');
    try {
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      );
      if (response.data.success) {
        let imageUrls = this.state.imageUrls;
        imageUrls.push(response.data.cards[0].image);
        const remaining = response.data.remaining;
        this.setState({ imageUrls, remaining });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let displayCards;
    if (this.state.imageUrls.length > 0) {
      displayCards = (
        <ul>
          {this.state.imageUrls.map(card => (
            <Card imageUrl={card} />
          ))}
        </ul>
      );
    }
    return (
      <div className="Deck">
        <h1>Welcome to Draw Cards</h1>
        <button onClick={this.state.remaining > 0 ? this.drawCard : () => {}}>
          Draw Card. {this.state.remaining} remaining.
        </button>
        {displayCards}
      </div>
    );
  }
}

export default Deck;
