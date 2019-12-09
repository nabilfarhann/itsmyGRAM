import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class NotificationService{
    private sub = new Subject<any>();

    public emmitter = this.sub.asObservable();

    display(type, message){
        this.sub.next({type, message});
    }
}