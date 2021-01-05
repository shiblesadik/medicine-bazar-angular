import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../services/http/http.service';
import {Router} from '@angular/router';
import {AdminService} from '../services/admin/admin.service';
import {ModalManager} from 'ngb-modal';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('doctorsModal') doctorsModal: any;
  modalRef: any;
  showData: number;
  arrived: boolean;
  selectedUser: any;
  medicines: any;
  users: any;
  orders: any;
  requests: any;
  doctors: any;

  constructor(private httpService: HttpService,
              private router: Router,
              private adminService: AdminService,
              private modalService: ModalManager,
  ) {
    this.showData = 0;
    this.arrived = false;
  }

  ngOnInit(): void {
    this.selectedUser = null;
  }

  public viewDetails(tag: string): void {
    if (tag === 'add') {
      this.router.navigate(['/medicine/insert']);
      return;
    }
    if (tag === 'user') {
      this.router.navigate(['/auth/admin']);
      return;
    }
    let url: string = this.httpService.server;
    this.showData = 0;
    let show = 0;
    this.arrived = false;
    switch (tag) {
      case 'medicine':
        url += this.httpService.api.medicine.all;
        this.showData = 1;
        show = 1;
        break;
      case 'danger':
        url += this.httpService.api.medicine.danger;
        this.showData = 1;
        show = 1;
        break;
      case 'edit':
        url += this.httpService.api.medicine.all;
        this.showData = 1;
        show = 1;
        break;
      case 'complete':
        url += this.httpService.api.order.complete;
        this.showData = 2;
        show = 2;
        break;
      case 'pending':
        url += this.httpService.api.order.pending;
        this.showData = 2;
        show = 2;
        break;
      case 'cancel':
        url += this.httpService.api.order.cancel;
        this.showData = 2;
        show = 2;
        break;
      case 'complain':
        url += this.httpService.api.order.complain;
        this.showData = 2;
        show = 2;
        break;
      case 'review':
        url += this.httpService.api.doctor.request;
        this.showData = 4;
        show = 4;
        this.showConsultationRequest();
        break;
      case 'doctor':
        url += this.httpService.api.user.doctor;
        this.showData = 3;
        show = 3;
        break;
      case 'representative':
        url += this.httpService.api.user.representative;
        this.showData = 3;
        show = 3;
        break;
      case 'deliveryman':
        url += this.httpService.api.user.deliveryman;
        this.showData = 3;
        show = 3;
        break;
      case 'customer':
        url += this.httpService.api.user.customer;
        this.showData = 3;
        show = 3;
        break;
      default:
        return;
    }
    this.adminService.getData(url).subscribe((data: any) => {
      this.arrived = true;
      if (data.status === 'success') {
        if (show === 1) {
          this.medicines = data.data;
        } else if (show === 2) {
          this.orders = data.data;
        } else if (show === 3) {
          this.users = data.data;
        }
      }
    });
  }

  private showConsultationRequest(): void {
    this.adminService.getConsultation().subscribe((data: any) => {
      if (data.status === 'success') {
        this.requests = data.data;
      }
    });
    this.adminService.getDoctors().subscribe((data: any) => {
      if (data.status === 'success') {
        this.doctors = data.data;
      }
    });
  }

  public viewDoctors(info: any): void {
    this.selectedUser = info;
    this.modalRef = this.modalService.open(this.doctorsModal, {
      size: 'md',
      modalClass: 'doctorsModal',
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

  public permit(doctor: any): void {
    console.log(doctor, this.selectedUser);
    const body: any = {
      user: this.selectedUser.name,
      userId: this.selectedUser.userId,
      doctor: doctor.name,
      doctorId: doctor._id
    };
    this.adminService.permit({requestId: this.selectedUser._id}).subscribe((data: any) => {
      if (data.status === 'success') {
        this.adminService.createDoc(body);
        this.selectedUser = null;
        this.modalService.close(this.modalRef);
        this.showConsultationRequest();
      }
    });
  }
}
