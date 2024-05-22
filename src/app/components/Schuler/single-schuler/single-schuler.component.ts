import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchulerService } from 'src/app/service/schuler.service';

@Component({
  selector: 'app-single-schuler',
  templateUrl: './single-schuler.component.html',
  styleUrls: ['./single-schuler.component.css']
})
export class SingleSchulerComponent implements OnInit {

  constructor(private Activatedrouted : ActivatedRoute , private schulerservice : SchulerService) { }

  Schuler : any
  Anzahl : any
  ngOnInit(): void {

    
    this.Activatedrouted.params.subscribe(data=>{
     
      this.schulerservice.load_studenten_entsprechend_klassraum(data['id']).subscribe(data=>{
       // console.log("data : " + data.length)
       this.Schuler = data
       this.Anzahl = data.length
      })
    }) 
  }

}
