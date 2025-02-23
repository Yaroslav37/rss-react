import { useTheme } from '../contexts/ThemeContext';

const Spinner: React.FC = () => {
  const { theme } = useTheme();

  const fillColor = theme === 'light' ? 'black' : 'white';

  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Loading"
    >
      <title>Loading</title>
      <style>
        {`
          .spinner_GmWz { animation: spinner_Ctle .8s linear infinite; animation-delay: -.8s; }
          .spinner_NuDr { animation-delay: -.65s; }
          .spinner_OlQ0 { animation-delay: -.5s; }
          @keyframes spinner_Ctle { 93.75%, 100% { opacity: .2; } }
        `}
      </style>
      <rect
        className="spinner_GmWz"
        x="1"
        y="4"
        width="6"
        height="14"
        fill={fillColor}
      />
      <rect
        className="spinner_GmWz spinner_NuDr"
        x="9"
        y="4"
        width="6"
        height="14"
        fill={fillColor}
      />
      <rect
        className="spinner_GmWz spinner_OlQ0"
        x="17"
        y="4"
        width="6"
        height="14"
        fill={fillColor}
      />
    </svg>
  );
};

export default Spinner;
