import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KlassenRaum } from 'src/app/Model/KlassenRaum';
import { KlassenraumService } from 'src/app/service/klassenraum.service';
import { LehrerService } from 'src/app/service/lehrer.service';

@Component({
  selector: 'app-add-raum',
  templateUrl: './add-raum.component.html',
  styleUrls: ['./add-raum.component.css']
})
export class AddRaumComponent implements OnInit {

  AddKlassenRaumForm : FormGroup
  Lehrer : any
  constructor(private lehrerservice:LehrerService , private router : Router,
    private klassenraumservice : KlassenraumService,
    private fb :FormBuilder) {
    this.AddKlassenRaumForm = this.fb.group ({

      KlassenName: ['', [Validators.required, Validators.maxLength(50)]],
      Lehrer: [Validators.required],
  


    })
   }


   get KlassenRaum_() {
    return this.AddKlassenRaumForm.get('KlassenName');
   }
   get Lehrer_() {
    return this.AddKlassenRaumForm.get('Lehrer');
   }







  ngOnInit(): void {
    this.LoadalltheLehrer()
  }
  LoadalltheLehrer()
  {
   this.lehrerservice.GetAllList().subscribe(data=>{

  this.Lehrer = data
})
  }



  AddNeuKlassenRaum()
  {
    let Splitted = this.AddKlassenRaumForm.value.Lehrer.split('-');

    // recuperer lurl image sans utiliser le Split
    let imageIndex = Splitted.findIndex(element => element.includes('http'));

    let Raum : KlassenRaum = {

      KlassenRaum : this.AddKlassenRaumForm.value.KlassenName,
      LehrerId : Splitted[0],
      Lehrer : {
        LehrerName : Splitted[1],
        TelephonNummer : Splitted[3],
        Email : Splitted[2],
        Bild: Splitted.slice(imageIndex).join('-')
      }
        
      

    }

   this.klassenraumservice.SpeichernKlassenRaum(Raum);
   this.AddKlassenRaumForm.reset();
    this.router.navigate(['ListKlassenRaum'])

  }

}
