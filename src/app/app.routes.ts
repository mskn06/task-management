import { Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

export const routes: Routes = [
  {
    path: 'tasks-list',
    title: 'Tasks List Page',
    component: TasksListComponent,
  },
  {
    path: 'add-task',
    title: 'Add Tasks Page',
    component: AddTaskComponent,
  },
  {
    path: 'task-details/' + ':taskId',
    title: 'Task Details Page',
    component: TaskDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '/tasks-list',
    pathMatch: 'full',
  },
];
