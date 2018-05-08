import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})
export class TaskInputComponent {
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    
    task = {
      name: null,
      status: '0'
    }
    
    statuses = [
      { name: 'Backlog', value: '0' },
      { name: 'Defined', value: '1' },
      { name: 'In-Progress', value: '2' },
      { name: 'Complete', value: '3' },
      { name: 'Accepted', value: '4' }
    ];
    
    constructor(private taskService: TaskService) {}

    addTask(): void {
      this.taskService.addTask(this.task).then(task => this.postAddTask(task));
    }
     
    postAddTask(inTask): void {
      this.notify.emit(inTask);
    }
}
