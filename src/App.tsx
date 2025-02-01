import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
  return (
    <ErrorBoundary>
      <SearchPage />
    </ErrorBoundary>
  );
}

export default App;
