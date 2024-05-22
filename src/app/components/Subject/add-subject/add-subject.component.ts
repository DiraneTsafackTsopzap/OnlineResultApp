import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/Model/Subject';
import { KlassenraumService } from 'src/app/service/klassenraum.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {


  KlassenRaum : any

  AddSubjectForm : FormGroup

  constructor(private fb:FormBuilder,private subject_service : SubjectService,private ToastService : ToastrService,
    private router : Router,
    private klassen_service : KlassenraumService) { 

    this.AddSubjectForm = this.fb.group ({

      SubjectName: ['', [Validators.required, Validators.maxLength(50)]],
      SubjectCode: ['', [Validators.required, Validators.maxLength(50)]],
      
     
   
      KlassenRaum: [Validators.required],


    })
  }

  ngOnInit(): void {
    this.Load_all_klassen_raum()
  }


  Load_all_klassen_raum()
  {
    this.klassen_service.GetAllListKlassenraum().subscribe(data=>{
      this.KlassenRaum = data
    })
  }
  

  get KlassenRaum_() {
    return this.AddSubjectForm.get('KlassenRaum');
   }

  AddNeuSubject()
  {
    let Splitted = this.AddSubjectForm.value.KlassenRaum.split('-');
    let newSubject : Subject = {

      SubjectName : this.AddSubjectForm.value.SubjectName,
      SubjectCode : this.AddSubjectForm.value.SubjectCode,
      KlassenRaum : {
        KlassenRaumId : Splitted[0],
        KlassenRaumName :Splitted[1]
      }

    }

   // console.log(this.AddSubjectForm.value)
 
  this.subject_service.SubjectCodeVerifizieren(newSubject.SubjectCode).subscribe(data=>{

    if(data.empty) {
        this.subject_service.SpeichernNeuSubject(newSubject)
    }
    else 
    {
      this.ToastService.warning("Es liegt dieser Ein Subject mit " + newSubject.SubjectName + " vor in db")
    }
  })
   this.AddSubjectForm.reset()
   this.router.navigate(['ListSubject'])

  }



}
