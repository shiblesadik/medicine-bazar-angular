import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../services/http/http.service';
import {element} from 'protractor';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public serverData: Map<string, any>;
  public items: any = null;
  public list: any = [];

  constructor(private cartService: CartService,
              private http: HttpClient,
              private httpService: HttpService,
  ) {
    this.serverData = new Map<string, any>();
  }

  ngOnInit(): void {
    this.http.get(this.httpService.server + this.httpService.api.medicine.all)
      .subscribe((data: any) => {
        if (data.status === 'success') {
          this.serverData = new Map<string, any>();
          data.data.forEach((i: any) => {
            const obj: any = {
              id: i._id,
              name: i.name,
              company: i.company,
              price: i.price
            };
            this.serverData.set(i._id, obj);
          });
        }
      });
    this.items = Array.from(this.cartService.items.entries());
    this.list = [];
    this.items.forEach((i: any) => {
      let element: any = {
        id: i[0],
        count: i[1],
        name: 'Medicine Name',
        company: 'Company Name',
        price: 0.0,
      };
      this.list.push(element);
    });
  }

  public remove(index: any): void {
    const id: string = this.list[index].id;
    this.cartService.removeItem(id);
    this.list.splice(index, 1);
  }

  public add(index: any): void {
    const id: string = this.list[index].id;
    this.cartService.items.set(id,
      this.cartService.items.get(id) + 1);
    this.cartService.updateCart();
    this.list[index].count++;
  }
}
