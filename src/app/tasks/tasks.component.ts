import { Component, computed, effect, inject, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  userTasks = input.required<Task[]>();
  sort = input<'asc' | 'desc'>('asc');
}

export const resolveTasks: ResolveFn<Task[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tasksService = inject(TasksService);
  const sort = route.queryParams['sort'];
  
  const tasks = tasksService
    .allTasks()
    .filter((task) => task.userId === route.paramMap.get('userId'))
    .sort((a, b) =>
      sort === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  return tasks;
};
