import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Page/Main';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Main/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
