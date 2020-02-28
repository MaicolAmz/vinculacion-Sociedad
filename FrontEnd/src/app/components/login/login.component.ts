import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { isNullOrUndefined } from 'util';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & HTMLSelectElement & EventTarget;
}

declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  users = [];
  private user = {
    email: '',
    password: ''
  };
  constructor( private authService: AuthService, private router: Router ) { }
  ngOnInit() {
    this.users = JSON.parse(this.authService.getCurrentUser());
    if (isNullOrUndefined(this.users)) {
      this.authService.logout();
    } else {
      this.router.navigateByUrl('/auth/home');
    }
  }

  onLogin(email: HTMLInputElement, password: HTMLInputElement): void {
    this.user.email = email.value + '@yavirac.edu.ec';
    this.user.password = password.value;
    this.authService.login(this.user).subscribe(
      res => {
        this.router.navigateByUrl('/auth/home');
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Sesión iniciada con exito ');
    },
      err => {
        alertify.error('Email o Contraseña incorrectos');
      }
    );
    this.blockUI.start('Ingresando credenciales...');
    setTimeout(() => {
      this.blockUI.stop();
    }, 1000);
  }
}
