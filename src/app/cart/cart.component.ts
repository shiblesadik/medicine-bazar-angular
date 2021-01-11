import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../services/http/http.service';
import {element} from 'protractor';
import {Router} from '@angular/router';
import {Cart} from '../services/cart/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public serverData: Map<string, Cart>;
  public items: any = null;
  public list: any = [];
  public arrived: boolean;
  public totalPrice: number;

  constructor(private cartService: CartService,
              private http: HttpClient,
              private httpService: HttpService,
              private router: Router,
  ) {
    this.totalPrice = 0;
  }

  ngOnInit(): void {
    this.arrived = false;
    this.items = Array.from(this.cartService.items.entries());
    this.list = [];
    this.items.forEach((i: any) => {
      const data: any = {
        id: i[0],
        count: i[1].count,
        img: i[1].img,
        fullCount: i[1].fullCount,
        name: i[1].name,
        company: i[1].company,
        description: i[1].description,
        type: i[1].type,
        price: i[1].price,
        fullPrice: i[1].fullPrice,
      };
      this.totalPrice += (data.count * data.price) + (data.fullCount * data.fullPrice);
      this.list.push(data);
    });
  }

  public remove(index: any): void {
    const id: string = this.list[index].id;
    const cart: Cart = this.cartService.items.get(id);
    this.totalPrice -= (cart.count * cart.price) + (cart.fullCount * cart.fullPrice);
    this.cartService.removeItem(id);
    this.list.splice(index, 1);
  }

  public add(index: any): void {
    const id: string = this.list[index].id;
    const cart: Cart = this.cartService.items.get(id);
    cart.count++;
    this.cartService.items.set(id, cart);
    this.cartService.updateCart();
    this.list[index].count++;
  }

  public calculate(count: number, price: number, fullCount: number, fullPrice: number): number {
    return (count * price) + (fullCount * fullPrice);
  }

  public confirm(): void {
    this.router.navigate(['/cart/confirm']);
  }

  public clearAll(): void {
    this.list = [];
    this.totalPrice = 0;
    this.cartService.clearAll();
  }

}
