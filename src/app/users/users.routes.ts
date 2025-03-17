import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { resolveTasks, TasksComponent } from '../tasks/tasks.component';
import { resolveUserName } from './user-tasks/user-tasks.component';
import { inject } from '@angular/core';
import { canLeave } from '../tasks/new-task/new-task.component';
const dummtCanMatch: CanMatchFn = (route, segment) => {
  const router = inject(Router);
  const shouldGetAcces = Math.random();
  return true;
  if(shouldGetAcces < 0.1) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
  
}

export const usersRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      userTasks: resolveTasks,
    },
    canMatch: [dummtCanMatch],
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeave],
  },
];
