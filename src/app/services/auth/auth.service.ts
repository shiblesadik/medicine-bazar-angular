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

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private storageService: StorageService,
              private router: Router,
  ) {
    this.userData = null;
    this.isLogin = this.storageService.isLogin;
  }

  public generateToken(): void {
    let body = {phone: this.phone};
    if (this.userData !== null) {
      body = this.userData;
    }
    console.log(body);
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
}