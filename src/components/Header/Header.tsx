import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import './Header.css';
import { HeaderProps } from '../../types/types';

const Header: React.FC<HeaderProps> = ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: HeaderProps) => {
  return (
    <div className="header">
      <SearchInput value={searchValue} onChange={onSearchChange} />
      <SearchButton onClick={onSearchSubmit} />
    </div>
  );
};

export default Header;
