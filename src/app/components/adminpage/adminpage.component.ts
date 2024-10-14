import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {
  products:any[]=[];
  newProduct:any={name:'',price:0,description:'',image:'',quantity:1};
  editMode = false;
  editIndex:number | null = null;
  searchTerm = '';
  currentPage = 1 ;
  limit=10;
  cartCount=0;
  constructor(private productService:ProductService){}
  ngOnInit(){
    this.loadProducts()
  }
  loadProducts(){
    const localStorageProduct =  this.productService.getProductsFromLocalStorage();
    if(localStorageProduct){
      this.products = this.productService.getProductsFromLocalStorage();
    }else{
      const skip = (this.currentPage - 1) * this.limit;
      this.productService.getProducts(this.limit,skip).subscribe({
        next:(data: { products: any[]; }) =>{
          this.products = data.products;
          this.productService.storeProductsInLocalStorage(this.products)
        }
      })
    }
  }
  openAddProductModal(){
    this.newProduct = {name:'',price:0,description:'',image:'',quantity:1};
    this.editMode =false;
    const modalElement= document.getElementById('productModal');
    if(modalElement){
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show()
    }
  }


  async addProduct(){
    if(this.editMode){
      await this.productService.updateProduct({
        ...this.newProduct,
        id: this.products[this.editIndex!].id
      });
      this.products = this.productService.getProductsFromLocalStorage();

      // this.loadProducts();
    }
    else{
      console.log(this.newProduct,'new')
      await this.productService.addProduct(this.newProduct);
    }
    this.closeModal();
  }

  editProduct(product:any){
    this.newProduct = { ...product};
    this.editMode = true;
    this.editIndex = this.products.indexOf(product);
    const modalElement = document.getElementById('productModal');
    if(modalElement){
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id);
    this.loadProducts();
  }

  onFileChange(event:any){
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newProduct.image = e.target?.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  closeModal(){
    const modalElement = document.getElementById('productModal');
    if(modalElement){
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if(modal){
        modal.hide();
      }
    }
  }

  changePage(page:number){
    this.currentPage = page;
    this.loadProducts();
  }
}
