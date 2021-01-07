import {Injectable} from '@angular/core';
import {HttpService} from '../http/http.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpService: HttpService,
              private http: HttpClient,
  ) {
  }


  public fetchOrders(review: string): any {
    if (review === 'complete') {
      return this.http.get(this.httpService.server + this.httpService.api.order.complete, {headers: this.httpService.headers});
    } else if (review === 'cancel') {
      return this.http.get(this.httpService.server + this.httpService.api.order.cancel, {headers: this.httpService.headers});
    } else if (review === 'review') {
      return this.http.get(this.httpService.server + this.httpService.api.order.review, {headers: this.httpService.headers});
    } else if (review === 'pending') {
      return this.http.get(this.httpService.server + this.httpService.api.order.pending, {headers: this.httpService.headers});
    } else {
      return [];
    }
  }

  public assignDeliveryman(orderId: string, deliverymanId: string): any {
    const body: any = {
      orderId,
      deliverymanId
    };
    return this.http.post(this.httpService.server + this.httpService.api.order.permit, body, {headers: this.httpService.headers});
  }
}
