
interface IReview {
  id?: string;
  rating?: number;
}

class Review implements IReview {
  id?: string;
  rating?: number;

  constructor(o: IReview = { }) {
    this.id = o.id;
    this.rating = o.rating;
  }
}

export default Review;