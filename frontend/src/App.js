import { Routes, Route } from 'react-router-dom';
import Signup from './components/signup'; 
import Signin from './components/signin';

export const serverUrl = "http://localhost:2000";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;