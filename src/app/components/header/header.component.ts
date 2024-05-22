import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import firebase from 'firebase/compat/app';
import { MeinUser } from 'src/app/Model/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

est_administrateur : string
est_connecte
email : string
  
    constructor(private Authservice : AuthService, private AngularAuth : 
      AngularFireAuth, private Afstore:AngularFirestore,
      private router :Router, private Toast : ToastrService) {
  
    }

 // Initialisé à null pour gérer le cas de l'utilisateur non connecté


  ngOnInit(): void {
    
         firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
         this.est_connecte = true
         // this.email = user.email
         // recuperation du role
         this.Afstore.collection("users").doc(user.uid).valueChanges().subscribe((userdata:any)=>{
          this.est_administrateur = userdata.isAdmin
          this.email = userdata.email
        //  console.log("userrole : " +this.userRole)
         })

         } 
          else {
            this.est_connecte = false;     
         }
      }
      );



}




  onclicklogout()
  {
    this.Authservice.signOutUser();
    
   
  }



}
