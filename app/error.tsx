"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error monitor
    console.error("ShipYard caught an error in app/error.tsx:", error);
  }, [error]);

  return (
    <main className="container">
      <div className="error-state">
        <span className="error-icon" aria-hidden="true">
          ⚠️
        </span>
        <h1 className="error-title">Something went wrong</h1>
        <p className="error-sub">
          We encountered an unexpected issue while loading this page.
        </p>
        <div className="error-actions">
          <button type="button" onClick={() => reset()} className="btn-retry">
            Try again
          </button>
          <Link href="/" className="back-link">
            ← Back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
