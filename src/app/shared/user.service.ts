import { EventEmitter } from '@angular/core';
import * as firebase from 'firebase';

export class UserService{

    statusChange: any = new EventEmitter<any>();
    constructor(){ }

    set(userFromDatabase){
        localStorage.setItem('user', JSON.stringify(userFromDatabase));

        const messaging = firebase.messaging();

        messaging.requestPermission()
            .then(() => {
                firebase.messaging().getToken()
                 .then(token => {
                    console.log('Token received: ', token);

                    messaging.onMessage(payload => {
                        console.log(payload);
                        // TODO: display in toadster
                    });

                    const updates = {};
                    updates['/users/' + userFromDatabase.uid + "/messageToken"] = token;
                    return firebase.database().ref().update(updates);
                 })
                  .catch(err => {
                    console.log(err);
                  })
            })
            .catch(err => {
                console.log(err);
            })

        this.statusChange.emit(userFromDatabase);
    }

    getProfile(){
        const user = localStorage.getItem('user');
        return JSON.parse(user);
    }

    destroy(){
        localStorage.removeItem('user');
        this.statusChange.emit(null);
    }
}