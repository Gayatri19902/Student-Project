import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccessList, AccessListId} from "../DTO/access";
import {NbToastrService} from "@nebular/theme";
import {AccessService} from "../access/access.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-show-access',
  templateUrl: './show-access.component.html',
  styleUrls: ['./show-access.component.scss']
})
export class ShowAccessComponent implements OnInit{
  submitted = false;
  MyAccessForm: FormGroup;
  loading = true;
  items = [
    {name:'student', isChecked:false},
    {name:'expenditure', isChecked:false},
    {name:'pettyCash', isChecked:false},
    {name:'installments', isChecked:false},
  ];
  accessItems: string [] = [];
  showAccess: AccessListId;
  showAccessId: string;
  isChecked = false;


  get Ac() {
    return this.MyAccessForm.controls
  }
  constructor(private fb:FormBuilder,
              private Toast:NbToastrService,
              private access:AccessService,
              private route:ActivatedRoute,
              private router: Router,
             ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(x=>{
      this.showAccessId = x.id;
      console.log(this.showAccessId);
    });
   this.checkUser();
    this.initWithoutAccessData();
  }

  checkUser() {
    if (localStorage.getItem('user') !== null) {
      this.getUserDetailsId();
    } else {
      this.router.navigate(['/']);
    }
  }

  getUserDetailsId(){
   if(this.showAccessId !== undefined) {
    this.access.getUser(this.showAccessId).subscribe( x => {
      if (x.success) {
        this.showAccess =  x.message;
        console.log(x.message);
        this.accessItems = [];
        x.message.permissions.forEach(x=> {
         this.items.forEach(y=> {
            if (x == y.name) {
              y.isChecked = true;
              this.accessItems.push(y.name)
            }
          });
        })
        // @ts-ignore
         this.initWithAccessData(this.showAccess);
       }
     });
   }
  }

  initWithoutAccessData() {
    this.MyAccessForm = this.fb.group({
      name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Role: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      selectedItems: this.fb.array([]),
    });
  }

  initWithAccessData(data:AccessListId)  {
    this.MyAccessForm = this.fb.group({
      name: [data.name, [Validators.required]],
      Email: [data.email, [Validators.required]],
      Role: [data.userType, [Validators.required]],
      designation: [data.userType, [Validators.required]],
      selectedItems: this.fb.array([]),
    });
  }
  onCheckChange(event: any, itemValue: string) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.accessItems.push(itemValue);
      console.log(this.accessItems, 'added')
    } else {
      this.accessItems = this.accessItems.filter(x  => x !== itemValue);
      console.log(this.accessItems, 'remove')
    }
  }

  save(){
    this.submitted= true;
    this.loading=true;
    if (this.MyAccessForm.invalid){
      return;
    }else {
      const Data = new AccessList();
      Data.name = this.MyAccessForm.get('name').value;
      Data.email = this.MyAccessForm.get('Email').value;
      Data.userType = this.MyAccessForm.get('Role').value;
      Data.userType = this.MyAccessForm.get('designation').value;
      Data.permissions = this.accessItems;
      if (this.accessItems.length > 0) {
        this.access.permissionData(this.showAccessId, Data).subscribe(x => {
          if (x.success) {
            this.Toast.success('Successfully Updated', 'Success', {duration: 1500})
            console.log(x.message)
            this.loading = false;
            this.router.navigate(['/dashboard/access']);
          } else {
            this.Toast.danger('Failed to get data', 'Error', {duration: 1500})
          }
        }, error => {
          this.Toast.danger('error', 'Error', {duration: 1500})
        });
      }else {
        this.Toast.danger('Select the Access Items', 'Access Items', {duration: 1500})
      }
    }
  }


}
