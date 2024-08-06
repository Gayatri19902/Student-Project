import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import * as XLSX from "xlsx";
import {ConservationService} from "./conservation.service";
import {addConservation, consevationList} from "../DTO/conservation";

@Component({
  selector: 'app-conservation',
  templateUrl: './conservation.component.html',
  styleUrls: ['./conservation.component.scss']
})
export class ConservationComponent implements OnInit{
  conservationForm! :FormGroup;
  submitted = false;
  load=false;
  loading=true;
  showConservation:consevationList[] =[];
  conservationBillId:addConservation;
  conservationId: string;
  url:any;
  delete= false;
  loadbill = false;
  ReadOnly= false;
  confirmBTN= false;
  fileData : any;
  billId: string;
  billImageUrl: string;
  ImageUrl: boolean;

  @ViewChild('fileInput') fileInput!:ElementRef<any>
  constructor(
    private fb: FormBuilder,
    private conservationService: ConservationService,
    private dailogservice:NbDialogService,
    private toast:NbToastrService,
    private router:Router,) {}
// getdata start
  ngOnInit(): void {
    this.conservationValidation();
    this.checkUser();
  }

  checkUser(){
    if(localStorage.getItem('user') !== null) {
      this.getConservData();
    }else {
      this.router.navigate(['/']);
    }
  }

  getConservData(){
    this.conservationService.getData().subscribe((response)=> {
      if(response.success) {
        this.showConservation =response.message
        console.log(this.showConservation);
        this.showConservation = this.showConservation.filter((response) => Object.keys(response).length !==0);
        this.loading=false;
        this.load=true;
      }
    });
  }

  conservationBill(a:string){
    this.billId = a
    this.conservationService.GetConservationBill(this.billId).subscribe(y=> {
      const url = window.URL.createObjectURL(y);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bill_image.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

// getdata End
  conservationValidation(){
    this.conservationForm = this.fb.group({
      name:['', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z_-]"), Validators.maxLength(10)]],
      subject:['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(10)]],
      description:['', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z_-]")]],
      date:['',[Validators.required,]],
      amount:['',[Validators.required]],
      bill:['',]
    });
  }

  // file upload start
  onselectFile(event:any) {
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileData = file;
    }
  }
  removeFilePreview(){
    this.url = undefined;
    this.fileInput.nativeElement.value = null;
    this.delete = false;
  }
// file upload End

  // Postdata start
  confirm(){
    this.submitted=true;
    if (this.conservationForm.invalid){
      return
    }else {
      const expe = new addConservation();
      expe.name = this.conservationForm.get('name')?.value;
      expe.subject = this.conservationForm.get('subject')?.value;
      expe.description = this.conservationForm.get('description')?.value;
      expe.date = this.conservationForm.get('date')?.value;
      expe.amount = this.conservationForm.get('amount')?.value;
      this.conservationService.postData(expe).subscribe(x=>{
        if (x.success){
          console.log(x.message);
          this.submitted = false;
          this.conservationForm.get('bill').setValidators([Validators.required]);
          this.conservationForm.get('bill').updateValueAndValidity();
          this.toast.success('saved successfully', 'success', {duration:1500})
          this.loadbill=true;
          this.ReadOnly=true;
          this.confirmBTN=true;
          this.getConservData();
          this.conservationId= x.message._id;
          console.log(this.conservationId);
        }else {
          this.toast.danger('Failed to save', 'Error', {duration:1500})
        }
      },error => {
        this.toast.danger('error', 'Error', {duration:1500})
      });
    }
  }

  save(){
    this.submitted = true;
    if(this.conservationForm.invalid){
      return;
    }
    else {
      const formData = new FormData();
      formData.append('bill', this.fileData);
      console.log(this.fileData);
      console.log(this.conservationId, formData);
      this.conservationService.CreateBill(this.conservationId, formData).subscribe( response => {
        if(response.success) {
          this.toast.success('Saved to data successfully', 'success', {duration:1500});
          this.submitted = false;
          this.conservationId = response.message;
          this.conservationForm.reset();
        }else {
          this.toast.danger('failed to data', 'Error', {duration:1500})
        }
      },error => {
        this.toast.danger('error', 'Error', {duration:1500})
      });
    }
  }
  // postdata End

  // dailogform start
  exp(dialog: TemplateRef<any>, a: any) {
    this.dailogservice.open(dialog, { context: a });
  }
// dailogform end
  exportToExcel(): void {
    const fileName = 'Expenditure.xlsx';
    const worksheetName = 'Sheet1';
    const table = document.getElementById('exportTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, worksheetName);
    XLSX.writeFile(wb, fileName);
  }

  showFile(image:any,ex:string) {
    this.dailogservice.open(image);
    this.conservationService.GetConservationBill(ex).subscribe(x=>{
      const url = window.URL.createObjectURL(x);
      this.billImageUrl = url;
      // this.ImageUrl = !this.ImageUrl
    });
  }


}
