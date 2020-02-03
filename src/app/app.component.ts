import { Component } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Route } from '@angular/compiler/src/core';
import {Router , ActivatedRoute} from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginServiceService } from './Services/login-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authentication';
  authWindow: Window;
   failed: boolean;
   error: string;
   errorDescription: string;
   isRequesting: boolean;
  params = new Array<string>();
  loginclicked = false;
  constructor(private router: Router, private loginService: LoginServiceService) {
    this.loginService.authenticated.subscribe(auth => {
      console.log('event value', auth);
      if (auth === true) {
        console.log('event true');
        this.getTokenFromFb();
      }
    });
  }
  login() {
      console.log('inside login');
      this.loginclicked = true;
    // tslint:disable-next-line:max-line-length
      this.authWindow = window.open('https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=116007913084220&display=popup&redirect_uri=https://localhost:4200/facebook-auth&scope=email', null, 'width=600,height=400');
      this.authWindow.addEventListener('load', this.handleMessage.bind(this), false);
  }
   getTokenFromFb() {
     if (this.loginclicked) {
      console.log('path', this.authWindow.location.hash);
      this.params = this.authWindow.location.hash.split('=').join(', ').split('&').join(', ').split(', ');
      console.log('params', this.params);
      this.loginService.getAppAccessToken(this.params[1]).subscribe(data => {
          console.log('success', data);
        });
     }
   }


   handleMessage(event: Event) {
     console.log('inside handler');
     if (window.origin === 'https://localhost:4200') {
        console.log('close window');
        this.loginService.pushAuthenticate(true);
        this.authWindow.close();
     } else {
       console.log('another window');
     }
    }

    myfunc() {
      console.log('change');
    }
  }
