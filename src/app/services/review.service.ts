import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;

export interface Review {
  name: string;
  reviewtext: string;
  ratings: number;

}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews = new BehaviorSubject<Review[]>([]);
  currentReviews = this.reviews.asObservable();

  constructor(private _http: HttpClient) { }

  submitReview(name: string, reviewtext: string, ratings: number): Observable<any> {
    const reviewData: Review = {
      name,
      reviewtext,
      ratings,
    };
    console.log('Submitting review:', reviewData.name,reviewData.reviewtext,reviewData.ratings); // Log to ensure data integrity
    return this._http.post<any>(`${NAV_URL}/addReview`, reviewData);
  }

  getAllReviews(): Observable<Review[]> {
    return this._http.get<Review[]>(`${NAV_URL}/getallreviews`);
  }
}

