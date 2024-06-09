import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-ad',
  templateUrl: './popup-ad.component.html',
  styleUrls: ['./popup-ad.component.css']
})
export class PopupAdComponent implements OnInit {
  isVisible = false;

  ngOnInit(): void {
    // Show the pop-up when the component is initialized
    this.isVisible = true;
  }

  closePopup(): void {
    this.isVisible = false;
  }

  shopNow(): void {
    window.location.href = 'shop.html';
  }
}
