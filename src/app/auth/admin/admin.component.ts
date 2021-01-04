import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  phoneNumber: string;
  usernameValidation: string;
  username: string;
  address: string;
  addressValidation: string;
  agreeValidation: string;
  agree: boolean;
  email: string;
  emailValidation: string;
  role: string;
  roleValidation: string;
  phoneNumberValidation: string;

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService
  ) {
    if (this.userService.userData === undefined || this.userService.userData === null || this.userService.userData.role !== 'admin') {
      this.router.navigate(['/']);
    }
    this.authService.adminRegister.subscribe((data: boolean) => {
      this.emailValidation = 'is-invalid';
    });
  }

  ngOnInit(): void {
  }

  public submit(): void {
    let ok: boolean;
    ok = true;

    this.phoneNumberValidation = null;
    this.agreeValidation = null;
    this.addressValidation = null;
    this.usernameValidation = null;
    this.roleValidation = null;
    this.emailValidation = null;

    if (this.phoneNumber === undefined ||
      this.phoneNumber.length !== 11 ||
      this.phoneNumber.charAt(0) !== '0' ||
      this.phoneNumber.charAt(1) !== '1') {
      this.phoneNumberValidation = 'is-invalid';
      ok = false;
    } else {
      this.phoneNumberValidation = 'is-valid';
    }
    if (this.agree !== true) {
      this.agreeValidation = 'is-invalid';
      ok = false;
    } else {
      this.agreeValidation = 'is-valid';
    }
    if (this.address === undefined || this.address.length < 6) {
      this.addressValidation = 'is-invalid';
      ok = false;
    } else {
      this.addressValidation = 'is-valid';
    }
    if (this.username === undefined || this.username.length < 3) {
      this.usernameValidation = 'is-invalid';
      ok = false;
    } else {
      this.usernameValidation = 'is-valid';
    }
    if (this.role === undefined) {
      this.roleValidation = 'is-invalid';
      ok = false;
    } else {
      this.roleValidation = 'is-valid';
    }
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.email === undefined || !regex.test(String(this.email).toLowerCase())) {
      this.emailValidation = 'is-invalid';
      ok = false;
    } else {
      this.emailValidation = 'is-valid';
    }
    if (ok) {
      const userData: any = {
        phone: this.phoneNumber,
        name: this.username,
        role: this.role,
        email: this.email,
        address: this.address
      };
      this.authService.registerUser(userData);
    }
  }
}
