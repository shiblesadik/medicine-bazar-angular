import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public carousel1 = 'active';
  public carousel2 = '';
  public carousel3 = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  public next(): void {
    if (this.carousel1 === 'active') {
      this.carousel2 = 'active';
      this.carousel1 = '';
    } else if (this.carousel2 === 'active') {
      this.carousel3 = 'active';
      this.carousel2 = '';
    } else {
      this.carousel1 = 'active';
      this.carousel3 = '';
    }
  }

  public pre(): void {
    if (this.carousel1 === 'active') {
      this.carousel3 = 'active';
      this.carousel1 = '';
    } else if (this.carousel2 === 'active') {
      this.carousel1 = 'active';
      this.carousel2 = '';
    } else {
      this.carousel2 = 'active';
      this.carousel3 = '';
    }
  }

}
