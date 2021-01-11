import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpService} from '../http/http.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../storage/storage.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  public currentData: any;
  @Output() error = new EventEmitter<string>();

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private router: Router,
              private httpService: HttpService,
              private fireStorage: AngularFireStorage,
  ) {
  }

  public insert(medicine: any, image: string): void {
    const fileId = 'medicine/' + Math.random().toString() + Date.now().toString();
    this.fireStorage.ref(fileId).putString(image, 'data_url')
      .then((snapshot: any) => {
        this.fireStorage
          .ref(fileId)
          .getDownloadURL()
          .subscribe((url: string) => {
            medicine.img = url;
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
          });
      });
  }

  public update(medicine: any, id: string): void {
    this.http.patch(this.httpService.server +
      this.httpService.api.medicine.update + id,
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
