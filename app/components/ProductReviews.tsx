"use client";

import dynamic from "next/dynamic";

// Lazy-load the heavy interactive Reviews component on demand.
// ssr: false is allowed here because this file is marked "use client".
const Reviews = dynamic(() => import("./Reviews"), {
  ssr: false,
  loading: () => (
    <div className="reviews-loading" aria-live="polite">
      <div className="section-head">
        <h2 className="section-title">Verified Customer Reviews</h2>
      </div>
      <div className="reviews-skeleton">
        <div className="skeleton-bar" style={{ width: "45%", height: "20px", marginBottom: "1rem" }} />
        <div className="skeleton-card" style={{ height: "130px", background: "var(--line)", borderRadius: "8px" }} />
      </div>
    </div>
  ),
});

export default function ProductReviews({
  productId,
  productName,
  rating,
}: {
  productId: string;
  productName: string;
  rating: number;
}) {
  return (
    <ProductReviewsInternal
      productId={productId}
      productName={productName}
      rating={rating}
    />
  );
}

function ProductReviewsInternal({
  productId,
  productName,
  rating,
}: {
  productId: string;
  productName: string;
  rating: number;
}) {
  return (
    <Reviews
      productId={productId}
      productName={productName}
      rating={rating}
    />
  );
}
