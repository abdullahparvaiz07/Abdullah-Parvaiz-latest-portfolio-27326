/**
 * ReviewSection — A premium review/testimonial section where visitors
 * can leave a star rating and comment about Abdullah's work.
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MessageSquarePlus, User, Quote, Trash2, ShieldCheck, X } from "lucide-react";

/* ─── Types ─── */
interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

/* ─── Seed Reviews ─── */
const seedReviews: Review[] = [
  {
    id: 0,
    name: "Sarah Mitchell",
    rating: 5,
    comment:
      "Abdullah delivered an outstanding portfolio project — the animations are silky smooth and the overall UX is world-class. Highly recommended!",
    date: "Apr 2026",
  },
  {
    id: 1,
    name: "James Carter",
    rating: 4,
    comment:
      "Very professional work with clean code and great attention to detail. The dark-mode design is sleek and modern.",
    date: "Mar 2026",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    rating: 5,
    comment:
      "One of the best developer portfolios I've seen. The 3D hero section and project carousel are absolutely stunning!",
    date: "Feb 2026",
  },
];

/* ─── Star Rating Input ─── */
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="review-star-input" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`review-star-btn ${
            star <= (hover || value) ? "active" : ""
          }`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            size={28}
            fill={star <= (hover || value) ? "#f97316" : "transparent"}
            stroke={star <= (hover || value) ? "#f97316" : "#555"}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

