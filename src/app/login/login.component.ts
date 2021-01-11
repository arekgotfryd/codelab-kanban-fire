import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
// import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ui: firebaseui.auth.AuthUI;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(firebase);
    const uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod:
            firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
        signInFailure: this.onLoginFailure.bind(this),
      },
    };
    console.log(uiConfig);
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
   }else {
     firebase.app(); // if already initialized, use that one
    }
    // firebase.initializeApp(environment.firebase);
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  onLoginSuccessful = (authResult: any) => {
    console.log(authResult);
    this.router.navigateByUrl('/home');
  };

  onLoginFailure = (code: string) => {
    console.log(code);
  };
}
