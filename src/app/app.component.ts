import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from "../pages/home/home";
import * as firebase from "firebase";
import {Environment} from "./app.environment.config";
import {AddItemPage} from "../pages/add-item/add-item";
import {WardrobePage} from "../pages/wardrobe/wardrobe";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  homePage = HomePage;
  addItemPage = AddItemPage;
  wardrobePage = WardrobePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(Environment.firebaseConfig);
    firebase.firestore();
  }
}

