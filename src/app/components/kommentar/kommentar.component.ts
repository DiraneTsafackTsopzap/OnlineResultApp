import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KommentarToupdate } from 'src/app/Model/KommentarToUpdate';
import { KlassenraumService } from 'src/app/service/klassenraum.service';
import { KommentarService } from 'src/app/service/kommentar.service';

@Component({
  selector: 'app-kommentar',
  templateUrl: './kommentar.component.html',
  styleUrls: ['./kommentar.component.css']
})
export class KommentarComponent implements OnInit {

  constructor(private kommentarservice : KommentarService, 
    private router : Router,
    private klassenraumservice : KlassenraumService) { }

  KlassenRaumArray 
  Kommentar

  ngOnInit(): void {

this.klassenraumservice.GetAllListKlassenraum().subscribe((data=>{
  this.KlassenRaumArray = data
}))


  }

  AnzahlSchuler : number

  onChange(e)
  {
    let Splitted = e.target.value.split('-')
   
     this.kommentarservice.Get_all_Raum_entsprechend_der_Klasse_Id(Splitted[0]).subscribe((data=>{
       this.Kommentar = data

      
       this.AnzahlSchuler = data.length

     }))
  }

  UpdateKommentar(IdDocument, note)
  {


//console.log(IdDocument , note.Rang )
const KommentarToUpdate : KommentarToupdate = {

  Rang : note.Rang,
  KommentarProfessor : note.data.KommentarProfessor,
  KommentarPrincipal : note.data.KommentarPrincipal,
  Entscheidung : note.data.Entscheidung,
  NeuesSchulJahr : note.data.NeuesSchulJahr,
  BeginnEinschreibung : note.data.BeginnEinschreibung


}


 this.kommentarservice.UpdateKommentar(IdDocument , 
   KommentarToUpdate.KommentarPrincipal ,
   KommentarToUpdate.KommentarProfessor ,
   KommentarToUpdate.Rang,
   KommentarToUpdate.Entscheidung,
   KommentarToUpdate.NeuesSchulJahr,
   KommentarToUpdate.BeginnEinschreibung,



   
   
   
   
   )


}

Gotoreport() {
  this.router.navigate(['Report'])
}

}
