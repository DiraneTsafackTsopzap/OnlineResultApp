import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.component.html',
  styleUrls: ['./list-subject.component.css']
})
export class ListSubjectComponent implements OnInit {

  constructor(private subject_service : SubjectService) { }

  Subject : any

  ngOnInit(): void {

    this.subject_service.GetAllListSubject().subscribe(data=>{
      this.Subject = data
    })
  }


  DeleteSubject(id)
  {

    this.subject_service.DeleteSubject(id)
  }

}
