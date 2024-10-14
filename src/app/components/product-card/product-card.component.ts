import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() products: any[] = [];
  @Input() searchTerm:any = '';
  @Output() addToCartFn:EventEmitter<any> = new EventEmitter();
  
    addToCart(product:any){
      this.addToCartFn.emit(product);
    }
    isProductInCart(product:any):boolean{
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
      return cartItems.some((item:any)=> item.id === product.id)
    }
}

