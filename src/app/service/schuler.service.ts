import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot, QueryFn } from '@angular/fire/compat/firestore';
import { Observable, forkJoin, from, map, mergeMap, switchMap } from 'rxjs';
import { Note } from '../Model/Note';


@Injectable({
  providedIn: 'root'
})
export class SchulerService {

  constructor(private ToastService :ToastrService,private Afs:AngularFirestore) { 

  }

  SubjectCodeVerifizieren(SubjectCode) {
    return this.Afs.collection('Subject', (ref) =>
      ref.where('SubjectCode', '==', SubjectCode)
    ).get();
  }

  Addabuch(data)
  {
     this.Afs.collection("Bucher").add(data);
  }
  

  DoesNoteExist(schulerId: string, matiereId: string, periode: string): Observable<boolean> {
    // Vérifier si une note avec les mêmes schulerId, matiereId et periode existe dans Firestore
    return this.Afs.collection<Note>('RegisterNote', ref =>
      ref.where('SchulerId', '==', schulerId)
         .where('MatiereId', '==', matiereId)
         .where('Periode', '==', periode)
         .limit(1)
    ).valueChanges().pipe(
      map(notes => notes.length > 0)
    );
  }

  
  
  SaveStudentNote(Data) {
    const notesCollectionRef = this.Afs.collection('RegisterNote')
    .doc(Data.SchulerId).collection('Note');
  
    // Vérifier si la note existe déjà pour cette période et cette matière
    const existingNoteQuery = notesCollectionRef.ref
      .where('MatiereId', '==', Data.MatiereId)
      .where('Periode', '==', Data.Periode);
  
    existingNoteQuery.get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        // Ajouter la note car elle n'existe pas pour cette période
        notesCollectionRef.add({
          SchulerId : Data.SchulerId,
          SchulerName : Data.SchulerName,
          MatiereId: Data.MatiereId,
          Periode: Data.Periode,
          Appreciation : Data.Appreciation,
          MatiereName : Data.MatiereName,
          Note: Data.Note,
          KlassenRaumId: Data.KlassenRaumId, // Ajouter KlassenRaumId
          LehrerId: Data.LehrerId // Ajouter LehrerId
        }).then(() => {
          this.ToastService.success('Note sauvegardée avec succès.');
        }).catch((error) => {
          this.ToastService.error('Erreur lors de la sauvegarde de la note :', error);
          console.log("Note existiert bereits")
        });
      } else {
        // La note existe déjà pour cette période, renvoyer une erreur
        this.ToastService.error('La note est déjà disponible pour cette période.');
      }
    }).catch((error) => {
      this.ToastService.error('Erreur lors de la vérification de la note existante :', error);
    });
  }
  
  Get_All_Note_For_Studentn(SchulerId) {
    return this.Afs.collection('RegisterNote').doc(SchulerId).collection('Note')
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
  deleteNoteDocument(SchulerId: string, documentId: string): Promise<void> {
    return this.Afs.collection('RegisterNote')
    .doc(SchulerId).collection('Note').doc(documentId).delete().then(()=>{

      this.ToastService.error("Note Supprimer Avec Succes")
    });
  }
  

updateNoteField(SchulerId: string, documentId: string, newNote: number): Promise<void> {
  return this.Afs.collection('RegisterNote')
  .doc(SchulerId).collection('Note').doc(documentId).set({ Note: newNote }, { merge: true }).then(()=>{
    this.ToastService.success("Great")
  });
}

 // Méthode pour filtrer les notes par période
 GetNotesPeriode_1(SchulerId: string): Observable<any[]> {
  return this.Afs.collection('RegisterNote').doc(SchulerId).
  collection('Note', ref => ref.where('Periode', '==', 'Période 1'))
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

GetNotesPeriode_2(SchulerId: string): Observable<any[]> {
  return this.Afs.collection('RegisterNote').doc(SchulerId).
  collection('Note', ref => ref.where('Periode', '==', 'Période 2'))
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

















  SpeichernNeuSchuler(Data) {

    this.Afs.collection("Schüler").add(Data).then(()=>{
     this.ToastService.success("Schüler wurde erfolgreich hinzugefugt ")
    })
  
  }

  GetAllListSchuler() {
    return this.Afs.collection('Schüler')
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
  DeleteSchüler(id)
  {
    this.Afs.collection("Schüler").doc(id).delete().then(()=>{
      this.ToastService.warning("Löschen erfolgreich");
     // this.Changed.emit()
  
    })
  }




  load_studenten_entsprechend_klassraum(klassraumId)
{
  
  return this.Afs.collection("Schüler" , ref=>ref.where("KlassenRaum.KlassenRaumId" , "==" , klassraumId))
  .snapshotChanges()
  .pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        //console.log("dataservice : " + data['ProductId'])
        return { id, data };
      });
    })
  );
}










//--------------------















































}




















