import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../services/http/http.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public list: any = [];
  private serverData: Map<string, any>;

  constructor(private authService: AuthService,
              private router: Router,
              private http: HttpClient,
              private httpService: HttpService,
  ) {
    this.serverData = new Map<string, any>();
    if (authService.isLogin === false) {
      this.router.navigate(['/auth/user']);
    } else {
      this.http.get(this.httpService.server + this.httpService.api.order.my,
        {headers: this.httpService.headers})
        .subscribe((data: any) => {
          if (data.status === 'success') {
            this.list = data.data;
            console.log(this.list);
            this.http.get(this.httpService.server + this.httpService.api.medicine.all)
              .subscribe((v: any) => {
                if (v.status === 'success') {
                  v.data.forEach((i: any) => {
                    const obj: any = {
                      id: i._id,
                      name: i.name,
                      company: i.company,
                      price: i.price,
                    };
                    this.serverData.set(i._id, obj);
                  });
                }
              });
          }
        });
    }
  }

  ngOnInit(): void {
  }

  public totalPrice(price: number, count: number): number {
    return price * count;
  }

  public calculate(count: number, price: number, fullCount: number, fullPrice: number): number {
    return (count * price) + (fullCount * fullPrice);
  }

}
