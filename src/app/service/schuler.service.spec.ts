import { TestBed } from '@angular/core/testing';
import { SchulerService } from './schuler.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Note } from '../Model/Note';


describe('NoteService', () => {
  let service: SchulerService; 
  let afs: AngularFirestore;
  
  const firebase_Configuration = {

    apiKey: "AIzaSyAA5KIdx23EMHKRMjnAY0jn_3M_zub3jVU",
    authDomain: "ecommerceapp-72b2c.firebaseapp.com",
    databaseURL: "https://ecommerceapp-72b2c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ecommerceapp-72b2c",
    storageBucket: "ecommerceapp-72b2c.appspot.com",
    messagingSenderId: "273844664999",
    appId: "1:273844664999:web:87a972b1d30c367f57b982"
  
  };

  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(firebase_Configuration), 
        AngularFirestoreModule,
        ToastrModule.forRoot()
      ],
      providers: [SchulerService] 
    });

    service = TestBed.inject(SchulerService); 
    afs = TestBed.inject(AngularFirestore);
  });

 

  const FestgelegteNote : Note = {

    Appreciation :'Gut' ,
    KlassenRaumId : 'GnGZYJhpUz2ZQHoAhrGS ' ,
    LehrerId : 'QPF7sPeSPEzQ839cgrK8 ' ,
    MatiereId : 'Mk7JBkRbJl21aiDscElO' ,
    MatiereName : 'Info' ,
    Note : 15 ,
    Periode : 'Période 1' ,
    SchulerId : 'C84PLSfJnczcZgcpXfxP' ,
    SchulerName : 'Athena Kathena'
  }
  it('Überprüfen, ob die Note bereits existiert', async () => {
    try {
      const notesCollectionRef = afs.collection('RegisterNote')
        .doc(FestgelegteNote.SchulerId)
        .collection('Note');
  
      const existingNoteQuery = notesCollectionRef.ref
        .where('MatiereId', '==', FestgelegteNote.MatiereId)
        .where('Periode', '==', FestgelegteNote.Periode)
        .where('Note', '==', FestgelegteNote.Note);
  
      const querySnapshot = await existingNoteQuery.get();
  
      if (querySnapshot.empty) {
        console.log("La Note N'existe Pas");
        // Donc on peut L'ajouter ici en Appelant notre Fonction AddStudentNote
      } else {
        
        fail('Die Note existiert bereits');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  });
  
  


 
  
  
  
});


//ng test --include=src/app/service/schuler.service.spec.ts
