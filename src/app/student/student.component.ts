import {Component, OnInit} from '@angular/core';
import { studentList } from "../DTO/studentpage";
import { StudentpageService } from "./studentpage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NbMenuService} from "@nebular/theme";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  showstudent: studentList[] = [];
  load= false;
  loading=true;

  constructor(private ex: StudentpageService,
             private router: Router,
              private route:ActivatedRoute,
              private NbmenuService:NbMenuService,) {}

  ngOnInit(): void {
      this.checkUser();
  }
  checkUser(){
   if(localStorage.getItem('user') !== null){
     this.getdatamethod();
   }else{
     this.router.navigate(['/']);
   }
  }

  // get method Start
  getdatamethod() {
    this.ex.getData().subscribe((response) => {
        if (response.success) {
          this.showstudent = response.message
          console.log(this.showstudent);
          this.showstudent = this.showstudent.filter((response) => Object.keys(response).length !== 0);
          this.load = true;
          this.loading=false;
        }else {
          this.loading = false;
          this.load = false;
        }
      }
    );
  }
// get method End
  NavigateToForm() {
    this.router.navigate(['../dashboard/studentform']);
  }
}
