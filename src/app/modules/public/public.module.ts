import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
