import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskItem } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly apiUrl = 'https://localhost:7236/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  getTasksByUser(userId: string): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.apiUrl}/user/${userId}`);
  }

  addTask(userId: string, title: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, { userId, title });
  }

  startTask(taskId: string, userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${taskId}/start`, { userId });
  }

  completeTask(taskId: string, userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${taskId}/complete`, { userId });
  }
}
