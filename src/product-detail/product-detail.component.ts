import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Product } from 'src/models/product';
import { CartShopService } from 'src/services/cart-shop.service';
import { ProductService } from 'src/services/product.service';
import { CartShopComponent } from '../cart-shop/cart-shop.component';
import { addIcons } from 'ionicons';
import { cartOutline, checkboxSharp } from 'ionicons/icons';
import { SafeUrl } from '@angular/platform-browser';
import { ImagesService } from 'src/services/images.service';
import { MenuComponent } from "../menu/menu.component";
import { Observable } from 'rxjs';
import { ScreenService } from 'src/services/show-refresher.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss', './styles/button.component.scss'],
  imports: [CommonModule, IonicModule, CartShopComponent, MenuComponent],
  standalone: true
})
export class ProductDetailComponent implements OnInit {
  product!: Product
  fallbackImageUrl: string = 'assets/images/pngwing.com (1).png'
  showRefresher$: Observable<boolean>;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartShopService,
    private imgService: ImagesService,
    private screenService: ScreenService
  ) { this.showRefresher$ = screenService.refresher$; }

  ngOnInit(): void {
    this.screenService.checkScreenSize()
    addIcons({ checkboxSharp, cartOutline })

    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.productService.getProductById(id).subscribe(product => {
        this.product = product        
      })
    }
  }

  async addProduct(product: Product): Promise<void> {
    this.cartService.addProductToCart(product)
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  getSafeImageUrl(): SafeUrl {
    if (this.product && this.product.images && this.product.images.length > 0) {
      return this.imgService.getSafeImageUrl(this.product.images[0]);
    }
    return this.fallbackImageUrl;
  }

  onImageError(event: Event): void {
    return this.imgService.onImageError(event, this.fallbackImageUrl)
  }
}