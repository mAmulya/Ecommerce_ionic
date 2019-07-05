import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { NavController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categories:any;
  cartItems:any=[];
  count:any;

  constructor(private CategoriesService:CategoriesService,public modalController: ModalController) {
  }

  ngOnInit(){
    console.log("inHome");
    this.getCategories();
    const key='cart';
    if(localStorage.getItem(key))
    this.cartItems = JSON.parse(localStorage.getItem(key));
    console.log(this.cartItems);
    this.countOfItems();
  }

  async getCategories(){
    this.categories= await this.CategoriesService.getCategories();
  }

  countOfItems(){
    this.count=0;
    for(var i=0;i<this.cartItems.length;i++){
      this.count = this.count+this.cartItems[i].qty;
    }

    this.CategoriesService.setCount(this.count);
  }




}
