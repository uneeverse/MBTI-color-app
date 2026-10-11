import { useEffect, useRef } from 'react'

// 공유 방법을 고르는 팝업. 바깥 영역을 누르거나 Esc를 누르면 닫힌다.
export default function ShareDialog({ open, onClose, onSaveImage, onCopyLink, onShareKakao, onShareSns }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  // 누른 뒤에는 팝업을 닫고 동작을 실행한다 (토스트가 팝업에 가려지지 않게)
  function run(action) {
    onClose()
    action()
  }

  return (
    <dialog
      ref={ref}
      className="share-dialog"
      aria-labelledby="share-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      {/* 여백은 이 안쪽에 둔다: dialog 자체를 누른 경우만 바깥(배경) 클릭으로 본다 */}
      <div className="share-body">
        <h2 id="share-title">공유하기</h2>
        <div className="share-options">
          <button type="button" className="btn" onClick={() => run(onSaveImage)}>
            이미지 저장
          </button>
          <button type="button" className="btn" onClick={() => run(onCopyLink)}>
            링크 복사
          </button>
          <button type="button" className="btn kakao" onClick={() => run(onShareKakao)}>
            카카오톡 공유
          </button>
          <button type="button" className="btn" onClick={() => run(onShareSns)}>
            SNS 공유
          </button>
        </div>
        <button type="button" className="link" onClick={onClose}>
          닫기
        </button>
      </div>
    </dialog>
  )
}
