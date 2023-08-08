import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatButtonModule } from "@angular/material/button";
import { AwsService } from '../aws.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],  
})
export class RegisterComponent implements OnInit {
  user_id:string;
  name:string;
  email:string;
  password:string;
  confirmedPassword:string;
  errorMessage:string;
  hasError:boolean = false;
  ProfileImage:string= "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/300px-Default_pfp.svg.png";
  image_obj:any;
  image_url:any;
  image_confidence:any;
  image_status:boolean;
  color_confidence="";
  message = ""
  spinnerStatus = false;

 

  // PHOTO UPLOAD + FACE DETECTION
  uploadImage(imgFile:any) {
    this.spinnerStatus = true;

    this.image_obj = imgFile.target.files[0];
    if(this.image_obj!= undefined){
      console.log(this.image_obj)
      this.aws.uploadImage(this.image_obj).subscribe(
        (img:any) =>{
          this.spinnerStatus = false;

          if (img['confidence'] == "no_match"){
            this.color_confidence = "#c70808";
            this.image_status = false;
            this._snackBar.open("No face detected", "CLOSE", {
              duration: 5 * 1000,
            });

          }else{
            this.image_confidence= img['confidence'];
            console.log(this.image_confidence);

            this.image_confidence=parseFloat(this.image_confidence.toFixed(4));
            console.log("round confidence to 4 decimal places:");
            console.log(this.image_confidence);

          if (Number(this.image_confidence)< 90){
            this.color_confidence = "#c70808";
            this.image_status = false;

            this._snackBar.open("We encourge to use real life photos" + this.image_confidence, "CLOSE", {
              duration: 5 * 1000,
            });


          }else{
           this.color_confidence = "#1cb306";
           this.ProfileImage= img['img_url'];

           this._snackBar.open("Face Detected" + " " + this.image_confidence + "%", "CLOSE", {
            duration: 7 * 1000,
          });


          }

          }



          

        }) ;}
}

  onSubmit(){
    
    if(this.password.length < 6){
      this.hasError=true;
      this.errorMessage = 'The password must be at least 6 characters.';
    }else{
        this.auth.fetch(this.email).then((res) => {
            if(res.length){
                this.hasError=true;
                this.errorMessage = "The email address is already in use by another account.";  
            }else if(this.password != this.confirmedPassword){
                this.errorMessage = "Password mismatch"
            }else{
              this.spinnerStatus = true;

                this.auth.register(this.email, this.password).then(res => {
                this.user_id = res.user.uid;
                this.aws.SaveUser(this.user_id, this.name, this.ProfileImage).subscribe(
                  (img) =>{
                    this.spinnerStatus = false;

                  this.ProfileImage = img; 
                      });  
                
                this.router.navigate(['/home'])
              })
            }
      }).catch(()=>{
        this.hasError=true;
        this.errorMessage = "The email address is badly formatted.";      
      })
    }
  }


  clearError(){
    this.errorMessage = '';
  }

  
  constructor(private auth:AuthService, public router:Router, public aws:AwsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

}
