import { Component } from 'react';

interface Card {
  name: string;
  gender: string;
  height: string;
  mass: string;
}

export default class CardItem extends Component<Card> {
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>Gender: {this.props.gender}</div>
          <div>Height: {this.props.height}cm</div>
          <div>Weight: {this.props.mass}kg</div>
        </div>
      </div>
    );
  }
}
