import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ForgotpageComponent } from './forgotpage/forgotpage.component';
import {
    NbButtonModule,
    NbCardModule,
    NbFormFieldModule, NbIconModule,
    NbInputModule,
    NbLayoutModule, NbSelectModule,
    NbSpinnerModule
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";
import { SignUpComponent } from './sign-up/sign-up.component';
@NgModule({
  declarations: [
    LoginpageComponent,
    ForgotpageComponent,
    SignUpComponent,
  ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        NbLayoutModule,
        NbInputModule,
        ReactiveFormsModule,
        NbButtonModule,
        NbCardModule,
        NbSpinnerModule,
        NbFormFieldModule,
        NbIconModule,
        NbSelectModule
    ]
})
export class CoreModule { }
