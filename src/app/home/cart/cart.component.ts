import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ModalController,ToastController,AlertController  } from '@ionic/angular';
import { CategoriesService } from '../../categories.service';
import { LocationComponent } from '../location/location.component';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cart:any=[];
  total:any;
  count:any;
  delcart:any=[];
  addrs;
  flatNo;


  todo = {};
  address={'flatNo':'','location':''};


  constructor(private router : Router,
    private _location: Location,
    private CategoriesService:CategoriesService,
  public modalController: ModalController,
public toastController: ToastController,
public alertController: AlertController) {}


  ngOnInit() {

    const key='cart'
    if(localStorage.getItem(key))
    this.cart = JSON.parse(localStorage.getItem(key));
    console.log(this.cart);

    this.totalCost();
    this.countOfItems();

  }

  goBack(){
    this.modalController.dismiss();
  }


  incQty(c){
    for(var i=0;i<this.cart.length;i++){
      if(this.cart[i]['_id']==c['_id']){
        this.cart[i].qty=this.cart[i].qty+1;
        break;
        }
    }
    const key='cart';

    localStorage.setItem(key, JSON.stringify(this.cart));
    this.totalCost();
    this.countOfItems();

  }



  decQty(c){
    if(c.qty==1){
      this.Ondelete(c)
    }
    for(var i=0;i<this.cart.length;i++){
      if(this.cart[i]['_id']==c['_id']){
        this.cart[i].qty=this.cart[i].qty-1;
        break;
        }
    }
    const key='cart';
    localStorage.setItem(key, JSON.stringify(this.cart));
    this.totalCost();
    this.countOfItems();

  }

  totalCost(){
    this.total=0;
    for(var i=0;i<this.cart.length;i++){
      this.total=this.total+this.cart[i].price*this.cart[i].qty;
    }
  }



  Ondelete(c){
  for(var i=0;i<this.cart.length;i++){
    if(this.cart[i]['_id']==c['_id']){
      this.cart.splice(i,1);
      const key='cart';
      console.log(this.cart);
      localStorage.setItem(key, JSON.stringify(this.cart));
      this.delcart = JSON.parse(localStorage.getItem(key));
      console.log(this.delcart);
      this.totalCost();
      this.countOfItems();

    }
  }
  }

  countOfItems(){
    this.count=0;
    for(var i=0;i<this.cart.length;i++){
      this.count = this.count+this.cart[i].qty;
    }

    this.CategoriesService.setCount(this.count);
  }

  async navToLoc(){
        const modal = await this.modalController.create({
          component: LocationComponent,
          componentProps: {
            'cartItems': this.cart,
          }
        });
        modal.onDidDismiss()
          .then((data) => {
            this.addrs = data['data'];
            this.address.location=this.addrs;
        });
        return await modal.present();

  }


async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: 'Fill the details',
    buttons: ['OK']
  });

  await alert.present();
}

async navToPlaceOrder(){

  if(this.cart==false){
    this.presentAlert();
  }
  else{
    if(this.address.location==''){
      this.presentAlert();
    }
    else{
      if(this.address.flatNo==''){
        this.presentAlert();
      }
      else{
        this.goBack();
        const modal = await this.modalController.create({
              component: PlaceOrderComponent,
              componentProps: {
                'cartItems': this.cart,
                'location':this.address,
              }
            });
            return await modal.present();
      }
    }
  }

  }





}
