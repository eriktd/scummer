import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {Dragula} from 'dragula';

import {TaskService} from '../task.service';

import {statuses} from '../../../shared/ng_models';

@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  stats = statuses;  
  tasks = [[], [], [], [], []];
  emptyTaskName = "No name set";
    
    ngOnInit(): void {
      this.getTasks();
    };
    
    getTasks(): void {
      this.taskService.getTasks().subscribe(tasks => this.sortItemArr(tasks));
    }
  
    sortItemArr(inArr): void {
      inArr.forEach((ele) => {
        this.sortItem(ele);
      });
    }
  
    sortItem(inTask): void {
      this.tasks[inTask.status].push(inTask);
    }
    
    onNotify(task): void {
      this.sortItem(task);
    }
    
    private onDropModel(args): void {
      let [el, target, source] = args;
        
      console.log(target);

      this.taskService.updTaskStatus(el.id, target.id)
        .then(task => console.log(task))
        .catch(err => el.status = source.id);
    }
    
    constructor(private dragulaService: DragulaService, private taskService: TaskService) {
      dragulaService.dropModel.subscribe((value) => {
        this.onDropModel(value.slice(1));
      });
    }

}