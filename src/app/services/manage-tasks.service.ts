import { Injectable } from '@angular/core';
import { TASKS } from '../dummy/dummy-data';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class ManageTasksService {
  tasks: Array<Task> = TASKS;
  constructor() {}

  getTask(taskId: number): Task {
    return this.tasks[taskId - 1];
  }

  getTasks(): Array<Task> {
    return this.tasks;
  }

  setTasks(tasks: Array<Task>) {
    this.tasks = [...tasks];
  }
}
