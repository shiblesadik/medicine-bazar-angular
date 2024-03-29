import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from './services/http/http.service';
import {StorageService} from './services/storage/storage.service';
import {AuthService} from './services/auth/auth.service';
import {UserService} from './services/user/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLogin: boolean;
  public username: string;
  public userData: any;

  constructor(private storageService: StorageService,
              private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private httpService: HttpService,
  ) {
    this.authService.loginEvent.subscribe((isLogin: boolean) => {
      if (isLogin === true) {
        this.isLogin = true;
        this.userData = this.storageService.userData;
        this.username = this.storageService.userData.username;
        this.httpService.updateHeaders(this.userData.token);
        console.log(this.userData);
      }
    });
    this.isLogin = this.storageService.isLogin;
    if (this.isLogin === true) {
      this.userData = this.storageService.userData;
      this.userService.userData = this.userData;
      this.username = this.storageService.userData.username;
      this.httpService.updateHeaders(this.userData.token);
      this.http.get(this.httpService.server +
        this.httpService.api.auth.info,
        {headers: this.httpService.headers})
        .subscribe((data: any) => {
          console.log('from server', data.data);
          const userData: any = {
            userId: data.data._id,
            phone: data.data.phone,
            username: data.data.name,
            role: data.data.role,
            token: this.userData.token,
            address: data.data.address,
          };
          console.log(userData);
          this.userService.userData = userData;
          if (this.userData.role !== data.data.role) {
            this.authService.generateToken(this.userData.phone);
          } else {
            this.userData = data.data;
            this.username = data.data.name;
          }
          if (data.status === 'success') {
          } else {
            this.isLogin = false;
            this.userData = null;
            this.username = null;
          }
        });
    }
  }

  public logout(): void {
    this.isLogin = false;
    this.userData = null;
    this.username = null;
    this.storageService.clear();
    this.userService.userData = null;
    this.httpService.clearHeader();
  }

  public gotoPath(path: string): void {
    if (path === '/role') {
      path = '/' + this.userData.role;
    }
    this.router.navigate([path]);
    return;
  }
}
