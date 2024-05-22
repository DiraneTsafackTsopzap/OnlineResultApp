import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Lehrer } from 'src/app/Model/Lehrer';
import { LehrerService } from 'src/app/service/lehrer.service';

@Component({
  selector: 'app-add-lehrer',
  templateUrl: './add-lehrer.component.html',
  styleUrls: ['./add-lehrer.component.css']
})
export class AddLehrerComponent implements OnInit {



  AddLehrerForm : FormGroup
  constructor(private fb : FormBuilder , private router : Router , private LehrerService : LehrerService,
   ) { 

    //---- 1-initialisation du formulaire
    this.AddLehrerForm = this.fb.group ({

      LehrerName: ['', [Validators.required, Validators.maxLength(50)]],
      Email: ['', [Validators.required, Validators.maxLength(50)]],
      Bild: ['', [Validators.required, Validators.pattern('^.*\.(jpg|jpeg|gif)$')]],
      TelephonNummer: ['', [Validators.required, Validators.maxLength(50)]],


    })
  }


  // 2- validation des Inputs
  get Lehrer_() {
    return this.AddLehrerForm.get('LehrerName');
   }
   get Email_() {
    return this.AddLehrerForm.get('Email');
   }
   get PhoneNummer_() {
    return this.AddLehrerForm.get('TelephonNummer');
   }
   get Bild_() {
    return this.AddLehrerForm.get('Bild');
   }




  ngOnInit(): void {
  }


  // 3- save in firestore
  AddNeuLehrer()
  {
    const formData: Lehrer = this.AddLehrerForm.value;
      let neulehrer : Lehrer = {
        LehrerName : this.AddLehrerForm.value.LehrerName,
        Email : this.AddLehrerForm.value.Email,
        Bild : this.AddLehrerForm.value.Bild,
        TelephonNummer : this.AddLehrerForm.value.TelephonNummer,

      }

      //console.log(formData)
    this.LehrerService.SpeichernNeuLehrer(neulehrer);
     this.AddLehrerForm.reset();
     this.router.navigate(['ListLehrer'])

  }


}
