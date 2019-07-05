import { Component, OnInit,Input } from '@angular/core';
import { ModalController,AlertController,Platform,LoadingController } from '@ionic/angular';
import { CategoriesService } from '../../categories.service';

import {formatDate } from '@angular/common';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  @Input() cartItems: any;
  @Input() location: any;

  orders:any=[];
  order;
count;
  today= new Date();
 jstoday = '';
  constructor(public modalController: ModalController,private CategoriesService:CategoriesService) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
 }

  ngOnInit() {
    const order='order';
    if(localStorage.getItem(order))
    this.orders = JSON.parse(localStorage.getItem(order));
  }

  goBack(){
    this.modalController.dismiss();
  }


  PlaceOrder(){
    this.order={cartItems:this.cartItems,addrs:this.location,date:this.jstoday}
    if(this.orders==null){
      this.orders=[];
      this.orders.push(this.order);
    }
    else{
      this.orders.push(this.order);
    }
    console.log(this.orders);

    const order='order';
    localStorage.setItem(order, JSON.stringify(this.orders));


    const key='cart';
    localStorage.removeItem(key);
    this.count=0;
    this.CategoriesService.setCount(this.count);

    this.goBack();
  }

}
