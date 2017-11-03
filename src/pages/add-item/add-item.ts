import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garment} from "../../models/garment";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {Camera} from "@ionic-native/camera";
import {ImageServiceProvider} from "../../providers/image-service/image-service";
import * as firebase from "firebase";

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  garment: Garment;
  base64Image: string;
  base64Prefix: string;

  constructor(public navCtrl: NavController,
              public dsp: DataServiceProvider,
              public camera: Camera,
              public isp: ImageServiceProvider,
              public navParams: NavParams) {
    this.garment = new Garment();
    this.base64Prefix = "data:image/jpeg;base64,";
  }

  saveClothing() {
    // TODO don't continue if a field is missing.
    this.garment.color = this.garment.color.toLowerCase();
    console.log(this.base64Image);
    const ref = firebase.storage().ref('Users/hello/' + this.garment.type + "s" + '/' + this.garment.name.replace(" ","") + '.jpg');
    console.log(ref);
    ref.putString(this.base64Image, 'base64', { contentType: 'image/jpg' }).then(snapshot => {
      this.garment.imageURL = snapshot.downloadURL;
      console.log(this.garment.imageURL);
      this.dsp.addClothing(this.garment.type + "s", this.garment);
    }, err => {
      console.log(err);
    });


    this.navCtrl.pop();
  }

  takePicture(){
    this.camera.getPicture(this.isp.cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = imageData;
      this.base64Prefix += imageData;
    }, (err) => {
      console.log(err);
    });
  }

}
