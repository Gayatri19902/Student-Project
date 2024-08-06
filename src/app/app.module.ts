import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule,
    NbLayoutModule,
    NbCardModule,
    NbMenuModule,
    NbSidebarModule,
    NbInputModule,
    NbButtonModule,
    NbDialogModule,
    NbCheckboxModule,
    NbIconModule,
    NbFormFieldModule, NbSelectModule, NbDatepickerModule, NbToastrModule, NbSpinnerModule, NbTooltipModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {NgOptimizedImage} from "@angular/common";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StudentComponent } from './student/student.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { PettyCashComponent } from './petty-cash/petty-cash.component';
import { InstallmentsComponent } from './installments/installments.component';
import { HttpClientModule} from "@angular/common/http";
import {DataTablesModule} from "angular-datatables";
import { StudentFormComponent } from './student-form/student-form.component';
import { AccessComponent } from './access/access.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { ShowAccessComponent } from './show-access/show-access.component'
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {TokenInterceptorService} from "./core/forgotpage/token-interceptor.service";
import { SettingsComponent } from './settings/settings.component';
import { ConservationComponent } from './conservation/conservation.component';
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    SideNavComponent,
    StudentComponent,
    ExpenditureComponent,
    PettyCashComponent,
    InstallmentsComponent,
    StudentFormComponent,
    AccessComponent,
    ShowAccessComponent,
    SettingsComponent,
    ConservationComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: 'default'}),
        NbLayoutModule,
        NbEvaIconsModule,
        NgbModule,
        NbCardModule,
        NbMenuModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NgOptimizedImage,
        NbInputModule,
        ReactiveFormsModule,
        FormsModule,
        NbButtonModule,
        NbDialogModule.forRoot(),
        NbCheckboxModule,
        NbIconModule,
        NbFormFieldModule,
        NbSelectModule,
        NbDatepickerModule.forRoot(),
        NbInputModule,
        HttpClientModule,
        DataTablesModule,
        NbToastrModule.forRoot(),
        NbSpinnerModule,
        NgxDropzoneModule,
        NbTooltipModule,
        CoreModule,
        NbDialogModule.forRoot(),
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
