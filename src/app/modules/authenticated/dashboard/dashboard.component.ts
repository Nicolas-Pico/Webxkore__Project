import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = []; // Variable para almacenar los usuarios

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers(); // Carga los usuarios al iniciar el componente
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
}
