import React from 'react'
import ReviewCard from './ReviewCard'
import review from '../../../../assets/review.png'
export default function UsersReview() {
  return (
<>
    <ReviewCard
    imageUrl={review}
    title="Happy Family"
    rating={5}
    reviewText="What a great trip with my family and I should try again next time soon ..."
    reviewerName="Angga"
    reviewerRole="Product Designer"/>
</>  
)
}
