import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shopping-cart';
  cartCount:number = 0;
  currentYear:number = new Date().getFullYear();
  constructor(private productService: ProductService,private router: Router) {}
  ngOnInit(): void {
      this.productService.getProducts(10,0).subscribe({
        next:(data: { products: any[]; }) =>{
          this.productService.storeProductsInLocalStorage(data.products)
        }
      })
    this.productService.cartCount.subscribe(count => {
      this.cartCount = count;
    });
    this.updateCartCountFromLocalStorage();
  }
  updateCartCountFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if(storedCart){
      this.cartCount = storedCart.reduce((total:number, item:any) => total + item.quantity, 0);
    }
    this.productService.cartCount.next(this.cartCount);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Check if user data exists in local storage
  }

  logout() {
    localStorage.removeItem('user'); // Remove user data from local storage
    this.router.navigate(['/']); // Redirect to base URL
  }
}