import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Components/Main/Main';
import Bank from './Components/Bank/Bank';
import Layout from './Layout';
import Intro from './Components/Intro/Intro';
import Chatting from './Components/Chatting/Chatting';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mypage from 'Components/Mypage/Mypage';

function App() {
  return (
    <>
      <ToastContainer autoClose={1000} hideProgressBar={true} pauseOnFocusLoss={false} />
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Intro />} />
          <Route path="/chatting" element={<Chatting />} />
          <Route path="/main" element={<Main />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
