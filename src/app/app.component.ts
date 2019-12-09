import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';
import { IosInstallComponent } from './ios-install/ios-install.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private toast: MatSnackBar){ }

  title = 'photo-lib';

  ngOnInit(){

    const config = {
      apiKey: "AIzaSyBkkFFNJUm1VIKL_eM9W0Ckbe-H9WF2RBY",
      authDomain: "photolib-27e7e.firebaseapp.com",
      databaseURL: "https://photolib-27e7e.firebaseio.com",
      projectId: "photolib-27e7e",
      storageBucket: "photolib-27e7e.appspot.com",
      messagingSenderId: "173087680831"
    };
    firebase.initializeApp(config);

    // Detects if device is on iOS 
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      setTimeout(() =>
      this.toast.openFromComponent(IosInstallComponent, { 
        duration: 8000,
        horizontalPosition: 'start', 
        panelClass: ['mat-elevation-z3'] 
      })
      );
    }
  }
  
}