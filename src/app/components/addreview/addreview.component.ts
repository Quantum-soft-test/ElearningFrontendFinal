import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent implements OnInit {
  review = {
    name: '',
    reviewText: '',
    rating: 0
  };

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void { }

  setRating(rating: number) {
    this.review.rating = rating;
  }

  onSubmit() {
    alert('Review submitted successfully!');
    console.log("onSubmit button was pressed");
    const { name, reviewText, rating } = this.review;
    console.log(name, reviewText, rating, "AddReview->onSubmit.ts");

    const numericRating = Number(rating);
    if (isNaN(numericRating)) {
        console.error('Rating is not a valid number');
        return;
    }

    const reviewData = { name, reviewText, rating: numericRating, date: new Date() };
    console.log('Review data being sent:', reviewData.name,reviewText,reviewData.rating);

    this.reviewService.submitReview(name, reviewText, numericRating).subscribe({
      next: (response) => {
        console.log('Review submitted successfully', response);
        
        this.review.name = '';
        this.review.reviewText = '';
        this.review.rating = 0;
      },
      error: (error) => {
        console.error('Error submitting review', error);
      }
    });
  }


  clearForm(form: NgForm) {
    // Resetting the form and the model
    this.review = {
      name: '',
      reviewText: '',
      rating: 0
    };
    form.resetForm();

  }
}
