import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { projectdetails } from './dashboard/dashboard.component';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private api = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<projectdetails[]> {
    return this.http.get<projectdetails[]>(this.api);
  }

  getProject(id: number): Observable<projectdetails> {
    return this.http.get<projectdetails>(`${this.api}/${id}`);
  }

  createProject(data: Partial<projectdetails>): Observable<projectdetails> {
    return this.http.post<projectdetails>(this.api, data);
  }

  updateProject(id: number, data: Partial<projectdetails>): Observable<projectdetails> {
    return this.http.put<projectdetails>(`${this.api}/${id}`, data);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
