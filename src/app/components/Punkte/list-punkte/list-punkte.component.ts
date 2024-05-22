import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Kommentar } from 'src/app/Model/Kommentar';

import { NotetoUpdate } from 'src/app/Model/NoteToUpdate';

import { KlassenraumService } from 'src/app/service/klassenraum.service';
import { KommentarService } from 'src/app/service/kommentar.service';
import { SchulerService } from 'src/app/service/schuler.service';

import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-list-punkte',
  templateUrl: './list-punkte.component.html',
  styleUrls: ['./list-punkte.component.css']
})
export class ListPunkteComponent implements OnInit {

  AddPunkteForm : FormGroup
  KlassenRaum : any
  KlassenRaumId : any
  SchulerName : any

  StudentArray : any
  
  SommeperiodeOne : any
  SommeperiodeTwo : any
  AverageperiodeOne : any
  AverageperiodeTwo : any




   NotesPeriodeOne: any[] = [];
   NotesPeriodeTwo : any[] = [];
   SchulerId : any
  constructor(private schuler_service : SchulerService , private router : Router , private kommentarservice : KommentarService
    ,private klassen_service : KlassenraumService) { }

  

  ngOnInit(): void {

    
    
   // this.load_schuler()
    this.load_klassen_raum()
   

    


   
  
  

  


  }

  onChangeKlassenraum(e) {
    let Splitted = e.target.value.split('-')

    this.schuler_service.load_studenten_entsprechend_klassraum(Splitted[0]).subscribe(data=>{
      this.StudentArray = data
     })
  }

  onChange(e) {

    let Splitted = e.target.value.split('-')
   this.SchulerId = Splitted[0]
    this.schuler_service.GetNotesPeriode_1(Splitted[0]).subscribe((result) => {
      // 'result' contient la liste des documents de la sous-collection "Note" pour l'étudiant donné
      // Parcourir les résultats pour récupérer les valeurs des champs "maths" et "periode"

      this.SommeperiodeOne = this.calculateSum(result);
       this.KlassenRaumId = result[0].data['KlassenRaumId']
      this.SchulerName = result[0].data['SchulerName']

      

     // console.log("Klasse : " + result[0].data['KlassenRaumId'])

      this.AverageperiodeOne = this.calculateAverage(result);


      this.NotesPeriodeOne = result.map((document) => {
        return {
          id: document.id,
          MatiereName: document.data['MatiereName'],
          Note: document.data['Note'],
          Periode: document.data['Periode']
          
        };
      });
    });

    this.schuler_service.GetNotesPeriode_2(Splitted[0]).subscribe((result) => {
      // 'result' contient la liste des documents de la sous-collection "Note" pour l'étudiant donné
      // Parcourir les résultats pour récupérer les valeurs des champs "maths" et "periode"
      this.SommeperiodeTwo = this.calculateSum(result);
      this.AverageperiodeTwo = this.calculateAverage(result);
      this.NotesPeriodeTwo = result.map((document) => {
        return {
          id: document.id,
          MatiereName: document.data['MatiereName'],
          Note: document.data['Note'],
          Periode: document.data['Periode']
        };
      });
    });



    // Retrieve All Informations Bezüglich der KlassenName
    
  }

  
 
  load_schuler()
  {
    this.schuler_service.GetAllListSchuler().subscribe(data=>{
      this.StudentArray = data
    })
  }
  
  load_klassen_raum()
  {
    this.klassen_service.GetAllListKlassenraum().subscribe(data=>{
      this.KlassenRaum = data
    })
  }
  

  DeleteNote(id)
  {
  
    this.schuler_service.deleteNoteDocument(this.SchulerId,id)
  }
  


  UpdateNote(id: string , note): void {


    const Note : NotetoUpdate = {

      Note : note.Note
    }
    
    this.schuler_service.updateNoteField(this.SchulerId , id ,Note.Note)

   


}

calculateSum(notes: any[]): number {
  return notes.reduce((sum, note) => sum + note.data['Note'], 0);
}

calculateAverage(notes: any[]): number {
  if (notes.length === 0) return 0;
  const average = this.calculateSum(notes) / notes.length;
  return Number(average.toFixed(2)); // Convertir la moyenne en nombre à deux décimales
}
calculateTotalSum(): number {
  return this.SommeperiodeOne + this.SommeperiodeTwo;
}
calculateTotalAverage(): number {
  return (this.AverageperiodeOne + this.AverageperiodeTwo) / 2 ;
}

  



AddKommentar(){

  const AddKommentar : Kommentar = {

    GesamteNote : this.calculateTotalSum(),
    KommentarProfessor : '' ,
    KommentarPrincipal : '',
    SchulerId : this.SchulerId,
    KlassenRaumId : this.KlassenRaumId ,
    Rang : '',
    SchulerName :this.SchulerName

  }
  console.log(AddKommentar.SchulerId)

  this.kommentarservice.AddKommentar(AddKommentar.SchulerId ,AddKommentar)
  this.router.navigate(['Kommentar'])
}

}