/* ─── Single Review Card ─── */
function ReviewCard({
  review,
  index,
  isAdmin,
  onDelete,
}: {
  review: Review;
  index: number;
  isAdmin: boolean;
  onDelete: (id: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`review-card ${isAdmin ? "review-card--admin" : ""}`}
      layout
    >
      {/* Admin delete button */}
      <AnimatePresence>
        {isAdmin && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="review-delete-btn"
            onClick={() => onDelete(review.id)}
            title="Delete this review"
            aria-label="Delete review"
          >
            <Trash2 size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Decorative quote icon */}
      <Quote
        size={32}
        className="review-quote-icon"
        strokeWidth={1}
      />

      {/* Stars */}
      <div className="review-card-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < review.rating ? "#f97316" : "transparent"}
            stroke={i < review.rating ? "#f97316" : "#444"}
            strokeWidth={1.5}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="review-card-comment">{review.comment}</p>

      {/* Author */}
      <div className="review-card-author">
        <div className="review-avatar">
          {review.name.charAt(0)}
        </div>
        <div>
          <span className="review-author-name">{review.name}</span>
          <span className="review-author-date">{review.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({ name: "", rating: "", comment: "" });
  const [showThankYou, setShowThankYou] = useState(false);

  /* ─── Admin Mode (Ctrl + Shift + A) ─── */
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const handleAdminShortcut = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
      e.preventDefault();
      setIsAdmin((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleAdminShortcut);
    return () => window.removeEventListener("keydown", handleAdminShortcut);
  }, [handleAdminShortcut]);

  const requestDelete = (id: number) => setDeleteTarget(id);
  const cancelDelete = () => setDeleteTarget(null);
  const confirmDelete = () => {
    if (deleteTarget !== null) {
      setReviews((prev) => prev.filter((r) => r.id !== deleteTarget));
      setDeleteTarget(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: "", rating: "", comment: "" };
    let valid = true;

    if (!name.trim()) {
      newErrors.name = "Please enter your name";
      valid = false;
    }
    if (rating === 0) {
      newErrors.rating = "Please select a rating";
      valid = false;
    }
    if (!comment.trim()) {
      newErrors.comment = "Please write a comment";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const newReview: Review = {
        id: Date.now(),
        name: name.trim(),
        rating,
        comment: comment.trim(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
      };
      setReviews((prev) => [newReview, ...prev]);
      setName("");
      setRating(0);
      setComment("");
      setShowThankYou(true);
    }
  };

  const dismissThankYou = () => setShowThankYou(false);

  /* Average rating */
  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "0";

  return (
    <>
      <section
        id="reviews"
        className="review-section"
      >
        {/* Background FX */}
        <div className="review-bg-glow review-bg-glow--top" />
        <div className="review-bg-glow review-bg-glow--bottom" />

        <div className="review-container">
          {/* ─── Header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="review-header"
          >
            <div className="review-eyebrow">
              <div className="review-eyebrow-line" />
              <span>Testimonials</span>
            </div>

            <h2 className="review-title">
              What People <span className="text-orange-500">Say</span>
            </h2>

            <p className="review-subtitle">
              Hear from those who've experienced my work first-hand.
            </p>

            {/* Aggregate rating pill */}
            <div className="review-aggregate">
              <Star size={18} fill="#f97316" stroke="#f97316" />
              <span className="review-aggregate-num">{avg}</span>
              <span className="review-aggregate-count">
                ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
              </span>
            </div>
          </motion.div>

          {/* ─── Admin Badge ─── */}
          <AnimatePresence>
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="review-admin-badge"
              >
                <ShieldCheck size={16} />
                <span>Admin Mode — click the trash icon to delete reviews</span>
                <button onClick={() => setIsAdmin(false)} className="review-admin-close">
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Cards Grid ─── */}
          <div className="review-grid">
            <AnimatePresence mode="popLayout">
              {reviews.map((r, i) => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  index={i}
                  isAdmin={isAdmin}
                  onDelete={requestDelete}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* ─── Submit Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="review-form-wrapper"
          >
            <div className="review-form-header">
              <MessageSquarePlus size={22} className="text-orange-500" />
              <h3>Leave a Review</h3>
            </div>

            <form onSubmit={handleSubmit} className="review-form">
              {/* Name */}
              <div className="review-field">
                <label htmlFor="review-name">Your Name</label>
                <div className="review-input-wrap">
                  <User size={16} className="review-input-icon" />
                  <input
                    id="review-name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                  />
                </div>
                {errors.name && (
                  <span className="review-error">{errors.name}</span>
                )}
              </div>

              {/* Rating */}
              <div className="review-field">
                <label>Your Rating</label>
                <StarRating value={rating} onChange={(v) => {
                  setRating(v);
                  if (errors.rating) setErrors({ ...errors, rating: "" });
                }} />
                {errors.rating && (
                  <span className="review-error">{errors.rating}</span>
                )}
              </div>

              {/* Comment */}
              <div className="review-field">
                <label htmlFor="review-comment">Your Comment</label>
                <textarea
                  id="review-comment"
                  rows={4}
                  placeholder="Share your experience…"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    if (errors.comment) setErrors({ ...errors, comment: "" });
                  }}
                />
                {errors.comment && (
                  <span className="review-error">{errors.comment}</span>
                )}
              </div>

              <button type="submit" className="review-submit-btn">
                Submit Review
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ─── Thank-You Modal ─── */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="review-modal-overlay"
            onClick={dismissThankYou}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="review-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glows */}
              <div className="review-modal-glow review-modal-glow--a" />
              <div className="review-modal-glow review-modal-glow--b" />

              {/* Emoji burst */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 14,
                }}
                className="review-modal-emoji"
              >
                🎉
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="review-modal-title"
              >
                Thank You! 🙏
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="review-modal-msg"
              >
                Your review means the world to me! ✨<br />
                I truly appreciate your feedback and support.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="review-modal-stars-row"
              >
                {["⭐", "⭐", "⭐", "⭐", "⭐"].map((s, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.55 + i * 0.08,
                      type: "spring",
                      stiffness: 300,
                      damping: 12,
                    }}
                    className="review-modal-star-emoji"
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                onClick={dismissThankYou}
                className="review-modal-btn"
              >
                Awesome! 🚀
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Delete Confirmation Modal ─── */}
      <AnimatePresence>
        {deleteTarget !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="review-modal-overlay"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="review-modal-card review-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="review-modal-glow review-modal-glow--delete" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
                className="review-delete-icon-wrap"
              >
                <Trash2 size={32} />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="review-modal-title"
              >
                Delete Review?
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="review-modal-msg"
              >
                This action cannot be undone. Are you sure you want to remove this testimonial?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="review-delete-actions"
              >
                <button onClick={cancelDelete} className="review-delete-cancel">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="review-delete-confirm">
                  <Trash2 size={15} />
                  Delete
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
