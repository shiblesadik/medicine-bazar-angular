import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpService} from '../http/http.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  public currentData: any;
  @Output() error = new EventEmitter<string>();

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private router: Router,
              private httpService: HttpService) {
  }

  public insert(medicine): void {
    this.http.post(this.httpService.server +
      this.httpService.api.medicine.insert,
      medicine,
      {headers: this.httpService.headers})
      .subscribe((data: any) => {
        if (data.status === 'success') {
          this.router.navigate(['/']);
        } else if (data.error) {
          this.error.emit(data.error);
        }
      });
  }

  public delete(id: string): void {
    this.http.delete(this.httpService.server +
      this.httpService.api.medicine.delete + '/' + id).subscribe((data: any) => {
      if (data.status === 'success') {
        this.router.navigate(['/admin']);
      } else if (data.error) {
        this.error.emit(data.error);
      }
    });
  }
}
