import { Injectable } from '@angular/core';
import { MovieReview } from '../models/review';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieReviewsService {

  allMovieReviews: MovieReview[] = [];
  public reviewsChanged: BehaviorSubject<string> = new BehaviorSubject<string>("None");

  constructor() { }

  /** Create Review */
  createReview(data:any): void {
    let reviewID = this.allMovieReviews.length+1;
    let review = data;
    review.reviewId = reviewID
    this.allMovieReviews.push(review);
  }

  /** Get all Reviews */
  getReviews() {
    return this.allMovieReviews;
  }

  /** Get Review */
  getReview(id:number): any {
    return this.allMovieReviews[id-1];
  }

  /** Update Review */
  updateReview(id:number, data:any){
    this.allMovieReviews[id-1] = data;
  }

  /** Delete Review */
  deleteReview(id:number): void {
    this.allMovieReviews.splice(id-1, 1);
  }

}
