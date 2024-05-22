import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  connexion : FormGroup
  
  @ViewChild('email') Email_Element: ElementRef;
  @ViewChild('password') Password_Element: ElementRef;
  constructor(private formbuilder:FormBuilder,
    private auths : AngularFireAuth, private Authservice : AuthService,
    private router : Router, private Toast : ToastrService,
    private route:Router) { }


    ErrorMessage : string
  ngOnInit(): void {
    this.initforms()
  }

  initforms()
  {
    this.connexion = this.formbuilder.group({
      'email' : ['', [Validators.email, Validators.required ]],
      'password' : ['',[Validators.required, Validators.minLength(8)]],
    })
  }
  
  get password_() {
    return this.connexion.get('password');
  } 


  Login()
  {

   let email = this.Email_Element.nativeElement.value;
   let password = this.Password_Element.nativeElement.value;

   
  this.Authservice.signin(email,password)

 }




}
