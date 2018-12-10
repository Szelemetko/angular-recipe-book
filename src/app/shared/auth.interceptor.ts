import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {auth} from 'firebase';
import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import * as fromAuth from '../auth/store/auth.reducers';

import * as fromApp from '../store/app.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      switchMap((authState: fromAuth.State) => {
        const copiedReq = req.clone({params: req.params.append('auth', authState.token)});
        return next.handle(copiedReq);
      })
    );
  }
}
