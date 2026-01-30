import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly apiUrl = 'https://localhost:7236/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(name: string, email: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, { name, email });
  }
}
