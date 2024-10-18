import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from '../components/tabs/tabs.component';
import { CartShopComponent } from '../components/cart-shop/cart-shop.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, TabsComponent, CartShopComponent]
})

export class HomePage {
  constructor() { }

}