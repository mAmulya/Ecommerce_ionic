import { Component, OnInit,NgZone,Input } from '@angular/core';
import { ModalController,AlertController,Platform,LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {formatDate } from '@angular/common';

declare let google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers:[Geolocation]

})
export class LocationComponent implements OnInit {



  autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;
  geo: any

  service = new google.maps.places.AutocompleteService();


  constructor(public modalController: ModalController,
              private geolocation: Geolocation,
              private platform: Platform,
              private zone: NgZone,
              public alertCtrl : AlertController,
              public loadingCtrl: LoadingController
) {

  this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };}

  ngOnInit() {


  }

  goBack(){
    this.modalController.dismiss();
  }




  chooseItem(item: any) {

    // this.addToOrders(item);

     this.modalController.dismiss(item);
     this.geo = item;
     this.geoCode(this.geo);//convert Address to lat and long
   }

     getCurrentLocation(){
         this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
             let geocoder = new google.maps.Geocoder;
             let latlng = {lat: resp.coords.latitude, lng: resp.coords.longitude};
             geocoder.geocode({'location': latlng}, (results, status) => {
                setTimeout(() => {
                    // this.addToOrders(results[0].formatted_address);
                     this.modalController.dismiss(results[0].formatted_address);
                },100)
             });
         }).catch((error) => {
           console.log('Error getting location', error);
         });
     };



   updateSearch() {
     if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
     }
     let me = this;
     let cityBounds = new google.maps.LatLngBounds(
         new google.maps.LatLng(16.9761939,82.2060458),
         new google.maps.LatLng(17.0392439,82.2825551));
     this.service.getPlacePredictions({
         input: this.autocomplete.query,
         bounds: cityBounds,
         types: ['geocode'],
         componentRestrictions: {
           country: 'in'
         }
     },(predictions, status) => {
          me.autocompleteItems = [];

     me.zone.run(() => {
      if (predictions != null) {
         predictions.forEach((prediction) => {
           me.autocompleteItems.push(prediction.description);
         });
        }
      });
    });
   }

   //convert Address string to lat and long
   geoCode(address:any) {
     let geocoder = new google.maps.Geocoder();
     geocoder.geocode({ 'address': address }, (results, status) => {
     this.latitude = results[0].geometry.location.lat();
     this.longitude = results[0].geometry.location.lng();
    });
  }





}
