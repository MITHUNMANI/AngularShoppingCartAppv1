import { Component } from '@angular/core';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent {
   cartItems:any[]=[];
   ngOnInit():void{
     this.loadCart()
   }
   loadCart(){
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
   }
   calculateTotal(){
    return this.cartItems.reduce((total,item) => total + (item.price * item.quantity),0)
   }
}
