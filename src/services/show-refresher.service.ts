import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private refresherSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(window.innerWidth <= 766);
  refresher$: Observable<boolean> = this.refresherSubject.asObservable();

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize(): void {
    const isSmallScreen = window.innerWidth <= 766;
    this.refresherSubject.next(isSmallScreen);
  }
}