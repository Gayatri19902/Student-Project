import {Component, OnInit} from '@angular/core';
import {FormGroup,Validators,FormBuilder} from "@angular/forms";
import {CreativeInstallment} from "../DTO/Installment";
import {InstallmentService} from "./installment.service";
import {Installment} from "../DTO/Installment";
import {NbToastrService} from "@nebular/theme";
import {forkJoin} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.scss']
})
export class InstallmentsComponent implements OnInit{
  myInstallment! :FormGroup;
  years: number[] = [];
  currentyear = new Date().getFullYear();
  Installmentslist: Installment[]=[];
  InstallmentslistYear: Installment;
  load=false;
  loading=true;
  constructor(private fb:FormBuilder,
              private Install:InstallmentService,
              private toastrService:NbToastrService,
              private router:Router,) {}

  dropdowndata(){
    const startyear:number =this.currentyear + 5;
    for(let year:number=this.currentyear - 5; year<= startyear; year++){
     this.years.push(year)
    }
  }

  ngOnInit(): void {
    this.dropdowndata();
    this.InstallmentValidations();
    this.checkUser();
  }

  checkUser(){
    if(localStorage.getItem('user') !== null){
      this.getData();
    }else{
      this.router.navigate(['/']);
    }
  }
  InstallmentValidations(){
    this.myInstallment = this.fb.group({
      selectedYear:['',[Validators.required]],
      Installment1:['',[Validators.required]],
      Installment2:['',[Validators.required]],
      Installment3:['',[Validators.required]]
    });
  }

  getData(){
    forkJoin(this.Install.getInstallment(this.currentyear),
      this.Install.AllInstallmentsData()).subscribe(x => {
        if (x[0].success && x[1].success){
          this.InstallmentslistYear = x[0].message;
          this.Installmentslist = x[1].message;
          this.disableMethod();
          this.load=true;
          this.loading=false;
        }
    });
  }

    setYear(year:number){
    const today = new Date();
    const selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const selectDate2 = new Date(today.getFullYear(),today.getMonth()+2, today.getDate());
    const selectedDate3 = new Date(today.getFullYear(), today.getMonth()+4, today.getDate());
    selectedDate.setFullYear(year);
    selectDate2.setFullYear(year);
    selectedDate3.setFullYear(year);
    this.myInstallment.get('Installment1')?.setValue(selectedDate);
    this.myInstallment.get('Installment2')?.setValue(selectDate2);
    this.myInstallment.get('Installment3')?.setValue(selectedDate3);
  }

  save() {
    if (this.myInstallment.invalid){
      return;
    }
    else {
      const Data = new CreativeInstallment();
      Data.year = this.myInstallment.get('selectedYear')?.value;
      Data.installmentOne = this.myInstallment.get('Installment1')?.value;
      Data.installmentTwo = this.myInstallment.get('Installment2')?.value;
      Data.installmentThree = this.myInstallment.get('Installment3')?.value
      this.Install.postInstallment(Data).subscribe((response)=>{
        if (response.success){
          this.toastrService.success('Installment Details Success', 'success', {duration:2000})
          console.log(response.message);
          this.getData();
          // this.getAllData();
          this.InstallmentValidations();
        }else {
           this.toastrService.danger('Failed to Installment Details', 'error', {duration:2000})
        }
      },error=>{
          this.toastrService.danger('error', 'Error', {duration:2000})
        });
      }
  }
  disableMethod(){
    this.myInstallment.get('selectedYear')?.valueChanges.subscribe(year => {
      const currentYear = new Date().getFullYear();
      const isPastYear = year < currentYear;
      const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
      saveButton.style.display = isPastYear? 'none': 'block';
    });
  }
}
