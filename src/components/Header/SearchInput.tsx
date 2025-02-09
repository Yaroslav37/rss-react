import { SearchInputProps } from '../../types/types';

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <input
      className="search-input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
    />
  );
};

export default SearchInput;
