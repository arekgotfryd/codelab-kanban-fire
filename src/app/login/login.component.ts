import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
// import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ui: firebaseui.auth.AuthUI;

  ngOnInit(): void {
    console.log(firebase)
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
      }
    }
    console.log(uiConfig)
    firebase.initializeApp(environment.firebase)
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start("#firebaseui-auth-container",uiConfig);
  }

  onLoginSuccessful = () => {

  }

}
