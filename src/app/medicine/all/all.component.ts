import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http/http.service';
import {CartService} from '../../services/cart/cart.service';
import {Router} from '@angular/router';
import {Cart} from '../../services/cart/cart';
import {Counter} from './Counter';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})

export class AllComponent implements OnInit {
  public medicines: any = [];
  public backup: any = [];
  public searchInput: string;
  counter: Map<string, Counter>;

  constructor(private http: HttpClient,
              private router: Router,
              private httpService: HttpService,
              private cartService: CartService,
  ) {
    this.counter = new Map<string, Counter>();
    this.cartService.getAll()
      .subscribe((data: any) => {
        if (data.status === 'success') {
          this.medicines = data.data;
          this.backup = JSON.parse(JSON.stringify(this.medicines));
          data.data.forEach((i: any) => {
            if (this.cartService.items.has(i._id)) {
              const cart: Cart = this.cartService.items.get(i._id);
              const count: Counter = {
                count: cart.count,
                fullCount: cart.fullCount
              };
              this.counter.set(i._id, count);
            } else {
              const count: Counter = {
                count: 0,
                fullCount: 0
              };
              this.counter.set(i._id, count);
            }

          });
        }
      });

  }

  ngOnInit(): void {
  }

  public addToCart(id: string, medicine: any): void {
    const count: Counter = this.counter.get(id);
    console.log(count);
    if (this.cartService.items.has(id)) {
      const cart: Cart = this.cartService.items.get(id);
      cart.count = count.count;
      cart.fullCount = count.fullCount;
      if (count.count === 0 && count.fullCount === 0) {
        this.cartService.removeItem(id);
      } else {
        this.cartService.items.set(id, cart);
      }
    } else {
      const cart: Cart = {
        id: medicine._id,
        name: medicine.name,
        company: medicine.company,
        img: medicine.img,
        description: medicine.description,
        type: medicine.type,
        price: medicine.price,
        fullPrice: medicine.fullPrice,
        count: count.count,
        fullCount: count.fullCount
      };
      if (count.count > 0 || count.fullCount > 0) {
        this.cartService.items.set(id, cart);
      }
    }
    this.cartService.updateCart();
  }

  public search(): void {
    this.medicines = [];
    this.backup.forEach((medicine: any) => {
      const name = medicine.name.toLowerCase().toString();
      const company = medicine.company.toLowerCase().toString();
      const description = medicine.description.toLowerCase().toString();
      const type = medicine.type.toLowerCase().toString();
      const searchStr = this.searchInput.toLowerCase().toString().trim();
      if (name.includes(searchStr)) {
        this.medicines.push(medicine);
      } else if (company.includes(searchStr)) {
        this.medicines.push(medicine);
      } else if (description.includes(searchStr)) {
        this.medicines.push(medicine);
      } else if (type.includes(searchStr)) {
        this.medicines.push(medicine);
      }
    });
  }

  public clear(): void {
    this.medicines = [];
    this.searchInput = '';
    this.medicines = this.backup;
  }

  public gotoPath(path: string): void {
    this.router.navigate([path]);
    return;
  }

  public plus(id: string, type: number): void {
    if (type === 1) {
      const count: Counter = this.counter.get(id);
      count.count++;
      this.counter.set(id, count);
    } else if (type === 2) {
      const count: Counter = this.counter.get(id);
      count.fullCount++;
      this.counter.set(id, count);
    }
  }

  public minus(id: string, type: number): void {
    if (type === 1) {
      const count: Counter = this.counter.get(id);
      count.count--;
      if (count.count < 0) {
        count.count = 0;
      }
      this.counter.set(id, count);
    } else if (type === 2) {
      const count: Counter = this.counter.get(id);
      count.fullCount--;
      if (count.fullCount < 0) {
        count.fullCount = 0;
      }
      this.counter.set(id, count);
    }
  }

  public calculate(count: number, price: number, fullCount: number, fullPrice: number): number {
    return (count * price) + (fullCount * fullPrice);
  }
}
