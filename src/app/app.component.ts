import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from './services/http/http.service';
import {StorageService} from './services/storage/storage.service';
import {AuthService} from './services/auth/auth.service';
import {UserService} from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLogin: boolean;
  public username: string;
  public userData: any;

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
  ) {
    this.authService.loginEvent.subscribe((isLogin: boolean) => {
      if (isLogin === true) {
        this.isLogin = true;
        this.userData = this.storageService.userData;
        this.username = this.storageService.userData.username;
      }
    });
    this.isLogin = this.storageService.isLogin;
    if (this.isLogin === true) {
      this.userData = this.storageService.userData;
      this.username = this.storageService.userData.username;
    }
  }

  public logout(): void {
    this.isLogin = false;
    this.userData = null;
    this.username = null;
    this.storageService.clear();
    this.router.navigate(['/']);
  }
}
