import { Component } from 'react';
import CardItem from './CardItem';

interface Card {
  name: string;
  gender: string;
  height: string;
  mass: string;
}

interface CardListProps {
  results: Card[];
}

export default class CardList extends Component<CardListProps> {
  render() {
    return (
      <div style={{ height: '300px' }}>
        {this.props.results.map((result: Card) => (
          <CardItem key={result.name} {...result} />
        ))}
      </div>
    );
  }
}
