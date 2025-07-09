import { inject } from '@angular/core';
import {
    HttpEvent,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptorFn,
    HttpHandlerFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';

export const errorInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const router = inject(Router);
    const userService = inject(UserService);

    const token = localStorage.getItem('token');

    const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            // Handle specific status codes
            if (error.status === 401) {
                localStorage.clear();
                console.warn(error.message);
                userService.showerror(error.message);
                router.navigate(['/login']);
            } else if (error.status === 403) {
                console.warn(error.message);
                userService.showerror(error.message);
            } else if (error.status === 500) {
                console.warn(error.message);
                userService.showerror(error.message);
            } else {
                console.warn(error.message);
                userService.showerror(error.message);
            }

            return throwError(() => error);
        })
    );
}
