import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskItem } from '../../../models/Task';
import { User } from '../../../models/User';
import { TasksService } from '../../../services/tasks.service';
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<TaskItem[]>;
  users: User[] = [];
  selectedStatus: string | 'All' = 'All';
  error?: string;

  public tasks: TaskItem[] = [];
  private router = inject(Router);
  private tasksService = inject(TasksService);
  private usersService = inject(UsersService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks$ = this.tasksService.getTasks();
  }

  navigateToNewTask() {
    this.router.navigate(['/new-task']);
  }

  filteredTasks(): TaskItem[] {
    if (this.selectedStatus === 'All') return this.tasks;
    return this.tasks.filter((t) => t.status.toLowerCase() === this.selectedStatus.toLowerCase());
  }

  start(task: TaskItem) {
    this.tasksService
      .startTask(task.id, task.userId)
      .subscribe(() => (this.tasks$ = this.tasksService.getTasks()));
  }

  complete(task: TaskItem) {
    this.tasksService
      .completeTask(task.id, task.userId)
      .subscribe(() => (this.tasks$ = this.tasksService.getTasks()));
  }
}
