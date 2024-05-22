import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LehrerService {

  constructor(private ToastService :ToastrService,private Afs:AngularFirestore) { }


  // Speicher Lehrer In FireStore DB
  SpeichernNeuLehrer(Data) {

    this.Afs.collection("Lehrer").add(Data).then(()=>{
     this.ToastService.success("Lehrer wurde erfolgreich hinzugefugt ")
    })
  
  }

  // Daten eines bestimmten Lehrer-Dokuments (Lehrer)
  // unter Verwendung seiner ID als Eingabeparameter abzurufen
  GetOneLehrer(id)
  {
    return this.Afs.doc(`Lehrer/${id}`).valueChanges();
  }


  // Gib alle Lehrer von Firestore zuruck
  GetAllList() {
    return this.Afs.collection('Lehrer')
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
  // Löschen eines Lehrers aus Firestore
  DeleteLehrer(id)
  {
    return this.Afs.collection("Lehrer").doc(id).delete().then(()=>{
      this.ToastService.success("Löschen erfolgreich");
    
})
  }
  
}
