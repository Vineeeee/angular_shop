import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { CartItem } from 'src/models/cart';
import { Product } from 'src/models/product';
import { CartShopService } from 'src/services/cart-shop.service';
import { ImagesService } from 'src/services/images.service';
import { MenuComponent } from "../menu/menu.component";
import { ScreenService } from 'src/services/show-refresher.service';

@Component({
  selector: 'app-list-cart-shop',
  templateUrl: './list-cart-shop.component.html',
  styleUrls: ['./list-cart-shop.component.scss', '../card-product/card-product/styles/card-not-found.component.scss'],
  imports: [IonicModule, CommonModule, MenuComponent],
  standalone: true

})
export class ListCartShopComponent implements OnInit {

  products: Observable<CartItem[]> = this.cartService.cart;
  totalPrice!: number
  fallbackImageUrl: string = 'assets/images/pngwing.com (1).png'
  alertImg: string = '../../../assets/images/pngwing.com (3).png'
  showRefresher$: Observable<boolean>;

  constructor(private cartService: CartShopService,
    private imgService: ImagesService,
    private alertController: AlertController,
    private screenService: ScreenService
  ) { this.showRefresher$ = screenService.refresher$; }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: `
                <div class="justify-content">
<h4>Thank you for your purchase!</h4>
                  <img src="${this.alertImg}" class="card-alert"/>
                   <p class="width-text">Your payment was successful and your order is complete.
We have sent an email as proof of delivery. The email will provide purchase details.</p>
                </div>
                `,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.cartService.clearCart()
          }
        }
      ],
      cssClass: 'custom-alert'
    });

    await alert.present();
  }

  ngOnInit() {
    this.cartService.cart.subscribe((cartItems: CartItem[]) => {
      this.totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    });

    this.screenService.checkScreenSize();
  }

  doRefresh(event: any) {
   
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  getSafeImageUrl(img: string): SafeUrl {
    return this.imgService.getSafeImageUrl(img)
  }

  onImageError(event: Event): void {
    return this.imgService.onImageError(event, this.fallbackImageUrl)
  }

  addProduct(product: Product): void {
    this.cartService.addProductToCart(product);
  }

  removeProduct(product: Product): void {
    this.cartService.removeProductFromCart(product);
  }

}