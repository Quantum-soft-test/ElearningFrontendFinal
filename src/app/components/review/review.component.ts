import { Component, OnInit } from '@angular/core';
import { ReviewService, Review } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        console.log('Reviews loaded successfully', data);
      },
      error: (error) => {
        console.error('Error loading reviews', error);
      }
    });
  }
}
