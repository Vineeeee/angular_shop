import { Routes } from '@angular/router';
import { TabsComponent } from '../tabs/tabs.component';
import { authGuard } from '../guards/user.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: TabsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'products',
        loadComponent: () => import('../card-product/card-product/card-product.component').then(m => m.CardProductComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('../list-cart-shop/list-cart-shop.component').then(m => m.ListCartShopComponent)
      },

      {
        path: 'product/:id',
        loadComponent: () => import('../product-detail/product-detail.component').then(m => m.ProductDetailComponent)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('../form-login/form-login.component').then(m => m.FormLoginComponent)
  }
];