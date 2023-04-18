import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Components/Main/Main';
import Bank from './Components/Bank/Bank';
import Layout from './Layout';
import Intro from './Components/Intro/Intro';
import Chatting from './Components/Chatting/Chatting';

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/intro" element={<Intro />} />
          <Route path="/chatting" element={<Chatting />} />
          <Route path="/" element={<Main />} />
          <Route path="/bank" element={<Bank />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
