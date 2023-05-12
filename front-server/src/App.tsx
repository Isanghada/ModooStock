import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from 'Components/Main/Main';
import Bank from 'Components/Bank/Bank';
import Layout from './Layout';
import Intro from 'Components/Intro/Intro';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mypage from 'Components/Mypage/Mypage';
import Exchange from 'Components/Exchange/Exchange';
import Travel from 'Components/Travel/Travel';
import Rank from 'Components/Rank/Rank';
import Error from 'Components/Common/Error';
import InfoShop from 'Components/InfoShop/InfoShop';
import Loading from 'Components/Common/Loading';
import GachaShop from 'Components/GachaShop/GachaShop';
import Lottery from 'Components/MiniGame/Lottery';
import Auction from 'Components/Auction/Auction';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.screen && window.screen.orientation) {
      window.screen.orientation
        .lock("landscape")
        .catch(function (error) {
          console.error("Failed to lock the orientation:", error);
        });
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-left" autoClose={1000} hideProgressBar={true} pauseOnFocusLoss={true} limit={1} />
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
          <Route path="/gachashop" element={<GachaShop />} />
          <Route path="/lottery" element={<Lottery />} />
          <Route path="/auction" element={<Auction />} />
        </Route>
        <Route path="/error" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </>
  );
}

export default App;
