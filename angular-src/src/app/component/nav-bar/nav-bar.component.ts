import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService : AuthService, 
              private flashMessage : FlashMessagesService,
              private router : Router
            ) 
  { 

  }

  ngOnInit() {
  }

  onLogOutClick()
  {
    this.authService.logOut();
    this.flashMessage.show('You are logged out.', {cssClass :'alert-success', clearTimeout : 2000});
    this.router.navigate(['/login']);
  }

}
