import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http/http.service';
import {Router} from '@angular/router';
import {ModalManager} from 'ngb-modal';
import {OrderService} from '../services/order/order.service';

@Component({
  selector: 'app-deliveryman',
  templateUrl: './deliveryman.component.html',
  styleUrls: ['./deliveryman.component.css']
})
export class DeliverymanComponent implements OnInit {
  orders: any;
  showData: number;
  arrived: boolean;

  constructor(private httpService: HttpService,
              private router: Router,
              private modalService: ModalManager,
              private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.showData = 0;
    this.arrived = false;
    this.fetchOrder();
  }

  private fetchOrder(): void {
    this.orderService.fetchOrderByDeliveryman().subscribe((data: any) => {
      if (data.status === 'success') {
        this.arrived = true;
        this.orders = data.data;
        console.log(this.orders);
      }
    });
  }
}
