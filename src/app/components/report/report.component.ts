import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { KlassenraumService } from 'src/app/service/klassenraum.service';
import { RequestService } from 'src/app/service/request.service';
import { SchulerService } from 'src/app/service/schuler.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
// Bestanden oder nicht 
Bestanden : string
Students : any
IdSchuler : string
KlassenRaum : any
  constructor(private klassenraum : KlassenraumService, private schuler_service : SchulerService , private request_service : RequestService) {

    
   }
  KlassenRaumId : any
  ngOnInit(): void {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;


   // this.Load_note_periode_1()
   // this.Load_note_periode_2()
   // this.load_kommentar()
  //  this.load_studenten()
    this.load_klassen_raum()
   // this.load_raum()
   this.Bestanden = this.calculateTotalAverage() > 10 ? "nein" : "ja";
    
  }


  selectedItem: any;

  load_klassen_raum() {

    this.klassenraum.GetAllListKlassenraum().subscribe(data=>{
  this.KlassenRaum = data
    })
  }

  SelectStudent(e){

    let Splitted = e.target.value.split('-')
   
    this.Load_note_periode_1(Splitted[0])
    this.Load_note_periode_2(Splitted[0])
    this.load_kommentar(Splitted[0])
  }

  SelectKlassenRaum(e)
  {
    //console.log(e.target.value)
    this.schuler_service.load_studenten_entsprechend_klassraum(e.target.value).subscribe(data=>{
     this.Students = data
    })
  }
  SommeperiodeOne : any
  SommeperiodeTwo : any
  AverageperiodeOne : any
  AverageperiodeTwo : any




   NotesPeriodeOne: any[] = [];
   NotesPeriodeTwo : any[] = [];


  // Klassen Raum
  klassen_raum_name : any
  lehrer_email : any
  lehrer_nummer : any
  lehrer_name : any


  // Schuler 
  schuler_name : any
  schuler_vorname : any
  schuler_matriculnummer : any
  schuler_email_eltern : any
  schuler_bild : any

  SchulerId : any
  Rang : number
PrincipalKommentar
TeacherKommentar 

