import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userdetails } from './UserDashboard/UserDashboard.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:3000/Users';

  constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

  getUsers(): Observable<Userdetails[]> {
    return this.http.get<Userdetails[]>(this.api);
  }

  getUser(id: number): Observable<Userdetails> {
    return this.http.get<Userdetails>(`${this.api}/${id}`);
  }

  createUser(data: Partial<Userdetails>): Observable<Userdetails> {
    return this.http.post<Userdetails>(this.api, data);
  }

  login(data: Partial<Userdetails>): Observable<Userdetails> {
    return this.http.post<Userdetails>(`${this.api}/login`, data);
  }

  updateUser(id: number, data: Partial<Userdetails>): Observable<Userdetails> {
    return this.http.put<Userdetails>(`${this.api}/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  showsuccess(msg:string){
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      verticalPosition: 'top', // or 'bottom'
      panelClass: ['custom-snackbar'] // optional for style
    });
  }

  showerror(msg:string){
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      verticalPosition: 'top', // or 'bottom'
      panelClass: ['custom-snackbar-error'] // optional for style
    });
  }
}
