"use client";

import { useState, useEffect } from "react";
import Stars from "./Stars";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

const DEFAULT_REVIEWS: Record<string, Review[]> = {
  "wave-runner": [
    {
      id: "wr-1",
      author: "Marcus K.",
      rating: 5,
      date: "3 days ago",
      title: "Unmatched cushion on long pavement runs",
      body: "Logged over 60 miles this month in the Wave Runners. The foam rebound is responsive and light without feeling squishy.",
      verified: true,
      helpful: 19,
    },
    {
      id: "wr-2",
      author: "Elena R.",
      rating: 4,
      date: "1 week ago",
      title: "Super breathable knit upper",
      body: "Fit is true to size with plenty of toe-box room. Great breathability even on hot afternoon training sessions.",
      verified: true,
      helpful: 8,
    },
  ],
  "trail-blazer": [
    {
      id: "tb-1",
      author: "Julian M.",
      rating: 5,
      date: "2 days ago",
      title: "Incredible grip on wet rock and mud",
      body: "The 6mm deep lugs bite into loose gravel effortlessly. Rock plate protected my arches on a rocky 14-mile loop.",
      verified: true,
      helpful: 24,
    },
    {
      id: "tb-2",
      author: "Sarah W.",
      rating: 4,
      date: "2 weeks ago",
      title: "Rugged and water-resistant",
      body: "Walked straight through marshy puddles and stayed completely dry. Sturdy toe cap gives real peace of mind.",
      verified: true,
      helpful: 11,
    },
  ],
  "pulse-buds": [
    {
      id: "pb-1",
      author: "Liam T.",
      rating: 5,
      date: "Yesterday",
      title: "ANC punches way above its price class",
      body: "Noise cancellation blocks subway rumble completely. Deep, tight bass without muddying the vocal highs.",
      verified: true,
      helpful: 32,
    },
    {
      id: "pb-2",
      author: "Chloe D.",
      rating: 4,
      date: "5 days ago",
      title: "All-day comfort and battery life",
      body: "Got almost 8.5 hours on a single charge with ANC toggled on. Case is slim enough to slip into a coin pocket.",
      verified: true,
      helpful: 15,
    },
  ],
};

const GENERIC_REVIEWS: Review[] = [
  {
    id: "gen-1",
    author: "Alex P.",
    rating: 5,
    date: "4 days ago",
    title: "Build quality exceeded expectations",
    body: "Materials feel premium and well thought-out. Performs exactly as advertised and fits seamlessly into my daily routine.",
    verified: true,
    helpful: 14,
  },
  {
    id: "gen-2",
    author: "Taylor S.",
    rating: 4,
    date: "1 week ago",
    title: "Reliable and great design aesthetic",
    body: "Clean minimal styling and solid performance. Highly recommend for anyone looking for durable daily equipment.",
    verified: true,
    helpful: 7,
  },
];

export default function Reviews({
  productId,
  productName,
  rating,
}: {
  productId: string;
  productName: string;
  rating: number;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [authorInput, setAuthorInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [ratingInput, setRatingInput] = useState(5);

  // Load reviews from mock and localStorage
  useEffect(() => {
    const initial = DEFAULT_REVIEWS[productId] || GENERIC_REVIEWS;
    try {
      const stored = window.localStorage.getItem(`reviews_${productId}`);
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews(initial);
      }
    } catch {
      setReviews(initial);
    }
  }, [productId]);

  const handleHelpful = (id: string) => {
    if (votedIds.has(id)) return;
    setVotedIds((prev) => new Set(prev).add(id));
    setReviews((prev) => {
      const updated = prev.map((r) =>
        r.id === id ? { ...r, helpful: r.helpful + 1 } : r
      );
      try {
        window.localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorInput.trim() || !titleInput.trim() || !bodyInput.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: authorInput.trim(),
      rating: ratingInput,
      date: "Just now",
      title: titleInput.trim(),
      body: bodyInput.trim(),
      verified: true,
      helpful: 0,
    };

    const next = [newReview, ...reviews];
    setReviews(next);
    try {
      window.localStorage.setItem(`reviews_${productId}`, JSON.stringify(next));
    } catch {}

    setAuthorInput("");
    setTitleInput("");
    setBodyInput("");
    setShowForm(false);
  };

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-head">
        <div>
          <h2 className="section-title">Verified Customer Reviews</h2>
          <p className="reviews-sub">
            Real feedback from community members testing the {productName}.
          </p>
        </div>
        <button
          type="button"
          className="btn-review-toggle"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {showForm && (
        <form className="review-form" onSubmit={handleAddReview}>
          <h3>Write a Review</h3>
          <div className="form-group">
            <label htmlFor="rev-rating">Rating</label>
            <select
              id="rev-rating"
              value={ratingInput}
              onChange={(e) => setRatingInput(Number(e.target.value))}
            >
              <option value={5}>5 Stars - Outstanding</option>
              <option value={4}>4 Stars - Very Good</option>
              <option value={3}>3 Stars - Average</option>
              <option value={2}>2 Stars - Below Expectations</option>
              <option value={1}>1 Star - Poor</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rev-author">Your Name</label>
            <input
              id="rev-author"
              type="text"
              required
              placeholder="e.g. Jordan S."
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rev-title">Review Headline</label>
            <input
              id="rev-title"
              type="text"
              required
              placeholder="Summarize your experience"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rev-body">Review Details</label>
            <textarea
              id="rev-body"
              required
              rows={3}
              placeholder="What stood out? How is the sizing, durability, or performance?"
              value={bodyInput}
              onChange={(e) => setBodyInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit-review">
            Submit Review
          </button>
        </form>
      )}

      {/* Ratings summary and filters */}
      <div className="reviews-summary-bar">
        <div className="rating-score-box">
          <span className="big-rating">{rating.toFixed(1)}</span>
          <Stars rating={rating} />
          <span className="rating-total">Based on {reviews.length} reviews</span>
        </div>

        <div className="rating-filter-pills">
          <button
            type="button"
            className={`pill-btn ${filterRating === null ? "active" : ""}`}
            onClick={() => setFilterRating(null)}
          >
            All ({reviews.length})
          </button>
          {[5, 4, 3].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            return (
              <button
                key={star}
                type="button"
                className={`pill-btn ${filterRating === star ? "active" : ""}`}
                onClick={() => setFilterRating(star === filterRating ? null : star)}
              >
                {star}★ ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Review cards */}
      <div className="reviews-list">
        {filteredReviews.length === 0 ? (
          <p className="no-reviews">No reviews match the selected filter.</p>
        ) : (
          filteredReviews.map((rev) => (
            <article key={rev.id} className="review-card">
              <div className="review-header">
                <div>
                  <div className="review-author-line">
                    <span className="review-author">{rev.author}</span>
                    {rev.verified && (
                      <span className="verified-badge">✓ Verified Buyer</span>
                    )}
                  </div>
                  <Stars rating={rev.rating} />
                </div>
                <span className="review-date">{rev.date}</span>
              </div>
              <h4 className="review-title">{rev.title}</h4>
              <p className="review-body">{rev.body}</p>
              <div className="review-foot">
                <button
                  type="button"
                  className={`btn-helpful ${votedIds.has(rev.id) ? "voted" : ""}`}
                  onClick={() => handleHelpful(rev.id)}
                  disabled={votedIds.has(rev.id)}
                >
                  👍 Helpful ({rev.helpful})
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
