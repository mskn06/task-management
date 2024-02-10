import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PRIORITY, STATUS } from '../../constants/contants';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  taskForm: FormGroup = this.fb.group({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    priorityLevel: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });

  Status: any = [...STATUS];
  PriorityLevel: any = [...PRIORITY];

  constructor(private fb: FormBuilder) {}

  get priorityLevel(): any {
    return this.taskForm.get('priorityLevel');
  }

  get status(): any {
    return this.taskForm.get('status');
  }

  changePriorityLevel(e: any) {
    // console.log(e.target.value);
    this.priorityLevel.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeStatus(e: any) {
    // console.log(e.target.value);
    this.status.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSubmit() {
    console.log(this.taskForm.value);

    // update tasks
  }
}
