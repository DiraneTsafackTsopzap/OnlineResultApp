import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private Afs : AngularFirestore) { }


  /// Info about KlassenName
 
  Get_info_klassenraum(klassenraumId: string) {
    return this.Afs.collection('Klassenraum').doc(klassenraumId).snapshotChanges().pipe(
      map((action) => {
        const data = action.payload.data();
        const id = action.payload.id;
        return { id, data };
      })
    );
  }

  // Info About Schuler 
  Get_info_schuler(SchulerId: string) {
    return this.Afs.collection('Schüler').doc(SchulerId).snapshotChanges().pipe(
      map((action) => {
        const data = action.payload.data();
        const id = action.payload.id;
        return { id, data };
      })
    );
  }

  // Get all Kommentar
  Get_info_kommentar(SchulerId: string) {
    return this.Afs.collection('Kommentar').doc(SchulerId).snapshotChanges().pipe(
      map((action) => {
        const data = action.payload.data();
        const id = action.payload.id;
        return { id, data };
      })
    );
  }
  
}
