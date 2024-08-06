import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {addStudentList, AdmissionFeeData, InstallmentData, InstallmentsDTO, StudentById,forNotInstallments} from "../DTO/studentpage";
import {StudentpageService} from "../student/studentpage.service";
import {NbDialogService, NbMenuService, NbToastrService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  createStudForm: FormGroup;
  dataForm: FormGroup;
  AdmissionForm: FormGroup;
  submitted: boolean;
  openAdmission = false;
  openCommitmentFee = false;
  load = false;
  showDividedData: boolean = false;
  // @ts-ignore
  studentData: StudentDetails;
  getStudentData: StudentById[] = [];
  admissionData: AdmissionFeeData;
  paidDisabled = false;
  commitmentDisabled:boolean;
  checkboxDisabled = false;
  installmentDisabled = false;
  studentDisabled = false;
  loadStudentDetailsData: boolean;
  loading = true;
  studentBTNName: string = 'Create';
  checkBoxTwo : any;
  studentId: string;
  checkboxFlag:boolean=false;
  checkeValueFlag= false;
  checkeValueFlag1= false;
  showInstallment = false;
  checkValue:any;
  checkbox1Disabled = false;
  checkValue1:any;
  installments = [
    {Name: 'Installments Two', value: 'two'},
    {Name: 'Installments Three', value: 'three'},
  ]
  get csc(){
    return this.createStudForm.controls;
  }
  get cac(){
    return this.AdmissionForm.controls;
  }
  get cic(){
    return this.dataForm.controls;
  }
  constructor(private fb: FormBuilder,
              private nbDialogModel: NbDialogService,
              private studentService: StudentpageService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private toastrService: NbToastrService) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(x => {
      this.studentId = x.id;
    })
    this.checkUser();
  }
  checkUser(){
    if(localStorage.getItem('user') !== null){
      this.getStudentDetailsData();
    }else{
      this.router.navigate(['/']);
    }
  }
  getStudentDetailsData(){
    if (this.studentId !== undefined) {
      this.studentService.getStudentListById(this.studentId).subscribe(x => {
        if (x.success) {
          this.getStudentData = x.message;
          console.log(x.message)
          console.log(this.getStudentData)
          // @ts-ignore
          this.initStudentData(this.getStudentData);
          this.studentBTNName = 'Update';
          this.loadStudentDetailsData = true;
          this.studentDisabled = true;
          this.loading = false;
          console.log(this.getStudentData)
          // @ts-ignore
          if (this.getStudentData?.admissionFee === undefined){
            this.initWithoutAdmissionData();
          } else {
            const data = new AdmissionFeeData();
            // @ts-ignore
            data.admissionFee = this.getStudentData?.admissionFee;
            // @ts-ignore
            data.admissionFeePaid = this.getStudentData?.admissionFeePaid;
            this.initWithAdmissionData(data);
            this.openAdmission = true;
            this.paidDisabled = true;
            this.checkboxFlag = true;
            // @ts-ignore
            if (this.getStudentData?.commitmentFee === undefined){
              this.checkboxDisabled =true;
              this.initWithoutInstallmentData();
              this.initForm();
            } else {
              this.commitmentDisabled = true;
              // @ts-ignore
              console.log(this.getStudentData?.installment)
              // @ts-ignore
              this.dataForm = this.fb.group({
                // @ts-ignore
                commitmentFee: [this.getStudentData?.commitmentFee],
                // @ts-ignore
                installment: [{value: this.getStudentData?.installment, disabled: true}],
                installment1: [0],
                installment2: [0],
                installment3: [0],
                // @ts-ignore
                checkbox1:[{value: this.getStudentData?.installment, disabled: true}],
                // @ts-ignore
                checkbox2:[this.checkeValueFlag],
                // @ts-ignore
                checkbox3:[this.checkeValueFlag1]
              })
              // @ts-ignore
              if(this.getStudentData?.installmentTwo?.paid == true) {
                this.dataForm.get('checkbox2').setValue(true);
                this.dataForm.get('checkbox3')?.setValue(false);
                this.dataForm.get('checkbox2')?.disable();
              }else{
                this.dataForm.get('checkbox2').setValue(false);
              }
              // @ts-ignore
              if(this.getStudentData?.installmentThree?.paid == true){
                console.log('checked3')
                this.dataForm.get('checkbox2').setValue(true);
                this.dataForm.get('checkbox3')?.setValue(true);
                this.dataForm.get('checkbox3')?.disable();
              }else{
                this.dataForm.get('checkbox3')?.setValue(false);
              }
              // @ts-ignore
              if (this.getStudentData?.installment === true) {
                // @ts-ignore
                const commitmentFee = this.getStudentData?.commitmentFee;
                console.log(commitmentFee)
                const dividedValue = commitmentFee / 3;
                this.dataForm.patchValue({
                  installment1: dividedValue.toFixed(1),
                  installment2: dividedValue.toFixed(1),
                  installment3: dividedValue.toFixed(1),
                });
              }
              // @ts-ignore
              if(this.getStudentData.installment === 2){
                this.dataForm.get('installment').setValue(this.installments[0].value);
                // this.dataForm.get('checkbox2').setValue(!this.checkeValueFlag);
                // this.dataForm.get('checkbox3').setValue(this.checkeValueFlag1);
                this.showInstallment = false;
                const commitmentFee = this.dataForm.get('commitmentFee').value;
                const dividedValue = commitmentFee / 2;
                if (commitmentFee > 0) {
                  this.showDividedData = true;
                  this.dataForm.patchValue({
                    installment1: dividedValue.toFixed(1),
                    installment2: dividedValue.toFixed(1),
                    installment3: 0,
                  });
                }
                this.showDividedData = true;
                this.installmentDisabled = true;
                // @ts-ignore
              }   else if(this.getStudentData.installment === 3) {
                this.dataForm.get('installment').setValue(this.installments[1].value);
                // this.dataForm.get('checkbox2').setValue(!this.checkeValueFlag);
                // this.dataForm.get('checkbox3').setValue(!this.checkeValueFlag1);
                this.showInstallment = true;
                const commitmentFee = this.dataForm.get('commitmentFee').value;
                const dividedValue = commitmentFee / 3;
                if (commitmentFee > 0) {
                  this.showDividedData = true;
                  this.dataForm.patchValue({
                    installment1: dividedValue.toFixed(1),
                    installment2: dividedValue.toFixed(1),
                    installment3: dividedValue.toFixed(1),
                  });

                }
              } else {
                this.dataForm.get('installment').setValue('None');
                const d = 0;
                this.dataForm.patchValue({
                  installment1: d.toFixed(0),
                  installment2: d.toFixed(0),
                  installment3: d.toFixed(0),
                });
              }
              this.openCommitmentFee = true;
            }
          }
        }
      })
    }
    else {
      this.studentBTNName = 'Create';
      this.loading = false;
      this.initWithoutStudentData();
    }
  }

  initForm() {
    this.dataForm = this.fb.group({
      commitmentFee: ['',[Validators.required]],
      installment:[''],
      installment1: [''],
      installment2: [''],
      installment3: [''],
      checkbox1: [],
      checkbox2: [],
      checkbox3: []
    });
    this.dataForm.get('commitmentFee').valueChanges.subscribe(() => {
      this.showDividedData = false;
    });
  }
  onCheckboxChange(event: string) {
    this.showDividedData = true;
    if(event === 'three') {
      this.showInstallment = true;
      const commitmentFee = this.dataForm.get('commitmentFee').value;
      const dividedValue = commitmentFee / 3;
      if (commitmentFee > 0) {
        this.dataForm.patchValue({
          installment1: dividedValue.toFixed(1),
          installment2: dividedValue.toFixed(1),
          installment3: dividedValue.toFixed(1),
        });
      }
    }else if (event === 'two'){
      this.showInstallment = false;
      const commitmentFee = this.dataForm.get('commitmentFee').value;
      const dividedValue = commitmentFee / 2;
      if (commitmentFee > 0) {
        this.showDividedData = true;
        this.dataForm.patchValue({
          installment1: dividedValue.toFixed(1),
          installment2: dividedValue.toFixed(1),
          installment3: 0,
        });
      }
    }else {
      this.showDividedData = false;
      this.showInstallment = false;
      const d = 0;
      this.dataForm.patchValue({
        installment1: d.toFixed(0),
        installment2: d.toFixed(0),
        installment3: d.toFixed(0),
      });
    }
  }

  changeInstallment(event: any){
    console.log(event.target.value)
    if (this.showDividedData === true){
      if (event.target.value !== '' && event.target.value > 0){
        const commitmentFee = this.dataForm.get('commitmentFee').value;
        const dividedValue = commitmentFee / 3;
        if (commitmentFee > 0){
          this.dataForm.patchValue({
            installment1: dividedValue.toFixed(1),
            installment2: dividedValue.toFixed(1),
            installment3: dividedValue.toFixed(1),
          });
        }
      } else {
        const d = 0;
        this.dataForm.patchValue({
          installment1: d.toFixed(0),
          installment2: d.toFixed(0),
          installment3: d.toFixed(0),
        });
      }
    }
  }
  initWithoutStudentData(){
    this.createStudForm = this.fb.group({
      admissionNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surName: ['', [Validators.required]],
      fathersName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      group: ['', [Validators.required]],
      medium: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
    this.loadStudentDetailsData = true;
  }
  initStudentData(d: StudentById){
    console.log(d)
    this.createStudForm = this.fb.group({
      admissionNumber: [d.admissionNumber, [Validators.required]],
      name: [d.name, [Validators.required]],
      surName: [d.surName, [Validators.required]],
      fathersName: [d.fathersName, [Validators.required]],
      mobileNumber: [d.mobileNumber, [Validators.required]],
      group: [d.group, [Validators.required]],
      medium: [d.medium, [Validators.required]],
      address: [d.address, [Validators.required]],
    })
  }
  changeDataForStudent(){
    if (this.studentBTNName === 'Create'){
      this.createStudent();
    } else {
      this.updateStudent()
    }
  }

  createStudent(){
    this.submitted = true;
    if(this.createStudForm.invalid){
      return;
    } else {
      const data = new addStudentList();
      data.admissionNumber = this.createStudForm.get('admissionNumber').value;
      data.name = this.createStudForm.get('name').value;
      data.surName = this.createStudForm.get('surName').value;
      data.fathersName = this.createStudForm.get('fathersName').value;
      data.mobileNumber = this.createStudForm.get('mobileNumber').value;
      data.group = this.createStudForm.get('group').value;
      data.medium = this.createStudForm.get('medium').value;
      data.address = this.createStudForm.get('address').value;
        this.studentService.createStudentDetails(data).subscribe(x => {
        if(x.success){
          this.toastrService.success('Student Data Created successfully','Student Creation',{duration:2000});
          this.submitted = false;
          this.studentDisabled = true;
          // console.log(x.message);
          this.studentData = x.message;
          this.studentId = this.studentData._id;
          this.initStudentData(x.message);
          this.initWithoutAdmissionData();
          this.studentBTNName = 'Update'
        }
        else{
          this.toastrService.danger('Failed To Create Student Details.','Student Creation',{duration:2000});
        }
      },error => {
        this.toastrService.danger(error,'Student Creation',{duration:2000});
      })
    }
  }
  updateStudent(){
    this.submitted = true;
    if(this.createStudForm.invalid){
      return;
    } else {
      const data = new addStudentList();
      data.admissionNumber = this.createStudForm.get('admissionNumber').value;
      data.name = this.createStudForm.get('name').value;
      data.surName = this.createStudForm.get('surName').value;
      data.fathersName = this.createStudForm.get('fathersName').value;
      data.mobileNumber = this.createStudForm.get('mobileNumber').value;
      data.group = this.createStudForm.get('group').value;
      data.medium = this.createStudForm.get('medium').value;
      data.address = this.createStudForm.get('address').value;
      this.studentService.UpdateStudentData(data, this.studentId).subscribe(x =>{
        if(x.success){
          this.toastrService.success('Student Data Updated successfully','Student Creation',{duration:2000});
          this.submitted = false;
          this.studentDisabled = true;
          this.installmentDisabled = true;
          console.log(x.message)
          this.studentData = x.message;
          this.router.navigate(["/dashboard/student"]);
        }
        else{
          this.toastrService.danger('Failed To Update Student Details.','Student Creation',{duration:2000});
        }
      },error => {
        this.toastrService.danger(error,'Student Updation',{duration:2000});
      })
    }
  }
  initWithoutAdmissionData(){
    this.AdmissionForm = this.fb.group({
      admissionFee:['',[Validators.required]],
      admissionFeePaid:[false],
    })
    this.openAdmission = true;
  }
  initWithAdmissionData(data: AdmissionFeeData){
    this.AdmissionForm = this.fb.group({
      admissionFee:[data.admissionFee,[Validators.required]],
      admissionFeePaid:[data.admissionFeePaid],
    })
  }
  paid() {
    this.submitted = true;
    if(this.AdmissionForm.invalid){
      return;
    }
    else{
      const admData = new AdmissionFeeData();
      admData.admissionFee = this.AdmissionForm.get("admissionFee")?.value;
      admData.admissionFeePaid = true;
      this.studentService.AdmissinFeeData(admData, this.studentId).subscribe(x => {
        if(x.success){
          console.log(x.message);
          this.toastrService.success('Admission Fee Details is Added Successfully','Admission Fee Details',{duration:2000});
          this.submitted = false;
          this.paidDisabled = true;
          // this.initWithAdmissionData(x.message);
          this.initForm();
          this.initWithoutInstallmentData();
        }
        else{
          this.initWithoutAdmissionData();
          this.toastrService.danger('Failed To Added Admission Fee Details.','Admission Fee Details',{duration:2000});
        }
      },error => {
        this.toastrService.danger(error,'Admission Details',{duration:2000});
      })
    }
  }
  initWithoutInstallmentData(){
    this.dataForm = this.fb.group({
      commitmentFee: ['',[Validators.required]],
      installment1: [''],
      installment2: [''],
      installment3: [''],
      installment:  [false],
    })
    this.openCommitmentFee = true;
  }
  initWithInstallmentData(data:InstallmentData){
    this.dataForm = this.fb.group({
      commitmentFee: [data.commitmentFee, [Validators.required]],
      installment1: [data.installment, [Validators.required]],
      installment2: [data.installment, [Validators.required]],
      installment3: [data.installment, [Validators.required]],
      installment:  [data.installment],
    })
  }
  createInstallment() {
    this.submitted = true;
    if (this.dataForm.invalid) {
      console.log(this.dataForm.get("commitmentFee").value, 'invalid')
      return;
    } else {
      console.log(this.dataForm.get("commitmentFee").value, 'valid')
      if (this.dataForm.get('commitmentFee').value !== ''){
        const installData = new forNotInstallments();
        installData.commitmentFee = this.dataForm.get("commitmentFee")?.value;
        console.log(this.dataForm.get("installment").value)
        console.log(this.dataForm.get("commitmentFee").value)
        if (this.dataForm.get("installment").value === false || this.dataForm.get("installment").value === ''
          || this.dataForm.get("installment").value === 'None') {
          installData.installment = 0;
          this.studentService.CommitmentFeeData(installData, this.studentId).subscribe(x => {
            if (x.success) {
              this.toastrService.success('Installments Details is Added Successfully', 'Installment Creation', {duration: 2000});
              this.submitted = false;
              this.openAdmission = false;
              this.showDividedData = false;
              this.openCommitmentFee = false;
              this.dataForm.reset();
              this.AdmissionForm.reset();
              this.createStudForm.reset();
              this.router.navigate(["/dashboard/student"])
            } else {
              this.toastrService.danger('Failed To Added Installment Details.', 'Installment Creation', {duration: 2000});
            }
          }, error => {
            this.toastrService.danger(error, 'Installment Details', {duration: 2000});
          })
        } else {
          const data = new InstallmentsDTO();
          if (this.dataForm.get("installment").value === 'two') {
            installData.installment = 2;
            data.installmentOne.due = Number(this.dataForm.get("installment1").value);
            data.installmentOne.paid = true;

            data.installmentTwo.due = Number(this.dataForm.get("installment2").value);
            data.installmentTwo.paid = false;

            data.installmentThree = null

          } else if (this.dataForm.get("installment").value === 'three') {
            installData.installment = 3;
            data.installmentOne.due = Number(this.dataForm.get("installment1").value);
            data.installmentOne.paid = true;

            data.installmentTwo.due = Number(this.dataForm.get("installment2").value);
            data.installmentTwo.paid = false;

            data.installmentThree.due = Number(this.dataForm.get("installment3").value);
            data.installmentThree.paid = false;
          }

          if(this.checkValue?.target?.checked){
            data.installmentTwo.due = Number(this.dataForm.get("installment2").value);
            data.installmentTwo.paid = true;
            data.installmentThree = null
          }else if (this.checkValue1?.target?.checked){
            data.installmentTwo.due = Number(this.dataForm.get("installment2").value);
            data.installmentTwo.paid = true;
            data.installmentThree.due = Number(this.dataForm.get("installment3").value);
            data.installmentThree.paid = true;
          }
          console.log(installData);
          console.log(data);
          this.studentService.CommitmentFeeData(installData, this.studentId).subscribe(x => {
            if (x.success) {
              this.studentService.CreateInstallmentPaid(data, this.studentId).subscribe(y => {
                if (y.success) {
                  this.submitted = false;
                  this.openAdmission = false;
                  this.showDividedData = false;
                  this.openCommitmentFee = false;
                  this.dataForm.reset();
                  this.AdmissionForm.reset();
                  this.createStudForm.reset();
                  this.toastrService.success('Installments Details is Added Successfully', 'Installment Creation', {duration: 2000});
                  this.router.navigate(["/dashboard/student"])
                }
              }, error => {
                this.toastrService.danger('Failed To Added Installment Details.', 'Installment Creation', {duration: 2000});
              })
            }
          }, error => {
            this.toastrService.danger('Failed To Added Installment Details.', 'Installment Creation', {duration: 2000});
          })
        }
      }else {
        this.toastrService.danger('Enter Commitment Fee', 'Commitment Fee', {duration: 2000});
      }
    }
  }
  checkBox(a:any){
    this.checkValue =a
    this.commitmentDisabled = !a.target.checked;
  }
  checkBox1(a:any){
    this.checkValue1 = a
    this.commitmentDisabled = !a.target.checked;
  }
  goBack() {
    // @ts-ignore
    this.location.back();
  }

}
