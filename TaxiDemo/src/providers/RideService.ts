import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import firebase from 'firebase';

@Injectable()
export class RideService {

    constructor() {

    }

    subscribeForRideRequests() {
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/RideRequests/');

        Observable.fromEvent(rideReqRef, 'child_added').subscribe((dataSnap) =>{
            console.log("child_added", dataSnap);
        })

        Observable.fromEvent(rideReqRef, 'child_removed').subscribe((dataSnap) =>{
            console.log("child_removed", dataSnap);
        })
    }

    unSubscribeForRideRequests() {
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/RideRequests/');
        rideReqRef.off('child_added');
        rideReqRef.off('child_removed');
    }

}