import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import {DataStorageService} from '../../shared/data-storage.service';

import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              private store: Store<fromApp.AppState>) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: HttpEvent<Object>) => {
          console.log(response.type === HttpEventType.Sent);
        }
      );
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
