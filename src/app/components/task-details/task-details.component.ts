import { Component, Inject, inject } from '@angular/core';
import { ManageTasksService } from '../../services/manage-tasks.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  currentTask: Task | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  taskService = inject(ManageTasksService);

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage: any = this.document.defaultView?.localStorage;

    var state: any =
      this.router.getCurrentNavigation()?.extras?.state ||
      JSON.parse(localStorage.getItem('currentTask') || '{}');
    console.log(state);
    this.currentTask = state['item'];

    localStorage.setItem('currentTask', JSON.stringify(this.currentTask));
  }
}
