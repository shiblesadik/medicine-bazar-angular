import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage/storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo: boolean;
  otpSent: boolean;
  phoneNumber = null;
  phoneValidation: number;
  otp = null;
  recaptchaVerifier: any;
  confirmationResult: any;
  newUser: boolean;

  tempPhonenumber: string;
  username: string;
  usernameValidation: string;
  address: string;
  addressValidation: string;
  agree: boolean;
  agreeValidation: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
  ) {
    this.tempPhonenumber = this.storageService.getTemp();
    this.phoneValidation = 0;
    this.agree = false;
    this.newUser = false;
    this.otpSent = false;
    if (this.authService.isLogin) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    firebase.initializeApp(environment.firebaseConfig);
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
    });
  }

  sendOtp(): void {
    firebase.auth().signInWithPhoneNumber('+880' + this.phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        this.otpSent = true;
      }).catch(err => {
      console.log(err.code);
      if (err.code === 'auth/invalid-phone-number') {
        this.phoneValidation = 1;
      }
      if (err.code === 'auth/too-many-requests') {
        this.phoneValidation = 2;
      }
    });
  }

  signIn(): void {
    this.confirmationResult.confirm(this.otp).then((user: any) => {
      console.log(user.user.phoneNumber);
      this.storageService.setTemp(user.user.phoneNumber);
      this.phoneNumber = user.user.phoneNumber;
      this.tempPhonenumber = this.storageService.getTemp();
      console.log(user.additionalUserInfo.isNewUser);
      if (user.additionalUserInfo.isNewUser) {
        this.authService.phone = user.user.phoneNumber;
        this.newUser = true;
      } else {
        this.newUser = false;
        this.authService.userData = null;
        this.authService.phone = user.user.phoneNumber;
        this.authService.generateToken(user.user.phoneNumber);
      }
    });
  }

  public submit(): void {
    let ok = true;
    if (this.username === undefined || this.username.length < 3) {
      this.usernameValidation = 'is-invalid';
      ok = false;
    }
    if (this.address === undefined || this.address.length < 6) {
      this.addressValidation = 'is-invalid';
      ok = false;
    }
    if (this.agree === false) {
      this.agreeValidation = 'is-invalid';
      ok = false;
    }
    if (!ok) {
      return;
    } else {
      const userData: any = {
        phone: this.phoneNumber,
        name: this.username,
        address: this.address
      };
      this.authService.generateToken(this.phoneNumber, userData);
    }

  }
}
