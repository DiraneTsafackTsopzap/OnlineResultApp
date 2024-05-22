import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListLehrerComponent } from './components/Lehrer/list-lehrer/list-lehrer.component';
import { AddRaumComponent } from './components/Raum/add-raum/add-raum.component';
import { ListRaumComponent } from './components/Raum/list-raum/list-raum.component';
import { AddSchulerComponent } from './components/Schuler/add-schuler/add-schuler.component';
import { ListSchlulerComponent } from './components/Schuler/list-schluler/list-schluler.component';
import { SingleSchulerComponent } from './components/Schuler/single-schuler/single-schuler.component';
import { AddSubjectComponent } from './components/Subject/add-subject/add-subject.component';
import { ListSubjectComponent } from './components/Subject/list-subject/list-subject.component';
import { AddPunkteComponent } from './components/Punkte/add-punkte/add-punkte.component';
import { ListPunkteComponent } from './components/Punkte/list-punkte/list-punkte.component';
import { KommentarComponent } from './components/kommentar/kommentar.component';
import { ReportComponent } from './components/report/report.component';
import { LoginComponent } from './components/login/login.component';
import { AddLehrerComponent } from './components/Lehrer/add-lehrer/add-lehrer.component';
import { EditLehrerComponent } from './components/Lehrer/edit-lehrer/edit-lehrer.component';
import { AngularFireAuthGuard, canActivate } from '@angular/fire/compat/auth-guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AdminGuard } from './components/admin.guard';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [

  {
    path:'AddLehrer' ,component:AddLehrerComponent ,canActivate:[AdminGuard]
  },
  {
    path:'ListLehrer' ,component:ListLehrerComponent,canActivate:[AdminGuard]
  },


{
  path:'list/:id' , component:EditLehrerComponent,canActivate:[AdminGuard]}




,


  //-----------------------------------------------------------  Raum
  {
    path:'AddKlassenRaum' ,component:AddRaumComponent ,canActivate:[AdminGuard]
  },
  {
    path:'ListKlassenRaum' ,component:ListRaumComponent ,canActivate:[AdminGuard]
  }
,
  //------------------------------------------------------------- Schuler
  {
    path:'AddSchuler' ,component:AddSchulerComponent,canActivate:[AdminGuard]
  },
  {
    path:'ListSchuler' ,component:ListSchlulerComponent,canActivate:[AdminGuard]
  },
  {
    path:'Single/:id' ,component:SingleSchulerComponent,canActivate:[AdminGuard]
  },

  //----------------------------------------------------
  

  //----------------------------------------------------------------- Subject
  {
    path:'AddSubject' ,component:AddSubjectComponent,canActivate:[AdminGuard]
  },
  {
    path:'register' ,component:RegisterComponent
  },
  {
    path:'ListSubject' ,component:ListSubjectComponent,canActivate:[AdminGuard]
  },
  //-------------------------------------------------------------------  Punkte
  {
    path:'AddNote' ,component:AddPunkteComponent,canActivate:[AdminGuard]
  },
  {
    path:'ViewNote' ,component:ListPunkteComponent,canActivate:[AdminGuard]
  },
  {
    path:'Kommentar' ,component:KommentarComponent,canActivate:[AdminGuard]
  },
  {
    path:'Zeugnis' ,component:ReportComponent,canActivate:[AdminGuard]
  },
  {
    path:'login' ,component:LoginComponent
  },
  {path:'' , redirectTo:'login', pathMatch:'full'},
  {path:'pagenotfound' , component:PagenotfoundComponent},
{path:'**' , component:PagenotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
