import { Injectable } from '@angular/core';
import { TASKS } from '../dummy/dummy-data';
import { Task } from '../models/task.model';
import { STATUS } from '../constants/contants';

@Injectable({
  providedIn: 'root',
})
export class ManageTasksService {
  constructor() {}

  getTask(taskId: number): Task {
    return TASKS[taskId - 1];
  }

  setBoard(board: any) {
    // console.log('Board: ', board);
    localStorage.setItem('board', JSON.stringify(board));
  }
}
