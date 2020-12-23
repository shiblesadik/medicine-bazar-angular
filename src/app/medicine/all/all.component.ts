import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http/http.service';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  public medicines: any = [];

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private cartService: CartService,
  ) {
    this.http.get(this.httpService.server + this.httpService.api.medicine.all)
      .subscribe((data: any) => {
        if (data.status === 'success') {
          this.medicines = data.data;
        }
      });

  }

  ngOnInit(): void {
  }

  public addToCart(id: string): void {
    if (this.cartService.items.has(id)) {
      this.cartService.items.set(id, this.cartService.items.get(id) + 1);
    } else {
      this.cartService.items.set(id, 1);
    }
    this.cartService.updateCart();
  }
}
