import { Star, StarHalf, StarOff } from "lucide-react";

const StarsDisplay = ({ rating = 0, size = "w-4 h-4" }) => {
  const r = Number(rating) || 0;
  const stars = [];
  const fullStars = Math.floor(r);
  const hasHalf = r - fullStars >= 0.5 && fullStars < 5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className={`${size} text-digital-blue`} />
    );
  }

  if (hasHalf) {
    stars.push(<StarHalf key={`half`} className={`${size} text-digital-blue`} />);
  }

  const emptyCount = 5 - stars.length;
  for (let i = 0; i < emptyCount; i++) {
    stars.push(
      <StarOff key={`empty-${i}`} className={`${size} text-gray-200`} />
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default StarsDisplay;
