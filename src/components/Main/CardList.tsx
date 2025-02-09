import CardItem from './CardItem';
import { Card, CardListProps } from '../../types/types';

const CardList: React.FC<CardListProps> = ({ results }: CardListProps) => {
  if (results.length === 0) {
    return <div className="card-list">Nothing was found</div>;
  }
  return (
    <div className="card-list">
      {results.map((result: Card) => (
        <CardItem key={result.name} {...result} />
      ))}
    </div>
  );
};

export default CardList;
