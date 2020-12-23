import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
  ) {
    if (authService.isLogin === false) {
      this.router.navigate(['/auth/user']);
    }
  }

  ngOnInit(): void {
  }

}
