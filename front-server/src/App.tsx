import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Components/Main/Main';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main/>}/>
      </Routes>
    </>
  );
}

export default App;
