import { Component, OnInit } from '@angular/core';
import { KlassenraumService } from 'src/app/service/klassenraum.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-list-raum',
  templateUrl: './list-raum.component.html',
  styleUrls: ['./list-raum.component.css']
})
export class ListRaumComponent implements OnInit {

  KlassenRaum : any
  imageUrl : any
  constructor(private klassenraumservice : KlassenraumService , private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.LoadKlassenRaum()
  }

  LoadKlassenRaum()
  {
this.klassenraumservice.GetAllListKlassenraum().subscribe(data=>{

   this.KlassenRaum = data

 

})


  }

  // afin de pouvoir afficher limage dans notre ModelKlssenRaum , verifier le Model KlassenRaum
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  
  DeleteKlassenRaum(id)
  {
    this.klassenraumservice.DeleteKlassenraum(id)
  }
}
