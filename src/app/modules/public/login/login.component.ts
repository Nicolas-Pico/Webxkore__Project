import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        user => {
          if (user) {
            // Notificación de éxito
            Swal.fire({
              icon: 'success',
              title: 'Inicio de sesión exitoso',
              text: '¡Bienvenido!',
              confirmButtonText: 'Continuar'
            }).then(() => {
              // Redirige al dashboard
              this.router.navigate(['/authenticated/dashboard']);
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al iniciar sesión',
              text: 'Correo o contraseña incorrectos. Inténtalo de nuevo.',
              confirmButtonText: 'Reintentar'
            });
          }
        }
      );
    }
  }
}
