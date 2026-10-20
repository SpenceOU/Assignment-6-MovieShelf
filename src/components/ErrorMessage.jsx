function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {/* Only show the retry button if a retry function was passed in */}
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
