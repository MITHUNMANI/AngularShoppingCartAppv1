import { Component } from '@angular/core';
import { data, error } from 'jquery';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent {
  products:any[]=[];
  searchTerm ='';
  currentPage = 1;
  limit=12;
  cartCount=0;
  constructor(private productService:ProductService){}
  ngOnInit(){
    this.loadProducts();
    this.updateCartCount()
  }
  loadProducts(){
    this.products = this.productService.getProductsFromLocalStorage();

      // const skip = (this.currentPage - 1) * this.limit;
      // this.productService.getProducts(this.limit,skip).subscribe({
      //   next:(data: { products: any[]; }) =>{
      //     this.products = data.products;
      //     this.productService.storeProductsInLocalStorage(this.products)
      //   }
      // })
    
    
  }
  onSearch(){
    if(this.searchTerm.trim()){
      this.productService.searchProducts(this.searchTerm).subscribe({
        next:(data: { products: any[]; })=>{
          this.products = data.products
        },
        error:(error: any)=>{
          console.error('Error searching products',error)
        }
      })
    }else{
      this.loadProducts();
    }
  }
  changePage(page:number){
    this.currentPage=page;
    this.loadProducts();
  }
  addToCart(product:any){
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const foundItem = cartItems.find((item:any)=>item.id === product.id)
    if(foundItem){
      const updatedCartItems = cartItems.filter((item:{id:any})=> item.id !== product.id)
      localStorage.setItem('cart',JSON.stringify(updatedCartItems))
      const userId=1;
      const productsToRemove = [{id:product.id,quantity:foundItem.quantity}]
      this.productService.updateCart(userId,productsToRemove,'delete').subscribe({
        next:(response: any)=>{
          console.log('remove from cart',response);
          this.updateCartCount();
        },
        error:(error: any)=>{
          
        }
      })
    }else{
      product.quantity=1;
      cartItems.push(product);
      localStorage.setItem('cart',JSON.stringify(cartItems))
      const userId =1;
      const productsToAdd=[{id:product.id,quantity:product.quantity}]
      this.productService.updateCart(userId,productsToAdd,'add').subscribe({
        next:(response: any)=>{
          this.updateCartCount();
        },
      error:(error: any) =>{}
      })
    }
    this.productService.updateCartCount()
  }
  updateCartCount(){
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    this.cartCount = cartItems.reduce((total:any,item:{quantity:any})=>total +item.quantity,0);
    this.productService.cartCount.next(this.cartCount)
  }
  isProductInCart(product:any):boolean{
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    return cartItems.some((item:any)=> item.id === product.id)
  }
}
