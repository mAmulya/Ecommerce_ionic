import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ModalController,ToastController,AlertController  } from '@ionic/angular';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  orders;

  constructor(public modalController: ModalController,
    private _location: Location,) { }

  ngOnInit() {
    const order='order';
    if(localStorage.getItem(order))
    this.orders=JSON.parse(localStorage.getItem(order));
  }


  goBack(){
    this.modalController.dismiss();
  }

}
