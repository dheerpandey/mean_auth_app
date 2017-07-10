import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
selector : 'app-register',
templateUrl : './register.component.html',
styleUrls : ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
name:string;
username:string;
email:string;
password:string;

constructor(private validateservice: ValidateService,
            private flashMsg : FlashMessagesService,
            private authService : AuthService,
            private router : Router
            )
{

}

ngOnInit(){

}

onRegisterSubmit()
    {
        const user ={
            name:this.name,
            username:this.username,
            email:this.email,
            password:this.password
        };
    if(!this.validateservice.validateRegister(user))
    {
        this.flashMsg.show("Blank Fields", {cssClass: 'alert-danger', timeout:3000});
        return false;
    }

    if(!this.validateservice.validateEmail(user.email))
    {
        this.flashMsg.show('Incorrect Email Address.', {cssClass: 'alert-danger', timeout:3000});
        return false;
    }

   this.authService.registerUser(user).subscribe(data =>
   {
    if(data.success)
    {
        this.flashMsg.show('User added successfullly', {cssClass : 'alert-success', clearTimeout: 3000});
        this.router.navigate(['/login']);
         
    }else{
        this.flashMsg.show('Failed to added a new user',{cssClass: 'alert-danger', clearTimeout:3000});
        this.router.navigate(['/register']);        
    }
   });

    }
}