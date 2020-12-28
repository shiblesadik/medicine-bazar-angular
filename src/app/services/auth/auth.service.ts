import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from '../http/http.service';
import {StorageService} from '../storage/storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public phone: string;
  public userData: any;
  public isLogin: boolean;
  @Output() loginEvent = new EventEmitter<boolean>();
  @Output() adminRegister = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private storageService: StorageService,
              private router: Router,
  ) {
    this.userData = null;
    this.isLogin = this.storageService.isLogin;
  }

  public generateToken(phoneNumber: string, userData: any = null): void {
    let body = {phone: phoneNumber};
    if (userData !== null) {
      body = userData;
    }
    this.http.post(this.httpService.server +
      this.httpService.api.auth.user.register,
      body,
      {headers: this.httpService.authHeaders})
      .subscribe((data: any) => {
        if (data.status === 'success') {
          this.isLogin = true;
          this.storageService.login(data);
          this.router.navigate(['/']).then(() => {
            this.loginEvent.emit(true);
          });
        }
      });
  }

  public registerUser(userData: any): void {
    userData.phone = '+88' + userData.phone;
    this.http.post(this.httpService.server +
      this.httpService.api.auth.admin,
      userData,
      {headers: this.httpService.headers})
      .subscribe((data: any) => {
        if (data.status === 'success') {
          this.isLogin = true;
          this.router.navigate(['/']).then(() => {
          });
        } else {
          this.adminRegister.emit(false);
        }
      });
  }
}
