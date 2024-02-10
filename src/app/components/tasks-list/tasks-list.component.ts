import { Component, OnInit, inject } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';

import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { TASKS } from '../../dummy/dummy-data';
import { STATUS, PRIORITY } from '../../constants/contants';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ManageTasksService } from '../../services/manage-tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    DragDropModule,
    RouterLink,
    MatButtonModule,
    AddTaskComponent,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent implements OnInit {
  taskService = inject(ManageTasksService);
  router = inject(Router);

  Tasks = this.taskService.getTasks();

  public board: Board = new Board('Kanban Board', [
    new Column(
      'Due',
      '1',
      this.Tasks.filter((item) => item.status === STATUS[0])
    ),
    new Column(
      'Open',
      '2',
      this.Tasks.filter((item) => item.status === STATUS[1])
    ),
    new Column(
      'In-Progress',
      '3',
      this.Tasks.filter((item) => item.status === STATUS[2])
    ),
    new Column(
      'Done',
      '4',
      this.Tasks.filter((item) => item.status === STATUS[3])
    ),
  ]);

  constructor(public dialog: MatDialog) {}

  public ngOnInit(): void {
    console.log(this.board);
  }

  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.board.columns,
      event.previousIndex,
      event.currentIndex
    );
  }

  public drop(event: CdkDragDrop<Array<any>>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // update tasks - change status on drop
      this.board.columns[Number(event.previousContainer.id)].tasks
        .filter((item) => item.id === event.item.data.id)
        .map((item) => (item.status = STATUS[Number(event.container.id) - 1]));
    }

    // console.log(this.board);
  }

  updateTasks() {
    this.taskService.setTasks(this.Tasks);
  }

  navigateToTaskDetails(item: Task) {
    this.router.navigate(['/task-details/', item.id], { state: { item } });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: 'auto',
      height: 'auto',
      maxHeight: '80vh',
      maxWidth: '50vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
