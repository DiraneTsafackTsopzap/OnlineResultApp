import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/Model/Note';


import { KlassenraumService } from 'src/app/service/klassenraum.service';
import { SchulerService } from 'src/app/service/schuler.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-add-punkte',
  templateUrl: './add-punkte.component.html',
  styleUrls: ['./add-punkte.component.css']
})
export class AddPunkteComponent implements OnInit {

 // AddPunkteFormn : FormGroup
  KlassenRaum : any
  Subject : any
  Schuler : any
  note : any

  notes = [];

  // activer et desactiver le bouton si tous / aucun element nest selectioner
  SubjectBool : boolean
  KlassenRaumBool : boolean
  PeriodeBool : boolean
  selectedPeriode : any
  selectedMatiere : any
  selectedklassenraum : any


   periodes: string[] = ['Période 1', 'Période 2'];



  constructor(private subject_service : SubjectService ,private ToastService:ToastrService,
    private schuler_service : SchulerService
    ,private klassen_service : KlassenraumService) { }

  ngOnInit(): void {

    this.klassen_service.GetAllListKlassenraum().subscribe(data=> {
      this.KlassenRaum = data
    })

  
    

  }

  klassen_id : any
  periode : any
  subject_id : any
  subject_name : any
  
  subject_code : any
  klassen_raum_name : any
  Lehrer_Bild : any
  Lehrer_Email : any
  Lehrer_Name : any
Lehrer_Nummer : any
LehrerIdd : any
  on_change_klassen_raum(e)
  {
    let Splitted = e.target.value.split('-')

   
    this.subject_service.Get_all_Subject_entsprechend_der_Klasse_Id(Splitted[0]).subscribe(data=>{
      this.Subject = data

      
    })


    //
    let imageIndex = Splitted.findIndex(element => element.includes('http'));

    this.klassen_id = Splitted[0]
    this.klassen_raum_name = Splitted[1]
    this.Lehrer_Email = Splitted[2]
    this.Lehrer_Name = Splitted[3]
    this.Lehrer_Nummer = Splitted[4]
    this.LehrerIdd = Splitted[5]
    this.Lehrer_Bild = Splitted.slice(imageIndex).join('-')
  

    
    
  }

  on_change_subject(e)
  {
    let Splitted = e.target.value.split('-')
    this.subject_id = Splitted[0]
    this.subject_name = Splitted[1]
    this.subject_code = Splitted[2]

  }
  on_change_periode(e)
  {
   
    this.periode = e.target.value as HTMLScriptElement
  }




  DeroulerListe()
  {
 
   this.schuler_service.load_studenten_entsprechend_klassraum(this.klassen_id).subscribe(data=>{
    this.Schuler = data

   })




  }

  id_document : string
  lehrer_data : string
  password: string = '';

  Etape_One(id,lehrer) {

this.id_document = id
this.lehrer_data = lehrer
  }


  id_etudiant : any

  addnote(id: string, student): void {

      this.id_etudiant = id;
      
      const Data : Note = {

        SchulerId : id,
        SchulerName : student.data.Name,
        KlassenRaumId : this.klassen_id,
        Periode : this.periode,
        LehrerId : this.LehrerIdd,
   
        MatiereId : this.subject_id,
        MatiereName : this.subject_name,
          Appreciation : student.data.Appreciation,
          Note : student.data.Note_1
        
      
      }
            //console.log (Data.Appreciation)

            if (this.password === '98187298' ) {
      
              this.schuler_service.SaveStudentNote(Data)
              
            } else {
             // this.error = 'Mot de passe incorrect';
              this.ToastService.error("Passwort is falsch")
              
            }
    
     //this.AddPunkteForm.reset();



}
  


  

}
