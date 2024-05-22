import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ShortUniqueId from 'short-unique-id';
import { Schuler } from 'src/app/Model/Schuler';
import { KlassenraumService } from 'src/app/service/klassenraum.service';
import { SchulerService } from 'src/app/service/schuler.service';


@Component({
  selector: 'app-add-schuler',
  templateUrl: './add-schuler.component.html',
  styleUrls: ['./add-schuler.component.css']
})
export class AddSchulerComponent implements OnInit {
  AddSchulerForm : FormGroup
  KlassenRaum : any
  constructor(private fb:FormBuilder , 
    private schulerservice : SchulerService,
    private router :Router,
    private klassenservice : KlassenraumService) 

  { 
    this.AddSchulerForm = this.fb.group ({

      Name: ['', [Validators.required, Validators.maxLength(50)]],
      VorName: ['', [Validators.required, Validators.maxLength(50)]],
      
      EmailEltern: ['', [Validators.required, Validators.maxLength(50)]],
      Bild: ['', [Validators.required, Validators.pattern('^.*\.(jpg|jpeg|gif)$')]],
   
      KlassenRaum: [Validators.required],


    })
  }

  ngOnInit(): void {
    this.Loadall_Klassenraum()
  }

  Loadall_Klassenraum()
  {
   this.klassenservice.GetAllListKlassenraum().subscribe(data=>{

  this.KlassenRaum = data
})
  }

  get KlassenRaum_() {
    return this.AddSchulerForm.get('KlassenRaum');
   }
   get Bild_() {
    return this.AddSchulerForm.get('Bild');
   }
  AddNeuSchuler()
  {

    const uid = new ShortUniqueId({ length: 5 });
    let Splitted = this.AddSchulerForm.value.KlassenRaum.split('-');
    let newSchuler : Schuler = {

      Name : this.AddSchulerForm.value.Name,
      VorName : this.AddSchulerForm.value.VorName,
      EmailEltern : this.AddSchulerForm.value.EmailEltern,
      Bild : this.AddSchulerForm.value.Bild,
      MatrikulNummer :uid(),
      KlassenRaum : {

        KlassenRaumId : Splitted[0],
        KlassenRaumName : Splitted[1]
    }
    }

   
     this.schulerservice.SpeichernNeuSchuler(newSchuler)
     this.AddSchulerForm.reset()
     this.router.navigate(['ListSchuler'])


    
  }
}
