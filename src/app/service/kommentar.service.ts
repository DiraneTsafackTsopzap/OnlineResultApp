import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KommentarService {

  constructor(private Afs : AngularFirestore , private ToastService : ToastrService) { }


  AddKommentar (SchulerId,Data){
    this.Afs
      .collection('Kommentar')
      .doc(SchulerId)
      .set(Data)
      .then(() => {
        this.ToastService.success('Great');
      })
      .catch((error) => {
        this.ToastService.error('An error occurred'); // Afficher un message d'erreur en cas d'échec
        console.error('Error adding Kommentar:', error);
      });
  }
  

  Get_all_Raum_entsprechend_der_Klasse_Id(klassenraumId) {
    return this.Afs.collection('Kommentar', ref => ref.where('KlassenRaumId', '==', klassenraumId).orderBy('GesamteNote', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map((a, index) => { 
            // Utilisation de l'indice (index) pour calculer le rang
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const Rang = index + 1; 
            // Le rang est l'indice (index) + 1 (pour commencer à partir de 1)
            return { id, data, Rang };
          });
        }),
        tap(result => {
          // Ici, result est un tableau avec les éléments triés par note décroissante et chaque élément contient également le rang (rank).
          // Vous pouvez également afficher les informations ici si nécessaire.
         // console.log("Resultat : " + result);
        })
      );
  }
  

    UpdateKommentar(SchulerId: string, KommentarPrincipal: string, 
      KommentarProfessor: string , Rang : string , 
      Entscheidung :string , 
      NeuesSchulJahr : string , AnmeldungBeginn : string
      ): Promise<void> {
    return this.Afs.collection('Kommentar')
    .doc(SchulerId).set({ Rang: Rang , 
      KommentarPrincipal : KommentarPrincipal , 
      KommentarProfessor : KommentarProfessor ,
      Entscheidung : Entscheidung,
      NeuesSchulJahr : NeuesSchulJahr,
      BeginnEinschreibung : AnmeldungBeginn
    
    
    
    
    
    
    }, { merge: true }).then(()=>{
      this.ToastService.success("Super!!!!!!")
    });
  }
  




  
  
}
