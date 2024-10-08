import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Registro de usuario
  register(user: User): Observable<User> {
    // Asigna el rol por defecto si no está especificado
    const userWithRole = { ...user, role: user.role || 'usuario' };
    return this.http.post<User>(this.apiUrl, userWithRole);
  }

  // Login de usuario
  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => users.length ? users[0] : null)
    );
  }
}
