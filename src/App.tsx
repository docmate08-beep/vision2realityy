import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import V2RApp from './V2RApp';
import TheMateApp from './TheMateApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TheMateApp />} />
        <Route path="/v2r" element={<V2RApp />} />
        {/* You can also add specific fallbacks if needed */}
        <Route path="*" element={<TheMateApp />} />
      </Routes>
    </Router>
  );
}

export default App;