Entscheidung : string
NeuesSchulJahr : string
BeginnEinschreibung :string




  load_kommentar(IdSchuler) {

    this.request_service.Get_info_kommentar(IdSchuler).subscribe((data=>{

      console.log("Rang" + data.data['Rang'])

      this.Rang = data.data['Rang']
      this.PrincipalKommentar = data.data['KommentarPrincipal']
      this.TeacherKommentar = data.data['KommentarProfessor']
      this.Entscheidung = data.data['Entscheidung']
      this.NeuesSchulJahr = data.data['NeuesSchulJahr']
      this.BeginnEinschreibung = data.data['BeginnEinschreibung']
    }))
  }

  Load_note_periode_1(IdStudent) {
    
    this.schuler_service.GetNotesPeriode_1(IdStudent).subscribe((result) => {

      // KlassenRaumId
      this.KlassenRaumId = result[0].data['KlassenRaumId']

      // SchulerId
      this.SchulerId = result[0].data['SchulerId']
      //console.log(this.SchulerId)

      this.SommeperiodeOne = this.calculateSum(result);
      this.AverageperiodeOne = this.calculateAverage(result);

      this.NotesPeriodeOne = result.map((document) => {
        return {
          id: document.id,
          MatiereName: document.data['MatiereName'],
          Note: document.data['Note'],
          Periode: document.data['Periode'],
          Appreciation : document.data['Appreciation']
        };
      });

      this.request_service.Get_info_klassenraum(this.KlassenRaumId).subscribe((data=>{

       // console.log(data.data['KlassenRaum'])
        this.klassen_raum_name = data.data['KlassenRaum']
        this.lehrer_name = data.data['Lehrer']['LehrerName']
        this.lehrer_email = data.data['Lehrer']['Email']
        this.lehrer_nummer = data.data['Lehrer']['TelephonNummer']
      }))

      this.request_service.Get_info_schuler(this.SchulerId).subscribe((data=>{

        this.schuler_bild = data.data['Bild']
        this.schuler_email_eltern = data.data['EmailEltern']
        this.schuler_name = data.data['Name']
        this.schuler_vorname = data.data['VorName']
        this.schuler_matriculnummer = data.data['MatrikulNummer']
      }))







    });


   
    

  }

  Load_note_periode_2(IdStudent) {
    this.schuler_service.GetNotesPeriode_2(IdStudent).subscribe((result) => {

     

      this.SommeperiodeTwo = this.calculateSum(result);
      this.AverageperiodeTwo = this.calculateAverage(result);

      this.NotesPeriodeTwo = result.map((document) => {
        return {
          id: document.id,
          MatiereName: document.data['MatiereName'],
          Note: document.data['Note'],
          Periode: document.data['Periode'],
          Appreciation : document.data['Appreciation']
        };
      });


    });
  }

  AnzahlStudenten : any
  load_studenten() {

    this.schuler_service.GetAllListSchuler().subscribe(data=>{
      
      this.AnzahlStudenten = data.length
      this.Students = data
    })
  }

  


  
  calculateSum(notes: any[]): number {
    return notes.reduce((sum, note) => sum + note.data['Note'], 0);
  }
  
  calculateAverage(notes: any[]): number {
    if (notes.length === 0) return 0;
    const average = this.calculateSum(notes) / notes.length;
    return Number(average.toFixed(2)); // Convertir la moyenne en nombre à deux décimales
  }
  calculateTotalSum(): number {
    return this.SommeperiodeOne + this.SommeperiodeTwo;
  }
  calculateTotalAverage(): number {
    return (this.AverageperiodeOne + this.AverageperiodeTwo) / 2 ;
  }
  

  generatepdf() {



    // Récupérez l'URL de l'image principale, l'URL de l'image de l'enfant et le nom de l'école depuis votre source de données
    const ImageSolidarite_ToFecht = 'assets/solidarite.jpg';
    const imageChild_ToFecht = this.schuler_bild;
    const SchkoolName = 'Bilinguale Schulgruppe Solidarität';
  //console.log(student.data.Note_1)
    // Utilisez Promise.all() pour charger les deux images en parallèle
    Promise.all([
      fetch(ImageSolidarite_ToFecht).then(response => response.blob()),
      fetch(imageChild_ToFecht).then(response => response.blob())
    ])
      .then(([ImageSolidarite_Blob, ImageChild_Blob]) => {
        // Charger l'image principale avec FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result;
  
          // Charger l'image de l'enfant avec FileReader
          const Child_Reader = new FileReader();
          Child_Reader.onloadend = () => {
            const Child_Reader_Image_Result = Child_Reader.result;
  
            const documentDefinition = {
              background: [
                {
                  image: imageDataUrl,
                  opacity: 0.5, // Réglez l'opacité de l'image en fonction de vos besoins
                  fit: [595.28, 841.89], // Spécifiez les dimensions du format PDF (A4 ici)
                  alignment: 'center', // Réglez l'opacité de l'image en fonction de vos besoins
                  absolutePosition: { x: 100, y: 200 },
                }
              ],
              content: [
                {

               
                  columns: [
                    // Colonne 1 : Nom, Prénom, Âge
                    {
                      width: '65%',
                      text: [
                        
                        { text: 'Ministerin für Grundschulbildung' + '\n', style: 'greenText' },
                       
                        { text: '\n' },

                        { text: 'Republik Kamerun: Frieden - Arbeit - Vaterland\n', fontSize: 12  , style: 'greenText' },
                     
                        { text: '\n' },

                    

                      
                      ],
                      style: 'normal'
                    },
                  
                    
                    {
                      width: '35%',
                      text: [
                        
                     

                        { text: 'Handynummer : 675494739' +'\n', style: 'greenText' },
                        { text: '\n' },
                        { text: 'Douala Makepe Missoke ' +'\n' ,  style: 'greenText' },
                        { text: '\n' },
                        { text: 'Schuljahr : 2022 / 2023 ' +'\n' ,  style: 'greenText' },
                        { text: '\n' },

                      
                      ],
                    }
                  ]
                },
                {



                  columns: [
              
                    
                    // {
                    //   image: imageDataUrl,
                    //   width: 100,
                    //   alignment: 'center', // Centrer l'image horizontalement
                    //   margin: [0, 10, 0, 0] // Espacement autour de l'image
                    // },
                    // Colonne du nom de l'école
                    {
                      text: SchkoolName,
                      fontSize: 35,
                      bold: true,
                      alignment: 'center', // Centrer le nom de l'école horizontalement
                      margin: [10, 10, 0, 0] // Espacement autour du nom de l'école
                    },
                    
                  ],
                  
                },
                {



                  columns: [
              
                    
                    // {
                    //   image: imageDataUrl,
                    //   width: 100,
                    //   alignment: 'center', // Centrer l'image horizontalement
                    //   margin: [0, 10, 0, 0] // Espacement autour de l'image
                    // },
                    // Colonne du nom de l'école
                    {
                      text: 'Jährliches Zeugnis',
                      fontSize: 20,
                      bold: true,
                      alignment: 'center', // Centrer le nom de l'école horizontalement
                      margin: [10, 10, 0, 0] // Espacement autour du nom de l'école
                    },
                    
                  ],
                  
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 515, // Longueur du trait horizontal
                      y2: 0,
                      lineWidth: 1,
                      lineColor: '#000000',
                      margin: [0, 10] // Espacement avant et après le trait horizontal
                    }
                  ]
                },
                { text: '\n' },
                {
                  columns: [
                    // Colonne 1 : Nom, Prénom, Âge
                    {
                      width: '34%',
                      text: [
                        
                        { text: 'Name: ', style: 'greenText' },
                        { text: this.schuler_name + '\n' },
                        { text: '\n' },

                        { text: 'Vorname: ', style: 'greenText' },
                        { text: this.schuler_vorname + '\n' },
                        { text: '\n' },

                        { text: 'MatrikulNummer: ', style: 'greenText' },
                        { text: this.schuler_matriculnummer +'\n' },
                        { text: '\n' },

                        { text: 'EmailEltern: ', style: 'greenText' },
                        { text: this.schuler_email_eltern +'\n' },
                        { text: '\n' },

                      
                      ],
                      style: 'normal'
                    },
                    // Colonne 2 : Adresse, Ville, Email
                    {
                      width: '35%',
                      text: [
                        { text: 'KlasseRaum: ', style: 'greenText' },
                        { text: this.klassen_raum_name + '\n' },
                        { text: '\n' },
                        { text: 'LehrerName: ', style: 'greenText' },
                        { text: this.lehrer_name + '\n' },
                        { text: '\n' },

                        { text: 'LehrerEmail: ', style: 'greenText' },
                        { text: this.lehrer_email + '\n' },
                        { text: '\n' },

                        { text: 'LehrerNummer: ', style: 'greenText' },
                        { text: this.lehrer_nummer + '\n' },
                        { text: '\n' },
                      ],
                      style: 'normal'
                    },
                    // Colonne 3 : Image
                    
                    {
                      width: '34%',
                      image: Child_Reader_Image_Result,
                      fit: [100, 150],
                      alignment: 'right',
                      margin: [0, 10, 0, 0] // Espacement autour de l'image
                    }
                  ]
                },
                { text: '\n' },
             
                { text: '\n' },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 515, // Longueur du trait horizontal
                      y2: 0,
                      lineWidth: 1,
                      lineColor: '#000000',
                      margin: [0, 10] // Espacement avant et après le trait horizontal
                    }
                  ]
                },
          
                { text: '\n' },

               
,
          



//--------------------------------------------------------------  Periode divise en Deux 

{
  columns: [
    // Colonne 1 : Nom, Prénom, Âge
    {
      width: '45%',
      table: {
        headerRows: 1,
            widths: [ 'auto', 'auto' ,'auto' , 'auto'], // Définition des largeurs des colonnes
        body: [
          [
            { text: 'Fach' , fillColor: '#ADD8E6' },
            { text: 'Periode', fillColor: '#ADD8E6' },
            { text: 'Appreciation', fillColor: '#ADD8E6' },
            { text: 'Note', fillColor: '#ADD8E6' },
           
          ],
           // Ligne d'en-tête de la table
           ...this.NotesPeriodeOne.map((p) => [
            {
              text: p.MatiereName,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: p.Periode,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: p.Appreciation,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: p.Note,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
          
            
            
        
          ]), 
           [

             { text: 'Total ', colSpan: 3 },

           
          {},{},

             {
               text: this.SommeperiodeOne

             }

           ],
           [

            { text: 'Average ', colSpan: 3 },

          
         {},{},

            {
              text: this.AverageperiodeOne

            }

          ],
        
         
          // Ajoutez les autres lignes de données ici
        ],
      

        
      }
      
      
    },
    // Colonne 2 : Adresse, Ville, Email
    {
      width: '10%',
      text: [
    
      ],
      style: 'normal'
    },
    // Colonne 3 : Image
    
    {
      width: '45%',
      table: {
        headerRows: 1,
            widths: [ 'auto', 'auto' ,'auto' , 'auto'], // Définition des largeurs des colonnes
        body: [
          [
            { text: 'Fach' , fillColor: 'green' },
            { text: 'Periode', fillColor: 'green' },
            { text: 'Appreciation', fillColor: 'green' },
            { text: 'Note', fillColor: 'green' },
           
          ],
           // Ligne d'en-tête de la table
           ...this.NotesPeriodeTwo.map((p) => [
            {
              text: p.MatiereName,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: p.Periode,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: p.Appreciation,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: p.Note,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
          
            
            
        
          ]), 
           [

             { text: 'Total ', colSpan: 3 },

           
          {},{},

             {
               text: this.SommeperiodeTwo

             }

           ],
           [

            { text: 'Average ', colSpan: 3 },

          
         {},{},

            {
              text: this.AverageperiodeTwo

            }

          ],
        
         
          // Ajoutez les autres lignes de données ici
        ],
      

        
      }
    }
  ]
},



{ text: '\n' },
{
  canvas: [
    {
      type: 'line',
      x1: 0,
      y1: 0,
      x2: 515, // Longueur du trait horizontal
      y2: 0,
      lineWidth: 1,
      lineColor: '#000000',
      margin: [0, 10] // Espacement avant et après le trait horizontal
    }
  ]
},

{ text: '\n' },


//-----------------------------------------------------------------------  Table Bilan Annuel 
{
  columns: [
              
    {
      width: '100%',
    
      table: {
        headerRows: 1,
            widths: [ '*', 'auto' ,'auto' , 'auto'], // Définition des largeurs des colonnes
        body: [
          [
            { text: 'Durchschnitt der ersten Periode' , fillColor: '#ADD8E6' },
            { text: 'Durchschnitt der zweiten Periode', fillColor: 'green' },
          
            { text: 'Durchschnitt', fillColor: 'orange' },
            { text: 'Rang/Position', fillColor: 'yellow' },
           
          ],
      
          
          
           [
      
            {
              text: this.AverageperiodeOne,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: this.AverageperiodeTwo,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: this.calculateTotalAverage(),
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: this.Rang  ,
              //" / " + this.AnzahlStudenten,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
           ],
    
        //    [
      
        //     { text: 'Average ', colSpan: 3 },
      
          
        //  {},{},
      
        //     {
        //       text: this.AverageperiodeOne
      
        //     }
      
        //   ],
        
         
          // Ajoutez les autres lignes de données ici
        ],
      
      
        
      }
    },            
   
    
  ],

  
},
{ text: '\n' },
,
{
  columns: [
              
    {
      width: '100%',
    
      table: {
        headerRows: 1,
            widths: [ '*', 'auto' ,'auto' , 'auto' , 'auto' ,'auto'], // Définition des largeurs des colonnes
        body: [
          [
            { text: 'Kommentar des Lehrers' , fillColor: 'green' },
            { text: 'Kommentar des Schulleiters', fillColor: 'green' },
            { text: 'Bestanden', fillColor: 'green' },
          
            { text: 'Entscheidung', fillColor: 'green' },
            { text: 'Neues Schuljahr', fillColor: 'green' },
            { text: 'Beginn Der Einschreibung', fillColor: 'green' },
           
          ],
      
          
          
           [
      
            {
              text: this.TeacherKommentar,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: this.PrincipalKommentar,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: this.Bestanden,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: this.Entscheidung  ,
              //" / " + this.AnzahlStudenten,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: this.NeuesSchulJahr  ,
              //" / " + this.AnzahlStudenten,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
            {
              text: this.BeginnEinschreibung  ,
              //" / " + this.AnzahlStudenten,
            //  fontSize : 15,
              style: 'smallCell' // Ajoutez une classe CSS pour les cellules avec un style réduit
            },
           ],
    
    
        ],
      
      
        
      }
    },            
   
    
  ],

  
}
         ,       
{ text: '\n' },
{
  canvas: [
    {
      type: 'line',
      x1: 0,
      y1: 0,
      x2: 515, // Longueur du trait horizontal
      y2: 0,
      lineWidth: 1,
      lineColor: '#000000',
      margin: [0, 10] // Espacement avant et après le trait horizontal
    }
  ]
},

{ text: '\n' },
















              ],
              
              styles: {
                normal: {
                  fontSize: 12,
                  margin: [0, 5, 0, 5]
                },
                greenText: {
                  color: 'green'
                },
                label: {
                  bold: true
                },
                smallCell :
                {
                  fontSize : 8 // Ajoutez une classe CSS pour les cellules avec un style réduit
                },
                
              },
             
            };
  
            // Générer le document PDF avec les images chargées
            const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  
            // Ouvrir le fichier PDF dans une nouvelle fenêtre du navigateur
            pdfDocGenerator.open();
          };
          Child_Reader.readAsDataURL(ImageChild_Blob);
        };
        reader.readAsDataURL(ImageSolidarite_Blob);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des images :', error);
      });
  }

}
