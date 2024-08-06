import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {addPettyCashList, PettyCashList} from "../DTO/pettycash";
import {PettyCashService} from "./petty-cash.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-petty-cash',
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.scss']
})
export class PettyCashComponent implements OnInit{
  myPettycash! :FormGroup;
  submitted=false;
  showPettyCash:PettyCashList[] =[]
  pettycashBill:addPettyCashList;
  PettycashId:string;
  url:any;
  delete=false;
  load=false;
  loading=true;
  loadbill = false;
  ReadOnly=false;
  confirmBTN=false;
  fileData: any;
  billId:string;
  billImageUrl:string;
  ImageUrl: boolean;
  @ViewChild('fileInput') fileInput!:ElementRef<any>
  constructor(
    private  fb: FormBuilder,
    private ps: PettyCashService,
    private dailogservice:NbDialogService,
    private toastService:NbToastrService,
    private router:Router,) {
  }

  ngOnInit(): void {
     this.pettcashValidations();
     this.checkUser();
  }

  checkUser(){
    if(localStorage.getItem('user') !== null){
     this.getPettycashData();
    }else{
      this.router.navigate(['/']);
    }
  }

  // get method start
  getPettycashData(){
    this.ps.getData().subscribe((response)=>{
        if(response.success){
          this.showPettyCash =response.message
          console.log(this.showPettyCash);
          this.showPettyCash = this.showPettyCash.filter((response) => Object.keys(response).length !==0);
          this.loading=false;
          this.load=true;
        }
      }
    );
  }
  // get method End
  pettcashValidations(){
    this.myPettycash = this.fb.group({
      name:['', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z_-]"), Validators.maxLength(10)]],
      subject:['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(10)]],
      description:['', [Validators.required], Validators.pattern(".*\\S.*[a-zA-z_-]")],
      date:['',[Validators.required]],
      amount:['',[Validators.required]],
      bill:['']
    });
  }
  onselectFile(event:any) {
    if(event.target.files.length > 0){
      this.fileData = event.target.files[0];
    }
  }
  removeFilePreview(){
    this.url = undefined;
    this.fileInput.nativeElement.value = null;
    this.delete = false;
  }
  confirm(){
    this.submitted=true;
    if (this.myPettycash.invalid){
      return
    }else {
      const expe = new addPettyCashList();
      expe.name = this.myPettycash.get('name')?.value;
      expe.subject = this.myPettycash.get('subject')?.value;
      expe.description = this.myPettycash.get('description')?.value;
      expe.date = this.myPettycash.get('date')?.value;
      expe.amount = this.myPettycash.get('amount')?.value;
      this.ps.postData(expe).subscribe(x=>{
        if (x.success){
          console.log(x.message);
          this.submitted = false;
          this.myPettycash.get('bill').setValidators([Validators.required]);
          this.myPettycash.get('bill').updateValueAndValidity();
          this.toastService.success('saved successfully', 'success', {duration:1500})
          this.loadbill=true;
          this.ReadOnly=true;
          this.confirmBTN=true;
          this.getPettycashData();
          this.PettycashId= x.message._id;
          console.log(this.PettycashId);
        }else {
          this.toastService.danger('Failed to save', 'Error', {duration:1500})
        }
      },error => {
        this.toastService.danger('error', 'Error', {duration:1500})
      })
    }
  }

  save(){
    this.submitted = true;
    if (this.myPettycash.invalid) {
      return;
    }
    else {
      const formData = new FormData();
      formData.append('bill', this.fileData)
      this.ps.CreateBill(this.PettycashId, formData).subscribe(response=>{
        if(response.success){
          this.toastService.success('Petty Cash success', 'success', {duration:1500})
          this.submitted = false;
          this.PettycashId = response.message;
          console.log(response.message)
          this.myPettycash.reset();
        }else {
          this.toastService.danger('failed to data', 'Error', {duration:1500})
        }
        },(error)=>{
        this.toastService.danger('Failed to petty Cash', 'Error', {duration:1500})
        })
    }
  };
  petty(dialog: TemplateRef<any>, ex: any) {
    this.dailogservice.open(dialog, { context: ex });
  }

  pettycashFleDownload(a:string){
    this.billId = a
    this.ps.getPettyCashBill(this.billId).subscribe(y=> {
      const url = window.URL.createObjectURL(y);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bill_image.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  showPettyFile(image:any,ex:string){
    this.dailogservice.open(image);
    this.ps.getPettyCashBill(ex).subscribe(x=>{
      const url = window.URL.createObjectURL(x);
      this.billImageUrl = url;
      // this.ImagePettyUrl = !this.ImagePettyUrl
    });
  }

  exportPettyExcel(){
    const fileName = 'PettyCash.xlsx';
    const worksheetName = 'Sheet1';
    const table = document.getElementById('exportTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, worksheetName);
    XLSX.writeFile(wb, fileName);
  }
}
