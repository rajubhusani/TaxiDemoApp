import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MobileAuthPage } from '../mobileauth/mobileauth';
import { DashboardPage } from '../dashboard/dashboard';
import firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HistoryPage } from '../history/history'

@IonicPage()
@Component({ selector: 'page-password', templateUrl: 'password.html' })
export class PasswordPage {
  private login: FormGroup;
  password: any;
  userObject: any;
  mobile: any;
  email: string;
  object: any;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController, private nativeStorage: NativeStorage) {
    this.email = navParams.get("email");
    // this.mobile = navParams.get("mobile");
    //console.log(navParams.get("email"))
    this.object = navParams.get("object");
  }
  ngOnInit() {
    this.login = this.formBuilder.group({

      email: [this.email, this.validatorsEmail()],
      password: ['', Validators.required]
    });
    // this.login.value.email = "as"
  }

  private validatorsEmail() {
    return Validators.compose([Validators.required, Validators.email])
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  logForm() {

    this.login.controls['email'].markAsTouched()
    this.login.controls['password'].markAsTouched()
    if (!this.login.invalid && this.login.status == "VALID") {
      if (this.login.value.password === this.object.password) {
        this.nativeStorage.setItem("isLoggedIn", true).then(() => {},
        error => {});
        this.navCtrl.setRoot(HistoryPage);
      } else {
        this.presentAlert();
      }
      
    }

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Please enter valid credentials',
      buttons: ['Ok']
    });
    alert.present();
  }

  goToDashboard() {
    //console.log(this.password+" === "+this.userObject.password);
    if (this.password === this.userObject.password) {
      this.navCtrl.push(DashboardPage, { user: this.userObject });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Password',
        subTitle: 'Invalid password',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  goToMobileAuth() {
    this.navCtrl.push(MobileAuthPage, { mobile: this.mobile });
  }
}
