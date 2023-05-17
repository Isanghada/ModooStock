import axios from 'axios';

self.addEventListener('message', (event) => {
  console.log(event.data)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
self.addEventListener('install', function (e) {
  console.log('fcm sw install..');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
  // console.log('1 push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    badge: "./images/icons/badge-72x72.png",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: resultData.tag,
    ...resultData
  };
  // console.log('2 push: ', { resultData, notificationTitle, notificationOptions });
  // // 내 정보 이벤트실행시 API
  // const getUsers = () => {
  //   console.log("유저정보가져오기")
  // }
  // getUsers();


  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  console.log('notification click');
  const url = '/main';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
