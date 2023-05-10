
// 파이어베이스
import { dbService } from '../../firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';


const SetPushToken = async (nickname : string, token: string) => {
  const roomName = 'PushToken';

  // 메시지 데이터에 추가
  await setDoc(doc(dbService, roomName, `${nickname}`), {
    nickname,
    token,
    createdAt: serverTimestamp()
  });
};

export default SetPushToken;
