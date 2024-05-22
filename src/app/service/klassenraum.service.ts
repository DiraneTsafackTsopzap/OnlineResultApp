import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KlassenraumService {

  constructor(private ToastService :ToastrService,private Afs:AngularFirestore) { }


  SpeichernKlassenRaum(Data) {

    this.Afs.collection("Klassenraum").add(Data).then(()=>{
     this.ToastService.success("Klassenraum wurde erfolgreich hinzugefugt ")
    })
  
  }

  GetAllListKlassenraum() {
    return this.Afs.collection('Klassenraum')
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
  DeleteKlassenraum(id)
  {
    this.Afs.collection("Klassenraum").doc(id).delete().then(()=>{
      this.ToastService.warning("Löschen erfolgreich");
     // this.Changed.emit()
  
    })
  }


}
