import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { TaskService } from "../task.service";
import { Task } from "../task.model";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-tasks-subscribe",
  templateUrl: "./tasks-subscribe.component.html",
  styleUrls: ["./tasks-subscribe.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksSubscribeComponent implements OnInit, OnDestroy {
  constructor(
    private taskService: TaskService,
    private cd: ChangeDetectorRef
  ) {}

  tasks: Task[] = [];
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    const sub = this.taskService
      .getTask()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(tasks => {
        this.tasks = tasks;
        this.cd.markForCheck();
      });

    sub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
