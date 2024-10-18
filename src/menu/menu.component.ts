import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CartShopComponent } from "../cart-shop/cart-shop.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonicModule, CartShopComponent, RouterModule]
})
export class MenuComponent implements OnInit{
  userData: any;
  imageLogoShop: string = 'assets/images/logostore.png'

  constructor() {}

  ngOnInit() { 
    const storedData = localStorage.getItem('email')

    if (storedData) {
      this.userData = JSON.parse(storedData)
    }
   }

}