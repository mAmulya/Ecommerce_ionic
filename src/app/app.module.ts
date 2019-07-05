import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { FulllayoutComponent } from './fulllayout/fulllayout.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './home/cart/cart.component';
import { OrdersListComponent } from './home/orders-list/orders-list.component';
import { ProductsComponent } from './home/products/products.component';
import { LocationComponent } from './home/location/location.component';
import { PlaceOrderComponent } from './home/place-order/place-order.component';

import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent,FulllayoutComponent,CartComponent,ProductsComponent,LocationComponent,OrdersListComponent,PlaceOrderComponent],
  entryComponents: [CartComponent,LocationComponent,OrdersListComponent,PlaceOrderComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
