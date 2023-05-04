// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const dbService = getFirestore(app);
const messaging = getMessaging(app);
// const storageService = getStorage(app);

async function requestPermission() {
  console.log('권한 요청 가냐?');
  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('알림 권한 허용 안됨');
    return;
  }
  console.log('알림 권한 허용 됨!!! ');
  // FCM 메시지
  // const newSw = await navigator.serviceWorker.register(
  //   'firebase-messaging-sw.js'
  // );
  // console.log(newSw, "뉴스?")
  // getToken(messaging, { vapidKey: process.env.REACT_APP_FCM_VAPID}).then((currentToken) => {
  //   if (currentToken) {
  //     // Send the token to your server and update the UI if necessary
  //     // ...
  //   } else {
  //     // Show permission request UI
  //     console.log('No registration token available. Request permission to generate one.');
  //     // ...
  //   }
  // }).catch((err) => {
  //   console.log('An error occurred while retrieving token. ', err);
  //   // ...
  // });
  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_FCM_VAPID
  });
  if (token) {
    console.log('token: ', token);
  } else {
    console.log('Can not get Token');
  }

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}
requestPermission();

export { app, dbService };
