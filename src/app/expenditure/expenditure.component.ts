import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenditureService} from "./expenditure.service";
import {addExpenditureData, ExpeditureList} from "../DTO/expediture";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss']
})
export class ExpenditureComponent implements OnInit {
  myExpenditure!: FormGroup;
  submitted = false;
  load = false;
  loading = true;
  showExpenditure: ExpeditureList[] = [];
  ExpenditureBillId: addExpenditureData;
  ExpenditureId: string;
  url: any;
  delete = false;
  loadbill = false;
  ReadOnly = false;
  confirmBTN = false;
  fileData: any;
  billId: string;
  billImageUrl: string;
  ImageUrl: boolean;

  @ViewChild('fileInput') fileInput!: ElementRef<any>

  constructor(
    private fb: FormBuilder,
    private expenditureService: ExpenditureService,
    private dailogservice: NbDialogService,
    private toast: NbToastrService,
    private router: Router) {}

// getdata start
  ngOnInit(): void {
    this.expenditureValidation();
    this.checkUser();
  }

  checkUser() {
    if (localStorage.getItem('user') !== null) {
      this.getExpenData();
    } else {
      this.router.navigate(['/']);
    }
  }

  getExpenData() {
    this.expenditureService.getData().subscribe((response) => {
      if (response.success) {
        this.showExpenditure = response.message
        console.log(this.showExpenditure);
        this.showExpenditure = this.showExpenditure.filter((response) => Object.keys(response).length !== 0);
        this.loading = false;
        this.load = true;
      }
    });
  }

  ExpenditureBill(a: string) {
    this.billId = a
    this.expenditureService.GetExpenditureBill(this.billId).subscribe(y => {
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
  expenditureValidation() {
    this.myExpenditure = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z_-]"), Validators.maxLength(10)]],
      subject: ['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z_-]")]],
      date: ['', [Validators.required,]],
      amount: ['', [Validators.required]],
      bill: ['',]
    });
  }

  // file upload start
  onselectFile(event: any) {
    if (event.target.files.length > 0) {
      this.fileData = event.target.files[0];
    }
  }

  removeFilePreview() {
    this.url = undefined;
    this.fileInput.nativeElement.value = null;
    this.delete = false;
  }

// file upload End

  // Postdata start
  confirm() {
    this.submitted = true;
    if (this.myExpenditure.invalid) {
      return
    } else {
      const expe = new addExpenditureData();
      expe.name = this.myExpenditure.get('name')?.value;
      expe.subject = this.myExpenditure.get('subject')?.value;
      expe.description = this.myExpenditure.get('description')?.value;
      expe.date = this.myExpenditure.get('date')?.value;
      expe.amount = this.myExpenditure.get('amount')?.value;
      this.expenditureService.postExpenditureData(expe).subscribe(x => {
        if (x.success) {
          console.log(x.message);
          this.submitted = false;
          this.myExpenditure.get('bill').setValidators([Validators.required]);
          this.myExpenditure.get('bill').updateValueAndValidity();
          this.toast.success('saved successfully', 'success', {duration: 1500})
          this.loadbill = true;
          this.ReadOnly = true;
          this.confirmBTN = true;
          this.getExpenData();
          this.ExpenditureId = x.message._id;
          console.log(this.ExpenditureId);
        } else {
          this.toast.danger('Failed to save', 'Error', {duration: 1500})
        }
      }, error => {
        this.toast.danger('error', 'Error', {duration: 1500})
      });
    }
  }

  save() {
    this.submitted = true;
    if (this.myExpenditure.invalid) {
      return;
    } else {
      const formData = new FormData();
      formData.append('bill', this.fileData);
      console.log(this.fileData);
      console.log(this.ExpenditureId, formData);
      this.expenditureService.CreateBill(this.ExpenditureId, formData).subscribe(response => {
        if (response.success) {
          this.toast.success('Saved to data successfully', 'success', {duration: 1500});
          this.submitted = false;
          this.ExpenditureId = response.message;
          this.myExpenditure.reset();
        } else {
          this.toast.danger('failed to data', 'Error', {duration: 1500})
        }
      }, error => {
        this.toast.danger('error', 'Error', {duration: 1500})
      });
    }
  }

  // postdata End

  // dailogform start
  exp(dialog: TemplateRef<any>, ex: any) {
    this.dailogservice.open(dialog, { context: ex });
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

  showFile(image: any, ex: string) {
    this.dailogservice.open(image);
    this.expenditureService.GetExpenditureBill(ex).subscribe(x => {
      this.billImageUrl = window.URL.createObjectURL(x);
      // this.ImageUrl = !this.ImageUrl
    });
  }
}
