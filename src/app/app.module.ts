import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AddSchulerComponent } from './components/Schuler/add-schuler/add-schuler.component';
import { ListSchlulerComponent } from './components/Schuler/list-schluler/list-schluler.component';
import { EditSchulerComponent } from './components/Schuler/edit-schuler/edit-schuler.component';
import { ViewSchulerComponent } from './components/Schuler/view-schuler/view-schuler.component';
import { AddLehrerComponent } from './components/Lehrer/add-lehrer/add-lehrer.component';
import { EditLehrerComponent } from './components/Lehrer/edit-lehrer/edit-lehrer.component';
import { ListLehrerComponent } from './components/Lehrer/list-lehrer/list-lehrer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LehrerService } from './service/lehrer.service';
import { AddRaumComponent } from './components/Raum/add-raum/add-raum.component';
import { ListRaumComponent } from './components/Raum/list-raum/list-raum.component';
import { KlassenraumService } from './service/klassenraum.service';
import { SchulerService } from './service/schuler.service';
import { SingleSchulerComponent } from './components/Schuler/single-schuler/single-schuler.component';
import { AddSubjectComponent } from './components/Subject/add-subject/add-subject.component';
import { ListSubjectComponent } from './components/Subject/list-subject/list-subject.component';
import { SubjectService } from './service/subject.service';
import { AddPunkteComponent } from './components/Punkte/add-punkte/add-punkte.component';

import { KommentarService } from './service/kommentar.service';
import { ListPunkteComponent } from './components/Punkte/list-punkte/list-punkte.component';
import { KommentarComponent } from './components/kommentar/kommentar.component';
import { ReportComponent } from './components/report/report.component';
import { RequestService } from './service/request.service';
import { ModalDialogDeleteComponent } from './components/modal-dialog-delete/modal-dialog-delete.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './components/register/register.component';

const firebase_Configuration = {

  // apiKey: "AIzaSyAA5KIdx23EMHKRMjnAY0jn_3M_zub3jVU",
  // authDomain: "ecommerceapp-72b2c.firebaseapp.com",
  // databaseURL: "https://ecommerceapp-72b2c-default-rtdb.europe-west1.firebasedatabase.app",
  // projectId: "ecommerceapp-72b2c",
  // storageBucket: "ecommerceapp-72b2c.appspot.com",
  // messagingSenderId: "273844664999",
  // appId: "1:273844664999:web:87a972b1d30c367f57b982"

  apiKey: "AIzaSyDMElTqND0cF_oMIv-YAeOoswqwD3oihxc",

  authDomain: "onlineschkoolapp.firebaseapp.com",

  projectId: "onlineschkoolapp",

  storageBucket: "onlineschkoolapp.appspot.com",

  messagingSenderId: "412306002753",

  appId: "1:412306002753:web:92f9736689507ec8d587c0"


};

@NgModule({
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    AngularFireModule.initializeApp(firebase_Configuration),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AddSchulerComponent,
    ListSchlulerComponent,
    EditSchulerComponent,
    ViewSchulerComponent,
    AddLehrerComponent,
    EditLehrerComponent,
    ListLehrerComponent,
    AddRaumComponent,
    ListRaumComponent,
    SingleSchulerComponent,
    AddSubjectComponent,
    ListSubjectComponent,
    AddPunkteComponent,
    ListPunkteComponent,
    KommentarComponent,
    ReportComponent,
    ModalDialogDeleteComponent,
    LoginComponent,
    PagenotfoundComponent,
    RegisterComponent,
 
  ],
  providers: [LehrerService , SubjectService, KommentarService, RequestService, ToastrService,
            KlassenraumService , 
            SchulerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
