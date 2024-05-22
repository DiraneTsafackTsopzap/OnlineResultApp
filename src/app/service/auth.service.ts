import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { MeinUser } from '../Model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {




  appUser$: Observable<MeinUser>;

 id_user : string
  constructor(private Afstore : AngularFirestore , 
    private Auth : AngularFireAuth , private router :Router, private afAuth:AngularFireAuth,
    private ToastService:ToastrService,) {




   
   }


  
  
  
   //---------------------------------------------------------- Sign In 
   async signin(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      const userDoc = await this.Afstore.collection('users').doc(uid).get().toPromise();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const isAdmin = userData['isAdmin'];

        // Redirigez l'utilisateur en fonction de son rôle
        if (isAdmin) {
          this.router.navigate(['AddNote']);
        } else {
          this.router.navigate(['pagenotfound']);
        }

        return 'Connexion réussie';
      } else {
        return 'Utilisateur non trouvé';
      }
    } catch (error) {
      // Gérez les erreurs de connexion ici
      const errorMessage = this.FehlerMeldungAnzeigen(error.code);
      console.log("Error : " + error.code)
      //console.log("ErrorMessage : " + errorMessage)

      return this.ToastService.error(this.FehlerMeldungAnzeigen(error.code));
 
    }
  }

     //----------------------------------------------- Abmelden / SignOut
signOutUser() {
  this.Auth.signOut();
  this.router.navigate(['login']);


  
}


SignUp(obj: MeinUser) {
 
  let Neu_User: MeinUser = {

    // Student_Email_Uid : user.user.uid,
    email: obj.email,
    passwort: obj.passwort,
    isAdmin: obj.isAdmin,
   

  }

  return new Promise((res, rej) => {

    firebase.auth().createUserWithEmailAndPassword(Neu_User.email, Neu_User.passwort)
      .then((user) => {


        res('Success')
        this.Afstore.collection('users').doc(user.user.uid).set({
          uid: user.user.uid,
          passwort: Neu_User.passwort,
          email: user.user.email,
          isAdmin: false // Enregistrez le rôle booléen ici
        });
       

        this.router.navigate(['AddNote']);
      });
  })
}



getUserRole(): Observable<boolean> {
  return this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.Afstore.collection('users').doc(user.uid).valueChanges();
      } else {
        // Si l'utilisateur n'est pas authentifié, 
        //retournez une valeur par défaut (par exemple, false)
        return of({ isAdmin: false });
      }
    }),
    map((userData: any) => {
      return userData ? userData.isAdmin : false; // Récupérez le rôle (boolean) ou une valeur par défaut
    })
  );
}


private FehlerMeldungAnzeigen(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-login-credentials':
      return 'Die E-Mail-Adresse oder Password ist ungültig.';
      case 'auth/invalid-email':
      return 'Die E-Mail-Adresse ist ungültig.';
    case 'auth/user-disabled':
      return 'Das Benutzerkonto ist deaktiviert.';
    case 'auth/user-not-found':
      return 'Der Benutzer existiert nicht.';
    case 'auth/wrong-password':
      return 'Das Passwort ist falsch.';
    default:
      return 'Bei der Anmeldung ist ein Fehler aufgetreten.';
  }
}





















}
