export default function Loading() {
  return (
    <main className="container" aria-busy="true" aria-live="polite">
      <div className="loading-state">
        <h2 className="section-title">Loading catalog...</h2>
        <p className="loading-sub">Preparing gear and inventory</p>
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-card-art" />
              <div className="skeleton-card-body">
                <div className="skeleton-line skeleton-title" />
                <div className="skeleton-line skeleton-sub" />
                <div className="skeleton-line skeleton-price" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
