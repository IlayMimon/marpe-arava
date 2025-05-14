import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Example from './components/example';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {import.meta.env.DEV && <Route path="example" element={<Example />} />}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
