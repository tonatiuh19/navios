import React from "react";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StarRatingStyles } from "./StarRating.style";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <View style={StarRatingStyles.container}>
      {/* Render full stars */}
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
          <FontAwesome
            key={`full-${index}`}
            name="star"
            style={StarRatingStyles.star}
          />
        ))}
      {/* Render half star */}
      {halfStar && (
        <FontAwesome
          key="half-star"
          name="star-half-full"
          style={StarRatingStyles.halfStar}
        />
      )}
      {/* Render empty stars */}
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <FontAwesome
            key={`empty-${index}`}
            name="star-o"
            style={StarRatingStyles.emptyStar}
          />
        ))}
    </View>
  );
};

export default StarRating;
