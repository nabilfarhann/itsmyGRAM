import * as firebase from 'firebase';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { NotificationService } from '../shared/notification.service';

@Injectable()
export class MyFireService{

    constructor(private user: UserService, private notifiers: NotificationService){}

    getUserFromDatabase(uid){
        const ref = firebase.database().ref('users/' + uid);
        return ref.once('value')
            .then(snapshot => snapshot.val());
    }

    generateRandomName(){
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    uploadFile(file){
        const fileName = this.generateRandomName();
        const fileRef = firebase.storage().ref().child('image/' + fileName);

        return new Promise((resolve, reject) => {
            const uploadTask = fileRef.put(file);

            uploadTask.on('state_changed', snapshot => {
            }, error => {
                reject(error);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    resolve({fileName, downloadURL});
                });
                
            });

        });
    }

    deleteFile(imageData){
        const user = this.user.getProfile();
        const fileRef = firebase.storage().ref().child('image/' + imageData.name);

        fileRef.delete().then(function() {

            const deleteRefimages = firebase.database().ref('images/' + imageData.name);
            deleteRefimages.remove();
            const deleteRefallpost = firebase.database().ref('allposts/' + imageData.name);
            deleteRefallpost.remove();
            const deleteRefmypost = firebase.database().ref('myposts/' + user.uid + '/' + imageData.name);
            deleteRefmypost.remove();

          }).catch(function(error) {
            console.log(error);
          });
    }

    handleImageUpload(data){
        const user = this.user.getProfile();

        const newPersonalPostKey = firebase.database().ref().child('myposts').push().key;
        const personalPostDetails = {
            fileUrl: data.downloadURL,
            name: data.fileName,
            creationDate: new Date().toString()
        };

        const allPostKey = firebase.database().ref('allposts').push().key;
        const allPostsDetails = {
            fileUrl: data.downloadURL,
            name: data.fileName,
            creationDate: new Date().toString(),
            uploadedBy: user
        };

        const imageDetails = {
            fileUrl: data.downloadURL,
            name: data.fileName,
            creationDate: new Date().toString(),
            uploadedBy: user,
            favoriteCount: 0
        }

        const updates = {};
        updates['/myposts/' + user.uid + "/" + data.fileName] = personalPostDetails;
        updates['/allposts/' + data.fileName] = allPostsDetails;
        updates['/images/' + data.fileName] = imageDetails;

        return firebase.database().ref().update(updates);
    }

    getUserPostsRef(uid){
        return firebase.database().ref('myposts').child(uid);
    }

    handleFavoriteClicked(imageData){
        const uid = firebase.auth().currentUser.uid;

        const updates = {};

        updates['/images/' + imageData.name + "/oldFavoriteCount"] = imageData.favoriteCount;
        updates['/images/' + imageData.name + "/favoriteCount"] = imageData.favoriteCount + 1;
        updates['/favorites/' + uid + "/" + imageData.name] = imageData;

        return firebase.database().ref().update(updates);
    }

    followUser(uploadedByUser){
        const uid = firebase.auth().currentUser.uid;

        const updates = {};
        updates['/follow/' + uid + "/" + uploadedByUser.uid] = true;

        return firebase.database().ref().update(updates);
    }
}