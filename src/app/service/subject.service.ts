import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, catchError, map, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private ToastService :ToastrService,private Afs:AngularFirestore) { }


  SpeichernNeuSubject(Data) {

    this.Afs.collection("Subject").add(Data).then(()=>{
     this.ToastService.success("Subject wurde erfolgreich hinzugefugt ")
    })
  
  }

  GetAllListSubject() {
    return this.Afs.collection('Subject')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  DeleteSubject(id)
  {
    this.Afs.collection("Subject").doc(id).delete().then(()=>{
      this.ToastService.warning("Löschen erfolgreich");
     // this.Changed.emit()
  
    })
  }

 //  Category Verifiezieren
 SubjectCodeVerifizieren(SubjectCode) {
  return this.Afs.collection('Subject', (ref) =>
    ref.where('SubjectCode', '==', SubjectCode)
  ).get();
}

  Get_all_Subject_entsprechend_der_Klasse_Id(klassenraumId) {
    return this.Afs.collection('Subject', ref => ref.where('KlassenRaum.KlassenRaumId', '==', klassenraumId))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  

  // addnote in firestore 
  SpeichernNeuSubjects(Data) {
   // const subjectCode = Data.SubjectCode;
  
    // Vérifier si un document avec le même code de sujet existe déjà
    this.Afs.collection("Subject").ref
      .where("SubjectCode", "==", Data.subjectCode)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Un document avec le même code de sujet existe déjà, afficher une erreur
          this.ToastService.error("Un sujet avec le même code existe déjà.");
        } else {
          // Aucun document avec le même code de sujet, ajouter la nouvelle matière
          this.Afs.collection("Subject").add(Data)
            .then(() => {
              this.ToastService.success("Le sujet a été ajouté avec succès.");
            })
            .catch((error) => {
              console.error("Erreur lors de l'ajout du sujet :", error);
              this.ToastService.error("Une erreur s'est produite lors de l'ajout du sujet.");
            });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification du sujet :", error);
        this.ToastService.error("Une erreur s'est produite lors de la vérification du sujet.");
      });
  }
  







  


  
 
  
  
  
}
  