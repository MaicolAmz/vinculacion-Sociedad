import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { isNullOrUndefined } from 'util';
import { User } from 'src/app/models/user';

declare let alertify: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = {
    nombre: '',
    apellido: '',
    cedula: ''
  };

  @BlockUI() blockUI: NgBlockUI;

  constructor(private userService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(this.userService.getCurrentUser());
    if (isNullOrUndefined(this.user)) {
      this.onLogout();
    }
  }

  onLogout(): void {
    this.userService.logout();
    alertify.set('notifier', 'position', 'bottom-right');
    alertify.warning('Sesión Cerrada con Exito');
    this.blockUI.start('Loading...');
    setTimeout(() => {
      this.blockUI.stop();
    }, 700);
    this.router.navigateByUrl('/login');
  }

}
