import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';
import { ImagesService } from 'src/services/images.service';
import { MenuComponent } from '../../menu/menu.component';
import { ScreenService } from 'src/services/show-refresher.service';
import { CartShopComponent } from 'src/cart-shop/cart-shop.component';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss', 
              './styles/card-not-found.component.scss',
              './styles/select-category.component.scss',
              './another-card-product.component.scss'
            ],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, CartShopComponent, MenuComponent]
})

export class CardProductComponent implements OnInit {

  products!: Observable<Product[]>
  categories = ["All", "Clothes", "Electronics", "Furniture", "Shoes", "Miscellaneous", "Toys"]
  selectedCategory: string = ''
  showOptions: boolean = false
  productNotFound: boolean = false
  fallbackImageUrl: string = 'assets/images/pngwing.com (1).png'
  showRefresher$: Observable<boolean>;

  constructor(private productService: ProductService,
              private imgService: ImagesService,
              private screenService: ScreenService
            ) { this.showRefresher$ = screenService.refresher$; }

  ngOnInit(): void {
    this.list();
    this.screenService.checkScreenSize();
  }

  list(): void {
    this.products = this.productService.list();
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.showOptions = false;

    if (category === "All") {
      this.list()
    } else {
      this.filterByCategory(category);
    }
  }

  filterByCategory(category: string) {
    this.products = this.productService.listByCategory(category);
  }

  doRefresh(event: any) {
    this.list();
   
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

}