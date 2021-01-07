import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalManager} from 'ngb-modal';
import {OrderService} from '../../services/order/order.service';
import {AdminService} from '../../services/admin/admin.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('deliverymanModal') deliverymanModal: any;
  modalRef: any;
  @Input() order: any;
  deliveryman: any = [];

  constructor(private modalService: ModalManager,
              private orderService: OrderService,
              private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
  }

  public updateStatus(orderId: string): void {
    this.deliveryman = this.adminService.deliveryman;
    this.modalRef = this.modalService.open(this.deliverymanModal, {
      size: 'md',
      modalClass: 'deliverymanModal',
      hideCloseButton: false,
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: false,
      backdropClass: 'modal-backdrop'
    });
  }

  public closeModal(): void {
    this.modalService.close(this.modalRef);
  }

  public update(status: string): void {
    this.orderService.updateStatus(this.order._id, status).subscribe((data: any) => {
      console.log(data);
    });
  }
}
