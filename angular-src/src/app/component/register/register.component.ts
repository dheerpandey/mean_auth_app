import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';

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

constructor(private validateservice: ValidateService, private flashMsg : FlashMessagesService){

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
        this.flashMsg.show("Blank Fields", {cssclass: 'alert-danger', timeout:3000});
        return false;
    }

    if(!this.validateservice.validateEmail(user.email))
    {
        this.flashMsg.show('Incorrect Email Address.', {cssclass: 'alert-danger', timeout:3000});
        return false;
    }
    }
}