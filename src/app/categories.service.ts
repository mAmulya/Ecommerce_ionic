import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public cartCount = new BehaviorSubject('');


  constructor(private http : HttpClient) { }


  setCount(cartCount) {
    this.cartCount.next(cartCount);
    // console.log(this.cartCount.getValue());
  }

  getCategories(){
    return new Promise((resolve, reject) => {
        this.http.get('http://styleworks.herokuapp.com/categories/').subscribe((data)=>{
          resolve(data);
        });
      })
  }

  getItems(){
  return this.http.get('http://styleworks.herokuapp.com/items');
  }

  getCategorieItems(categoryName){
    return this.http.get('http://styleworks.herokuapp.com/category-items/' + categoryName);
  }

}
