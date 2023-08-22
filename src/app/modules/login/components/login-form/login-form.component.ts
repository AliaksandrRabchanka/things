import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService, MainDataFacadeService, UserModel, RoutesConfig } from '../../../../core'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  currentUser!: UserModel | null;
  user!: UserModel;
  isRegister!: boolean;

  constructor(
    public authService: AuthService,
    private mainDataFacadeService: MainDataFacadeService,
    public router: Router,
    public store: Store
  ) {}

  ngOnInit(): void {
    this.user = new UserModel();
    this.mainDataFacadeService.user$.subscribe(user => {
      this.currentUser = user;
    })
  }

  registerUser() {
    this.authService.signUp(this.user).subscribe((res) => {
      if (res.result) {
        this.router.navigate([RoutesConfig.login]);
      }
    });
  }

  loginUser() {
    this.authService.signIn(this.user);
  }

  logoutUser() {
    this.authService.doLogout();
  }

  updateRegister() {
    this.isRegister = !this.isRegister;
  }
}
