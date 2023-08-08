import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { User } from './interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:Observable<User | null>;

  login(email:string, password:string){
    console.log(email);
    console.log(password);

    return this.afAuth.signInWithEmailAndPassword(email,password);
  }


  register(email:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(email,password);
  }


  logout(){
  //  this.afAuth.authState.subscribe((authState) => { authState.delete(); });
    this.afAuth.signOut();
  }

  getUser(): Observable<User | null> {
    return this.user;
    
  }

  fetch(email:string){
    return this.afAuth.fetchSignInMethodsForEmail(email)

    }

  constructor(private afAuth:AngularFireAuth) {
    console.log(this.afAuth.authState);
    this.user = this.afAuth.authState;
   }
  
  }
