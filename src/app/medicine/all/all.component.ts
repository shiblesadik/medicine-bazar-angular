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
  public backup: any = [];
  public searchInput: string;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private cartService: CartService,
  ) {
    this.http.get(this.httpService.server + this.httpService.api.medicine.all)
      .subscribe((data: any) => {
        if (data.status === 'success') {
          this.medicines = data.data;
          this.backup = JSON.parse(JSON.stringify(this.medicines));
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

  public search(): void {
    this.medicines = [];
    this.backup.forEach((medicine: any) => {
      const name = medicine.name.toLowerCase().toString();
      const company = medicine.company.toLowerCase().toString();
      const searchStr = this.searchInput.toLowerCase().toString().trim();
      if (name.includes(searchStr)) {
        this.medicines.push(medicine);
      } else if (company.includes(searchStr)) {
        this.medicines.push(medicine);
      }
    });
  }

  public clear(): void {
    this.medicines = [];
    this.searchInput = '';
    this.medicines = this.backup;
  }
}
