import './LoadingModal.css'

const LoadingModal = ({ message = 'Processing...' }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-modal">
        <div className="loading-spinner">
          <svg viewBox="0 0 50 50">
            <circle className="loading-ring" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
            <circle className="loading-arc" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
          </svg>
        </div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
  )
}

export default LoadingModal
