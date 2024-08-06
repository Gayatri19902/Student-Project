import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccessService} from "./access.service";
import {AccessList} from "../DTO/access";
import {ActivatedRoute, Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {SignUpService} from "../core/sign-up/sign-up.service";

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  showAccess:AccessList[]=[];
  load=false;
  UserId:string;
  loading=true;

  constructor(
    private fb: FormBuilder,
    private access: AccessService,
    private router: Router,
    private Toast:NbToastrService,
    private route:ActivatedRoute,
    private signService:SignUpService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(x=>{
          this.UserId = x.id;
    });
    this.getData();
  }

  getData(){
    this.signService.getAllData().subscribe((x)=>{
      if (x.success){
        this.showAccess = x.message;
        console.log(x.message);
        this.loading=false;
      }
    });
  }

}
