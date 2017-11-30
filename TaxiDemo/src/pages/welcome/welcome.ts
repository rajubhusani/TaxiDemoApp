import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import firebase from 'firebase';


import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { MobileAuthPage } from '../mobileauth/mobileauth';
import { WelcomeService } from './welcome.service';
import { DashboardPage } from '../dashboard/dashboard';
import { PasswordPage } from '../password/password';
import { UserModel } from './user.model';


import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  private login : FormGroup;

  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams, private service: WelcomeService,
    public loadingCtrl: LoadingController) {
    
  }

  ngOnInit () {
    this.login = this.formBuilder.group({
     
      email : ['',this.validatorsEmail()]
    });
  }

  private validatorsEmail() {
    return Validators.compose([ Validators.required,Validators.email])
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    console.log(this.login)
  }

  validateUser() {
    //this.navCtrl.setRoot(HomePage);
  }

  logForm(){
    console.log(this.login.value)
    this.navCtrl.push(PasswordPage,{email: this.login.value.email})
    // this.regService.registerUser(this.register.value);
    // this.navCtrl.push(MobileAuthPage, {mobile: this.register.value.mobile, user: this.register.value})
  }



  goToAuthPage() {
    //this.navCtrl.push(DashboardPage);
    var navController = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    // var promise = this.service.validateUser(this.mobile);
    // promise.then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     var userPromise = this.service.getUserObject(snapshot.val());
    //     userPromise.then((datasnap) => {
    //       console.log("User found" + JSON.stringify(datasnap.val()));
    //       loading.dismiss();
    //       // navController.push(PasswordPage, { mobile: this.mobile, user: datasnap.val() });
    //     }).catch((er) => {
    //       console.log(er);
    //     });
    //   } else {
    //     console.log("No User found");
    //     loading.dismiss();
    //     // navController.push(RegisterPage, { mobile: this.mobile });
    //   }
    // }).catch((er) => {
    //   loading.dismiss();
    //   console.log(er);
    // });
  }



}
