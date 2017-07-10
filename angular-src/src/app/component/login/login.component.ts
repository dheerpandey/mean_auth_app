import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    username:string;
    password:string;

    constructor(private flashMessageService: FlashMessagesService ,
    private router: Router,
    private validationService : ValidateService,
    private authService : AuthService)
    {

    }
    
    ngOnInit(){

    }

    onLoginSubmit()
    {
        const credential = {
            username : this.username,
            password : this.password
        };
        console.log('Submit button clicked.Data=> ${user}');

        if(!this.validationService.validateCredentials(credential))
        {
            this.flashMessageService.show("Please supply credentials.", {cssClass : 'alert-danger',clearTimeout :3000});
        }else
        {
            this.authService.signIn(credential).subscribe(data =>
            {
                if(data.success)
                {
                    this.authService.storeUserData(data.token, data.user);
                    this.router.navigate(['dashboard']);    
                }else{
                    this.flashMessageService.show(data.msg, {cssClass : 'alert-danger',clearTimout: 3000});
                    this.router.navigate(['/login']);
                }
            });
        }  
    }
}