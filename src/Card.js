import React, { Component } from 'react';
import styled from 'styled-components';
let CardFormatter = styled.div`
  position: absolute;
  transform: rotate(${prop => prop.deg}deg);
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <CardFormatter color="blue" deg={Math.ceil(Math.random() * 50) - 30}>
        <img src={this.props.imageUrl} alt="#" />
      </CardFormatter>
    );
  }
}

export default Card;
