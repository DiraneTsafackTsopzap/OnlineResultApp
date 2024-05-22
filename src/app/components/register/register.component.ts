import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MeinUser } from 'src/app/Model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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


  Register()
  {

   let Email = this.Email_Element.nativeElement.value;
   let Password = this.Password_Element.nativeElement.value;

   const data:MeinUser = {

    email : Email,
    passwort : Password,
    isAdmin : false
   }

   
        this.Authservice.SignUp(data).then(()=>
    {
     //console.log("sucess sign in")
     //this.router.navigate(["AddSubject"]);
      //this.route.navigate(["contacts"]);
     })
     .catch(e => {
      this.Toast.warning(e);
     })
    
    





 }




}