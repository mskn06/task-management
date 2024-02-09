import { Component, inject } from '@angular/core';
import { ManageTasksService } from '../../services/manage-tasks.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute } from '@angular/router';

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
  taskService = inject(ManageTasksService);

  constructor() {
    let taskId = Number(this.route.snapshot.params['taskId']);
    this.currentTask = this.taskService.getTask(taskId);
    console.log(this.currentTask);
  }
}
