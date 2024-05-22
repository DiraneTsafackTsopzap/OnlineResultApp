import { Component, OnInit } from '@angular/core';
import { LehrerService } from 'src/app/service/lehrer.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-lehrer',
  templateUrl: './list-lehrer.component.html',
  styleUrls: ['./list-lehrer.component.css']
})
export class ListLehrerComponent implements OnInit {

  constructor(private leherservice :LehrerService , private ToastService : ToastrService) { }

  Lehrer : any

  password: string = '';
  
  docIdToDelete: string = '';

  ngOnInit(): void {
    this.LoadalltheLehrer()
  }

  LoadalltheLehrer()
  {
this.leherservice.GetAllList().subscribe(data=>{

  this.Lehrer = data
})
  }



  
  SuchenLehrer(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    if (!query) {
      
      this.LoadalltheLehrer()

    }
    
    else {
      this.Lehrer = this.Lehrer.filter((name) =>
        name.data.LehrerName.toLowerCase().startsWith(query)
      );
    }
  }



  Etape_One(id) {

    //On attribut id passer en Parametre dans notre DocIdTodelete
    // on passe le DocIdtodelete dans letape 2 de Notre Template , --->  eventclick()
    this.docIdToDelete = id;
  }
 

  Etape_Two(id) {


   
    if (this.password === '98187298' ) {
      
      this.leherservice.DeleteLehrer(id)
      
    } else {
     // this.error = 'Mot de passe incorrect';
      this.ToastService.error("Mot de Passe Incorrect")
      
    }


  }

  
  


}
