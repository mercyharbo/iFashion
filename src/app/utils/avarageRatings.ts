export const CalculateAverageRating = (reviews: { rating: number }[]) => {
    if (reviews.length === 0) {
    return 0; // Default rating if there are no reviews
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return averageRating;
};
