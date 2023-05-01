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
import Exchange from 'Components/Exchange/Exchange';
import Travel from 'Components/Travel/Travel';
import Rank from 'Components/Rank/Rank';
import Error from 'Components/Common/Error';
import InfoShop from 'Components/InfoShop/InfoShop';
import Loading from 'Components/Common/Loading';

function App() {
  return (
    <>
      <ToastContainer autoClose={1000} hideProgressBar={true} pauseOnFocusLoss={false} />
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Intro />} />
          <Route path="/main" element={<Main />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/travel/:nickname" element={<Travel />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/infoshop" element={<InfoShop />} />
        </Route>
        <Route path="/error" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </>
  );
}

export default App;
