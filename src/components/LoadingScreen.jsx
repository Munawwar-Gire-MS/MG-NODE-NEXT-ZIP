export default function LoadingScreen() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-white" style={{ minHeight: '80vh' }}>
      <svg className="container-spinner" viewBox="0 0 40 40" height="40" width="40">
        <circle className="track" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="3px" fill="none" />
        <circle className="car" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="3px" fill="none" />
      </svg>
    </div>
  );
}
