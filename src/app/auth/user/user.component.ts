import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo: boolean;
  otpSent: boolean;
  phoneNumber = null;
  otp = null;
  recaptchaVerifier: any;
  confirmationResult: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
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
    this.authService.phone = '+88' + this.phoneNumber;
    this.authService.generateToken();
    // firebase.auth().signInWithPhoneNumber('+880' + this.phoneNumber, this.recaptchaVerifier)
    //   .then((confirmationResult) => {
    //     this.confirmationResult = confirmationResult;
    //     this.otpSent = true;
    //   }).catch(err => {
    //   console.log(err);
    // });
  }

  signIn(): void {
    this.confirmationResult.confirm(this.otp).then(user => {
      // console.log(user);
      // console.log(user.additionalUserInfo.isNewUser);
      if (user.additionalUserInfo.isNewUser) {
        this.authService.phone = user.phoneNumber;
      } else {
        this.authService.userData = null;
        this.authService.phone = user.phoneNumber;
        this.authService.generateToken();
      }
    });
  }

}
