import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      // Llama al servicio para registrar al usuario
      this.authService.register({ name, email, password }).subscribe(
        (response: any) => {
          console.log('Usuario registrado:', response);
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Tu cuenta ha sido creada con éxito.',
            confirmButtonText: 'Iniciar sesión'
          }).then(() => {
            this.router.navigate(['/public/login']);
          });
        },
        (error: any) => {
          console.error('Error al registrar:', error);
          this.showErrorAlert();
        }
      );
    }
  }

  // Función para mostrar una alerta de error genérica
  private showErrorAlert(title: string = 'Error al registrar', text: string = 'Hubo un problema al crear tu cuenta. Inténtalo de nuevo más tarde.'): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      confirmButtonText: 'Reintentar'
    });
  }

}
