import { Component, OnInit } from '@angular/core';
import { KlassenraumService } from 'src/app/service/klassenraum.service';
import { SchulerService } from 'src/app/service/schuler.service';

@Component({
  selector: 'app-list-schluler',
  templateUrl: './list-schluler.component.html',
  styleUrls: ['./list-schluler.component.css']
})
export class ListSchlulerComponent implements OnInit {
  KlassenRaum : any
  Schuler : any


  constructor(private klassenservice : KlassenraumService , private schulerservice : SchulerService) { }

  ngOnInit(): void {
    this.load_klassen_raum()
    this.load_schuler()
  }


  load_klassen_raum()
  {
    this.klassenservice.GetAllListKlassenraum().subscribe(data=>{
      this.KlassenRaum = data
    })
  }

  load_schuler()
  {
    this.schulerservice.GetAllListSchuler().subscribe(data=>{
      this.Schuler = data
    })
  }


}
