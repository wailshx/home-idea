import { useState } from "react";
import { Star, ChevronDown, ChevronUp, BadgeCheck } from "lucide-react";
import { ProductReview } from "@/lib/products";

type ReviewsSectionProps = {
  reviews: ProductReview[];
  rating?: number;
  reviewCount?: number;
};

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => {
  const sizeClass = size === "md" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i <= rating ? "fill-gold text-gold" : i <= rating + 0.5 ? "fill-gold/50 text-gold/50" : "text-gold/20"
          }`}
        />
      ))}
    </div>
  );
};

const RatingBar = ({ stars, count, total }: { stars: number; count: number; total: number }) => {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-6 text-right text-gold/70">{stars}</span>
      <Star className="w-3 h-3 fill-gold text-gold" />
      <div className="flex-1 h-1.5 bg-gold/10 overflow-hidden">
        <div className="h-full bg-gradient-gold transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right text-muted-foreground">{count}</span>
    </div>
  );
};

const ReviewsSection = ({ reviews, rating = 0, reviewCount = 0 }: ReviewsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 3);

  // Count stars distribution
  const distribution = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) distribution[r.rating - 1]++;
  });

  return (
    <div>
      <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-8">Avis clients</div>

      {/* Summary */}
      <div className="grid md:grid-cols-[200px_1fr] gap-8 mb-10 pb-10 border-b border-gold/10">
        <div className="text-center md:text-left">
          <div className="font-display text-5xl text-gradient-gold mb-2">{rating.toFixed(1)}</div>
          <StarRating rating={rating} size="md" />
          <p className="text-xs text-muted-foreground mt-2">{reviewCount} avis</p>
        </div>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((s) => (
            <RatingBar key={s} stars={s} count={distribution[s - 1]} total={reviews.length} />
          ))}
        </div>
      </div>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">Aucun avis pour ce produit.</p>
      ) : (
        <>
          <div className="space-y-6">
            {displayed.map((review, i) => (
              <div
                key={i}
                className="border border-gold/10 p-6 hover:border-gold/25 transition-colors anim-rise"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{review.author}</span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-gold">
                          <BadgeCheck className="w-3 h-3" /> Vérifié
                        </span>
                      )}
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>

          {reviews.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-6 flex items-center gap-2 mx-auto text-xs tracking-[0.2em] uppercase text-gold border-b border-gold/40 pb-0.5 hover:text-gold-soft transition-colors"
            >
              {showAll ? (
                <>
                  Voir moins <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Voir tous les avis ({reviews.length}) <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsSection;
