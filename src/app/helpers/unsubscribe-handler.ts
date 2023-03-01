import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../models/user.modal";


@Injectable()
export abstract class UnsubscribeHandelr implements OnDestroy{
    protected Unsubscribe$ : Subject<void> = new Subject();
    CurrentUser: User;
    constructor() {}
    
    ngOnDestroy(): void {
        this.Unsubscribe$.next();
        this.Unsubscribe$.complete();
    }
}