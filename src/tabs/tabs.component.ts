import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonToolbar, IonTitle, IonContent, IonTabButton, IonTabs, IonTabBar, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bagHandleOutline, cartOutline } from 'ionicons/icons';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone:  true,
  imports: [IonIcon, IonTabBar, NgClass, IonTabs, IonTabButton, IonToolbar, IonTitle, IonContent, RouterModule]
})
export class TabsComponent  implements OnInit {

  constructor() {}

  ngOnInit() {
    addIcons({ bagHandleOutline, cartOutline});
    this.checkScreenSize();
}
  isScreenSmall: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(); 
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth < 767; 
  }
}