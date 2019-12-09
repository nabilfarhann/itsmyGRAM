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
      <Paste your Firebase Config here>
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
