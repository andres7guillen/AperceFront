import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { TaskCreateComponent } from './components/task/task-create.component/task-create.component';

export const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'new-task', component: TaskCreateComponent },
];
