import { SearchButtonProps } from '../../types/types';

const SearchButton: React.FC<SearchButtonProps> = ({
  onClick,
}: SearchButtonProps) => {
  return (
    <button className="search-button" onClick={onClick}>
      Search
    </button>
  );
};

export default SearchButton;
