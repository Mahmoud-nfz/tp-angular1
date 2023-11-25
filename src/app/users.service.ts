import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userId = new BehaviorSubject<string | null>(null);
  private userEmail = new BehaviorSubject<string | null>(null);

  public isAuthenticated$ = this.isAuthenticated.asObservable();
  public userId$ = this.userId.asObservable();
  public userEmail$ = this.userEmail.asObservable();

  constructor() {
    this.loadUserFromLocalStorage();
  }

  private saveUserToLocalStorage(userId: string | null, userEmail: string | null, isAuthenticated: boolean) {
    localStorage.setItem('userId', userId || '');
    localStorage.setItem('userEmail', userEmail || '');
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }

  private loadUserFromLocalStorage() {
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    this.userId.next(userId);
    this.userEmail.next(userEmail);
    this.isAuthenticated.next(isAuthenticated);
  }

  login(userId: string, userEmail: string) {
    this.isAuthenticated.next(true);
    this.userId.next(userId);
    this.userEmail.next(userEmail);

    this.saveUserToLocalStorage(userId, userEmail, true);
  }

  logout() {
    this.isAuthenticated.next(false);
    this.userId.next(null);
    this.userEmail.next(null);

    this.saveUserToLocalStorage(null, null, false);
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  getUserId(): Observable<string | null> {
    return this.userId$;
  }

  getUserEmail(): Observable<string | null> {
    return this.userEmail$;
  }
}
