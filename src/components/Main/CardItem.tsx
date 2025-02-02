import { Component } from 'react';
import './Main.css';
import { Card } from '../../types/types';

export default class CardItem extends Component<Card> {
  render() {
    return (
      <div className="card-block">
        <div className="card-name">{this.props.name}</div>
        <div className="card-container">
          <div className="card-item">Gender: {this.props.gender}</div>
          <div className="card-item">Height: {this.props.height} cm</div>
          <div className="card-item">Weight: {this.props.mass} kg</div>
        </div>
      </div>
    );
  }
}
