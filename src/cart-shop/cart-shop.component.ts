import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonBadge, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';
import { CartItem } from 'src/models/cart';
import { CartShopService } from 'src/services/cart-shop.service';

@Component({
  selector: 'app-cart-shop',
  templateUrl: './cart-shop.component.html',
  styleUrls: ['./cart-shop.component.scss'],
  imports: [IonButton, IonBadge, CommonModule, RouterLink],
  standalone: true
})
export class CartShopComponent implements OnInit {

  imageCartShop: string = 'assets/images/Shopping Cart.png'
  cartItemCount: number = 0;

  constructor(private cartService: CartShopService) { }

  ngOnInit() { 
    addIcons({ cartOutline });

    this.cartService.cart.subscribe((cartItems: CartItem[]) => {
      this.cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    });
   }

}