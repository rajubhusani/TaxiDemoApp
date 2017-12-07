import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import firebase from 'firebase';

import { Broadcaster } from './Broadcast';

@Injectable()
export class RideService {

    constructor(private broadcaster: Broadcaster) {

    }

    subscribeForRideRequests() {
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/RideRequests/');

        rideReqRef.on('child_added', (dataSnap) =>{
            console.log("child_added", dataSnap,"Child Key", dataSnap.key);            
            rideReqRef.child(dataSnap.key).once('value').then(snap =>{
                let ridesData = snap.val();
                var keys = Object.keys(ridesData);
                for (var key in keys) {
                  this.broadcaster.broadcast('RideRequests', {"parent":dataSnap.key, "child":keys[key]});
                }                
            });            
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