import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDVL-aDuXY9pKCUzSnrVugMBumgOEvxTME',
      authDomain: 'ng-recipe-book-8d5d7.firebaseapp.com'
    });
  }
}
