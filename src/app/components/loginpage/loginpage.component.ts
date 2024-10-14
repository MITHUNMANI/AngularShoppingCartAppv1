import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
   loginForm:FormGroup;
   constructor(private fb:FormBuilder,private router:Router){
     this.loginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
     })
   }
   onSubmit(){
    if(this.loginForm.valid){
      localStorage.setItem('user', JSON.stringify(this.loginForm.value));
      console.log(this.loginForm.value);
      this.router.navigate(['/admin'])
    }
   }
   get username(){
    return this.loginForm.get('username')
   }
   get password(){
    return this.loginForm.get('password')
   }
}
