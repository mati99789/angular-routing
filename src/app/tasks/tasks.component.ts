import { Component, computed, effect, inject, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();

  private tasksService = inject(TasksService);

  userTasks = computed(() => this.tasksService.allTasks().filter((task) => task.userId === this.userId()).sort((a, b) => this.sort() === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

  sort = input<'asc' | 'desc'>('asc');
}
