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
import { useEffect, useState } from 'react';
import RotateDevice from 'Components/Common/RotateDevice';
import AdminPage from 'Components/Admin/AdminPage';
import AdminMarket from 'Components/Admin/AdminMarket';
import AdminMain from 'Components/Admin/AdminMain';
import AdminDeal from 'Components/Admin/AdminDeal';
import AdminUser from 'Components/Admin/AdminUser';

function App() {
  const [isLandScape, setIsLandScape] = useState<boolean>(true);
  // 현재 브라우저 윈도우 너비 값
  const [screenWidth, setScreenWidth] = useState<number>(0);
  // 현재 브라우저 윈도우 너비 값
  const [screenHeight, setScreenHeight] = useState<number>(0);

  useEffect(() => {
    if (screenWidth >= screenHeight) {
      setIsLandScape(true);
      console.log('가로모드얌');
    } else {
      setIsLandScape(false);
      console.log('세로모드얌');
    }
  }, [window.innerWidth, window.innerHeight]);

  useEffect(() => {
    // 창크기 변할때마다 실행
    const updateScreenWidth = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setScreenWidth(newWidth);
      setScreenHeight(newHeight);
    };
    // 처음 한번 실행
    updateScreenWidth();

    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  return (
    <>
      {isLandScape ? (
        <>
          <ToastContainer
            position="top-left"
            autoClose={1000}
            hideProgressBar={true}
            pauseOnFocusLoss={true}
            limit={1}
          />
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
              <Route path="/admin" element={<AdminPage />}>
                <Route path="" element={<AdminMain />} />
                <Route path="market" element={<AdminMarket />} />
                <Route path="deal" element={<AdminDeal />} />
                <Route path="user" element={<AdminUser />} />
              </Route>
            </Route>
            <Route path="/error" element={<Error />} />
            <Route path="/loading" element={<Loading />} />
          </Routes>
        </>
      ) : (
        <RotateDevice />
      )}
    </>
  );
}

export default App;
