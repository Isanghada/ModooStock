import Chatting from './Chatting';
import ChemiChatting from './ChemiChatting';
import ElectricChatting from './ElectricChatting';
import ITChatting from './ITChatting';
import LifeChatting from './LifeChatting';
import SystemChatting from './SystemChatting';

type ChatProps = {
  data : string
}

function Chat({data}: ChatProps): JSX.Element {
  switch (data) {
    case "투자":
      return (
        <SystemChatting />
      )
    case "전체":
      return (
        <Chatting />
      )
    case "전자":
      return (
        <ElectricChatting />
      )
    case "화학":
      return (
        <ChemiChatting />
      )
    case "생명":
      return (
        <LifeChatting />
      )
    case "IT":
      return (
        <ITChatting />
      )
    default:
      return (
        <></>
      )
  }
}
export default Chat;
