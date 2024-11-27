import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './Page/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Dashboard />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
