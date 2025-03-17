import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userName = input.required<string>();

  // Other way to do it
  // userId = input.required<string>();

  // userName = computed(
  //   () => this.userSerivce.users.find((user) => user.id === this.userId())?.name
  // );

  // ngOnInit(): void {
  //   this.activatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
  //     const userId = params.get('userId')!;
  //     this.userName = this.userSerivce.users.find((user) => user.id === userId)?.name || '';
  //   });
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const userId = activatedRoute.paramMap.get('userId')!;
  return userService.users.find((user) => user.id === userId)?.name || '';
};

export const reolveTitle: ResolveFn<string> = (
  activatedRoute,
  state
) => {
  const userService = inject(UsersService);
  const userId = activatedRoute.paramMap.get('userId')!;
  return userService.users.find((user) => user.id === userId)?.name + ' Tasks' || '';
};
