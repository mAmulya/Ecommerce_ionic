import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../categories.service';
import {Location} from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
categoryName:any;
items:any;
bool:any;
cartItems: any=[];
count:any;

  constructor(private route:ActivatedRoute,
              private CategoriesService:CategoriesService,
              private _location: Location,
              public toastController: ToastController) { }

  ngOnInit() {


    const key='cart';
    if(localStorage.getItem(key))
    this.cartItems = JSON.parse(localStorage.getItem(key));
    console.log(this.cartItems);
    this.countOfItems();

    this.route.queryParams.subscribe(params => {
      this.categoryName = params['categoryName'];
      if(this.categoryName==null){
        this.CategoriesService.getItems().subscribe((data)=>{
          this.items=data;
      })
      }
      else{
        this.CategoriesService.getCategorieItems(this.categoryName).subscribe((data)=>{
          this.items=data;
        })
      }
    });

  }

  goBack(){
    this._location.back();
  }

  addToCart(item){
    const key='cart';
    this.bool=false;
    if(this.cartItems==null){
      this.cartItems=[];
      this.cartItems.push(item);
    }
    else{
      for(var i=0;i<this.cartItems.length;i++){
          if(this.cartItems[i]['_id']==item['_id']){
            this.bool=true;
            this.cartItems[i].qty=this.cartItems[i].qty+1;
            break;
            }

        }
      if(this.bool==false){
        this.cartItems.push(item);
        }
    }
    localStorage.setItem(key, JSON.stringify(this.cartItems));
    this.countOfItems();
    this.presentToast(item.title);
  }


  async presentToast(title) {
  const toast = await this.toastController.create({
    message: title + ' is added to Cart.',
    duration: 2000
  });
  toast.present();
}

  countOfItems(){
    this.count=0;
    for(var i=0;i<this.cartItems.length;i++){
      this.count = this.count+this.cartItems[i].qty;
    }

    this.CategoriesService.setCount(this.count);
  }

}
