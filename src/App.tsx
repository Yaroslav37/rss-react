import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import SearchPage from './components/SearchPage/SearchPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ProfileDetail from './components/ProfileDetail/ProfileDetail';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/rss-react" element={<SearchPage />}>
            <Route path="details/:id" element={<ProfileDetail />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
