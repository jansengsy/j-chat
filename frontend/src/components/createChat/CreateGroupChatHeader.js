export default function CreateGroupChatHeader({stage, setStage, cancelGroup, createChat}) {

  return (
    <>
      <button
        className="popout-button"
        onClick={ stage === 0 ? cancelGroup : () => setStage(0) }
      >
        { stage === 0 ? 'Cancel' : 'Prev'}
      </button>
      <div className="popout-header-title">
        <span>Create new group chat</span>
      </div>
      <button
        className="popout-button"
        onClick={ stage === 1 ? createChat : () => setStage(1) }
      >
        { stage === 1 ? 'Create' : 'Next' }
      </button>
    </>
  )
}
