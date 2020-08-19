import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { Observable } from "rxjs";
import { Task } from "../task.model";

@Component({
  selector: "app-tasks-async",
  templateUrl: "./tasks-async.component.html",
  styleUrls: ["./tasks-async.component.css"]
})
export class TasksAsyncComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTask();
  }
}
