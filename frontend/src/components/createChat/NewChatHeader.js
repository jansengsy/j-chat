import CreateGroupChatHeader from "./CreateGroupChatHeader";
import CreatePrivateChatHeader from "./CreatePrivateChatHeader";

export default function NewChatHeader({type, stage, setStage, cancelGroup, createChat}) {
  return (
    <div className="popout-header">
      { type === 'private' ? <CreatePrivateChatHeader /> : <CreateGroupChatHeader stage={stage} setStage={setStage} cancelGroup={cancelGroup} createChat={createChat}/> }
    </div>
  );
}
