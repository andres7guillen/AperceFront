import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/User';
import { TasksService } from '../../../services/tasks.service';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-task-create.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-create.component.html',
})
export class TaskCreateComponent implements OnInit {
  public form: FormGroup;
  users: User[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tasksService: TasksService,
    private usersService: UsersService,
  ) {
    this.form = this.fb.nonNullable.group({
      userId: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((u) => (this.users = u));
  }

  submit() {
    const { userId, title } = this.form.getRawValue();
    this.tasksService.addTask(userId, title).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/task-list']);
    });
  }
}
