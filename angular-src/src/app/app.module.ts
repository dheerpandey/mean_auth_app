import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ValidateService} from './services/validate.service';



const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component:ProfileComponent},
  {path:'dashboard', component:DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
