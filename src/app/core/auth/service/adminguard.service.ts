import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserState from '../../../../app/reducers/index';
import { User } from 'src/app/core/models/user.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate, OnDestroy {
  userDetails: User;
  userDetailsSubs: Subscription;
  constructor(private router: Router, private store: Store<UserState.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.userDetailsSubs = this.store.select(UserState.userSelector).subscribe(result => {
      this.userDetails = result;
    });
    const authValid = this.userDetails;
    if (authValid && authValid.id !== '' && authValid.role === 'Admin') {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home']);
    return false;
  }

  ngOnDestroy() {
    if (this.userDetailsSubs && !this.userDetailsSubs.closed) {
      this.userDetailsSubs.unsubscribe();
    }
  }
}
