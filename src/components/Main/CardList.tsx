import { Component } from 'react';
import CardItem from './CardItem';
import './Main.css';
import { Card, CardListProps } from '../../types/types';

export default class CardList extends Component<CardListProps> {
  render() {
    const { results } = this.props;

    if (results.length === 0) {
      return <div>Nothing was found</div>;
    }

    return (
      <div className="card-list">
        {results.map((result: Card) => (
          <CardItem key={result.name} {...result} />
        ))}
      </div>
    );
  }
}
