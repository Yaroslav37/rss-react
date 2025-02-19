import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../types/types';
import { useLocation, useNavigate } from 'react-router';
import { RootState } from '../../App';
import { toggleItem } from '../../store/selectedItemSlice';

const CardItem: React.FC<Card> = ({ id, name, gender, height, mass }: Card) => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailsId = Number(location.pathname.split('/').pop());
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  const handleClick = () => {
    if (detailsId === id) {
      navigate(`/rss-react${location.search}`);
    } else {
      navigate(`/rss-react/details/${id}${location.search}`);
    }
  };

  const handleToggle = () => {
    dispatch(toggleItem({ id, name, gender, height, mass }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <input
        type="checkbox"
        checked={selectedItems.some(
          (selectedItem: Card) => selectedItem.id === id
        )}
        onChange={handleToggle}
      />
      <div className="card-block" onClick={handleClick}>
        <div className="card-name">{name}</div>
        <div className="card-item">Gender: {gender}</div>
        <div className="card-item">Height: {height} cm</div>
        <div className="card-item">Mass: {mass} kg</div>
      </div>
    </div>
  );
};

export default CardItem;
