import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000'); 
  }

  getNotifications(): Observable<{ title: string; message: string }> {
    return new Observable(observer => {
      this.socket.on('new-notification', (data) => {
        observer.next(data);
      });
    });
  }

  getAllNotificationsFromServer(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/notifications');
  }
}
