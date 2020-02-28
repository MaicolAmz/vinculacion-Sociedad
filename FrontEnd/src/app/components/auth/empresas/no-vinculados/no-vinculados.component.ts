import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-no-vinculados',
  templateUrl: './no-vinculados.component.html',
  styleUrls: ['./no-vinculados.component.css']
})
export class NoVinculadosComponent implements OnInit {
  pageActual = 1;
  noVinculados = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getNoVinculados()
      .subscribe( res => {
        this.noVinculados = res;
      }, err => {
        console.log(err);
      });
  }

}
