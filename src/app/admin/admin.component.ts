import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http/http.service';
import {Router} from '@angular/router';
import {AdminService} from '../services/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showData: boolean;

  constructor(private httpService: HttpService,
              private router: Router,
              private adminService: AdminService,
  ) {
    this.showData = false;
  }

  ngOnInit(): void {
  }

  public viewDetails(tag: string): void {
    if (tag === 'add') {
      this.router.navigate(['/medicine/insert']);
      return;
    }
    let url: string = this.httpService.server;
    this.showData = true;
    switch (tag) {
      case 'medicine':
        url += this.httpService.api.medicine.all;
        break;
      case 'complete':
        url += this.httpService.api.order.complete;
        break;
      case 'pending':
        url += this.httpService.api.order.pending;
        break;
      case 'cancel':
        url += this.httpService.api.order.cancel;
        break;
      case 'doctor':
        url += this.httpService.api.auth.doctor;
        break;
      case 'representative':
        url += this.httpService.api.auth.representative;
        break;
      case 'deliveryman':
        url += this.httpService.api.auth.deliveryman;
        break;
      case 'customer':
        url += this.httpService.api.auth.customer;
        break;
      default:
        return;
    }
    // this.adminService.getData(url).subscribe((data: any) => {
    //   console.log(data);
    // });
  }
}
