import './ErrorButton.css';
import { ErrorButtonProps } from '../../types/types';

const ErrorButton: React.FC<ErrorButtonProps> = ({
  onClick,
}: ErrorButtonProps) => {
  return (
    <button className="error-button" onClick={onClick}>
      ErrorButton
    </button>
  );
};

export default ErrorButton;
