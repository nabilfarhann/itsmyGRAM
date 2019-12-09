import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyFireService } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {
  personalPostsRef: any;
  postLists: any = []; 
  name: string;

  constructor(private myFire: MyFireService, private notifier: NotificationService,
              private router: Router, private userService: UserService) { }

  ngOnInit() {

    const uid = firebase.auth().currentUser.uid;
    this.personalPostsRef = this.myFire.getUserPostsRef(uid);
    this.personalPostsRef.on('child_added', data => {
      this.postLists.push({
        key: data.key,
        data: data.val()
      });

    });

    this.userService.statusChange.subscribe(userData => {
      if(userData){
        this.name = userData.name;
      }else{
        this.name = null;
      }
    });

    firebase.auth().onAuthStateChanged(userData => {
      // we are logged in
      if(userData && userData.emailVerified){
        const user = this.userService.getProfile();
        if(user && user.name){
          this.name = user.name;
        }
      }
    });
    
  }

  onFileSelection(event){
    const fileList: FileList = event.target.files;

    if(fileList.length > 0){
      const file: File = fileList[0];
      this.myFire.uploadFile(file)
        .then(data => {
          this.notifier.display('success', 'Picture Successfully uploaded!');
          this.myFire.handleImageUpload(data);
        })
        .catch(err => {
          this.notifier.display('error', err.message);
        });
    }
  }

  ngOnDestroy(){
    this.personalPostsRef.off();
  }

  onDeleteClicked(imageData){
    this.myFire.deleteFile(imageData);
    this.notifier.display('success', 'Image has been deleted.');
  }

}
