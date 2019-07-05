import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { CategoriesService } from '../categories.service';
import { CartComponent } from '../home/cart/cart.component';
import { OrdersListComponent } from '../home/orders-list/orders-list.component';

import {Router} from '@angular/router';

@Component({
  selector: 'app-fulllayout',
  templateUrl: './fulllayout.component.html',
  styleUrls: ['./fulllayout.component.scss'],
})
export class FulllayoutComponent implements OnInit {

  count:any;

  constructor(private CategoriesService:CategoriesService,private router : Router,
   private navCtrl:NavController,
   public modalController: ModalController) { }

  ngOnInit() {
    this.CategoriesService.cartCount.subscribe(data=>{
    this.count=data;
    });

  }

  async navToCart(){
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
    //this.router.navigate('/cart');
    //this.navCtrl.navigateRoot('/cart');

  }

  async navToOrders(){
    const modal = await this.modalController.create({
      component: OrdersListComponent
    });
    return await modal.present();
    //this.router.navigate('/cart');
    //this.navCtrl.navigateRoot('/cart');

  }

}
