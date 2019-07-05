import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FulllayoutComponent } from './fulllayout/fulllayout.component';
import { ProductsComponent } from './home/products/products.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'products', component:ProductsComponent},
  {
    path : '' ,
    component : FulllayoutComponent,
    children: [
      {
        path : '',
        loadChildren: './home/home.module#HomePageModule',
      }
              ]
    },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
