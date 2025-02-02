import { Component } from 'react';
import CardItem from './CardItem';
import './Main.css';
import { Card, CardListProps } from '../../types/types';

export default class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="card-list">
        {this.props.results.map((result: Card) => (
          <CardItem key={result.name} {...result} />
        ))}
      </div>
    );
  }
}
