import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';
  private cartApiUrl = 'https://dummyjson.com/carts';
  private cartItems:any[]=[];
  public cartCount:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private http:HttpClient) {}

  getProducts(limit:number,skip:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }
  storeProductsInLocalStorage(products:any[]):void{
    localStorage.setItem('products',JSON.stringify(products));
  }
  getProductsFromLocalStorage():any[]{
    return JSON.parse(localStorage.getItem('products') || '[]');
  }
  searchProducts(query:string):Observable<any>{
    const searchUrl  = `${this.apiUrl}/search?q=${query}`;
    return  this.http.get<any>(searchUrl)
  }
  addProduct(product:any):any{
    const newId = Date.now();
    const productWithId = { id: newId, ...product };
    const products = this.getProductsFromLocalStorage();
    products.unshift(productWithId);
    this.storeProductsInLocalStorage(products)
  }
  updateProduct(updatedProduct:any):any{
    
    const products = this.getProductsFromLocalStorage();
    const index = products.findIndex((product:any)=> product.id === updatedProduct.id);
    if (index !== -1){
      products[index]=updatedProduct;
      this.storeProductsInLocalStorage(products);
    }
  }
  deleteProduct(title:any):any{
    const products = this.getProductsFromLocalStorage();
    const filteredProducts = products.filter((product:any)=> product.title !== title);
    this.storeProductsInLocalStorage(filteredProducts)
  }
  updateCart(userId:number,products:any[],action:string):Observable<any>{
    if(action === 'add'){
      return this.http.post(this.cartApiUrl + '/add',{userId,products});
    }  else if (action === 'delete'){
      return this.http.delete(`${this.cartApiUrl}/${products[0].id}`)
    }
    throw new Error('Invalid Action');
  }
  updateCartCount(){
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalCount = cartItems.reduce((total:any,item:{quantity:any;})=> total + item.quantity,0)
    this.cartCount.next(totalCount);
  }
  getCartItems():any[]{
    return this.cartItems
  }
}

