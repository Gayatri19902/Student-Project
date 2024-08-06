import {Component, OnInit} from '@angular/core';
import {AccessListId, UpdateUser} from "../DTO/access";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccessService} from "../access/access.service";
import {SignUpService} from "../core/sign-up/sign-up.service";
import {NbToastrService} from "@nebular/theme";
import {SettingsService} from "./settings.service";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  load = false;
  settingForm: FormGroup
  loading = true;
  submitted = false;
  userId: string;
  settingId: any;
  ReadOnly = false;
  fileData: any;
  profile: string = '/assets/img.png';
  userUpdateId: string;

  // userData: UpdateUser;
  get setting() {
    return this.settingForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private accessService: AccessService,
    private signUpService: SignUpService,
    private toast: NbToastrService,
    private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.initWithoutSetData();
    const user = JSON.parse(localStorage.getItem('user'))
    this.userId = user._id
    this.getUserDetailsId();
    this.getUProfile()
  }

  getUserDetailsId() {
    if (this.userId !== undefined) {
      this.accessService.getUser(this.userId).subscribe(x => {
        if (x.success) {
          this.settingId = x.message;
          this.ReadOnly = true;
          this.loading = false
          console.log(x.message)
          // @ts-ignore
          this.initWithSetData(this.settingId);
        }
      });
    }
  }

  getUProfile() {
    this.signUpService.getProfile(this.userId).subscribe(
      (profileBlob: Blob) => {
        const url = window.URL.createObjectURL(profileBlob);
        if (profileBlob.size > 0) {
          this.profile = url;
        } else {
          this.profile = '/assets/img.png';
        }
      },
      (error) => {
        console.error('Error fetching profile:', error);
      });
  }

  initWithoutSetData() {
    this.settingForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      Role: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      bill: ['']
    });
  }

  initWithSetData(data: AccessListId) {
    this.settingForm = this.fb.group({
      name: [data.name, [Validators.required]],
      email: [data.email, [Validators.required]],
      Role: [data.userType, [Validators.required]],
      designation: [data.userType, [Validators.required]],
      bill: ['']
    });
  }

  onselectFile(event: any) {
    if (event.target.files.length > 0) {
      this.fileData = event.target.files[0];
    }
  }

  // updateUser() {
  //   this.submitted = true
  //   if (this.settingForm.invalid) {
  //     return
  //   } else {
  //     const user = new UpdateUser()
  //     user.name = this.settingForm.get("name").value;
  //     user.email = this.settingForm.get("email").value;
  //     this.settingsService.updateUser(this.userId, user).subscribe(res => {
  //       if (res.success) {
  //         console.log(res.message)
  //         this.toast.success('Update', 'Update successfully', {duration: 2000});
  //         this.submitted = false;
  //       } else {
  //         this.toast.danger('Failed', 'Update Failed', {duration: 2000})
  //       }
  //     }, error => {
  //       this.toast.danger(error, 'Error', {duration: 2000})
  //     });
  //   }
  // }


updateUser() {
  this.submitted = true;

  if (this.settingForm.invalid) {
    return;
  } else {
    const user = new UpdateUser();
    user.name = this.settingForm.get("name").value;
    user.email = this.settingForm.get("email").value;

    const formData = new FormData();
    formData.append('image', this.fileData);

    console.log(this.fileData);
    console.log(this.userId, formData);

    // Make two API calls simultaneously using forkJoin
    forkJoin([
      this.settingsService.updateProfile(this.userId, formData),
      this.settingsService.updateUser(this.userId, user)
    ]).subscribe(
      ([profileRes, userRes]) => {
        if (profileRes && profileRes.hasOwnProperty('success')) {
          if (profileRes.success) {
            console.log('Profile update success:', profileRes.message);
          } else {
            console.error('Profile update failed:', profileRes);
          }
        } else {
          console.error('Invalid response format for profile update:', profileRes);
        }

        // Check for success status in userRes
        if (userRes && userRes.hasOwnProperty('success')) {
          if (userRes.success) {
            console.log('User update success:', userRes.message);
            this.toast.success('Update', 'Update successfully', { duration: 2000 });
            this.submitted = false;
          } else {
            console.error('User update failed:', userRes);
            this.toast.danger('Failed', 'Update Failed', { duration: 2000 });
          }
        } else {
          console.error('Invalid response format for user update:', userRes);
        }
      },
      (error) => {
        this.toast.danger(error.message || 'Server Error', 'Error', { duration: 2000 });
      }
    );
  }
}



}
