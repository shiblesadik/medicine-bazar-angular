import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http/http.service';
import {Router} from '@angular/router';
import {AdminService} from '../services/admin/admin.service';
import {ModalManager} from 'ngb-modal';
import {OrderService} from '../services/order/order.service';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.css']
})
export class RepresentativeComponent implements OnInit {
  orders: any;
  showData: number;
  arrived: boolean;

  constructor(private httpService: HttpService,
              private router: Router,
              private adminService: AdminService,
              private modalService: ModalManager,
              private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.showData = 0;
    this.arrived = false;
  }

  public viewDetails(tag: string): void {
    let url: string = this.httpService.server;
    this.showData = 0;
    let show = 0;
    this.arrived = false;
    switch (tag) {
      case 'complete':
        url += this.httpService.api.order.complete;
        this.showData = 2;
        show = 2;
        this.fetchOrder('complete');
        break;
      case 'pending':
        url += this.httpService.api.order.pending;
        this.showData = 2;
        show = 2;
        this.fetchOrder('pending');
        break;
      case 'cancel':
        url += this.httpService.api.order.cancel;
        this.showData = 2;
        show = 2;
        this.fetchOrder('cancel');
        break;
      case 'review-order':
        url += this.httpService.api.order.review;
        this.showData = 2;
        show = 2;
        this.fetchOrder('review');
        break;
      default:
        return;
    }
  }

  private fetchOrder(review: string): void {
    this.adminService.getDeliveryman();
    this.orderService.fetchOrders(review).subscribe((data: any) => {
      if (data.status === 'success') {
        this.arrived = true;
        this.orders = data.data;
        console.log(this.orders);
      }
    });
  }

}
