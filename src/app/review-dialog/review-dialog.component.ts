import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { AwsService } from '../aws.service';
import { Router } from '@angular/router';

export interface DialogData {
  imdb_id:string;
  user_id:any;
  image_url:any;
  name:any;

}

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent {
  review="";
  rating_options = [1,2,3,4,5];
  rating:any;


  onNoClickNo(): void {
    this.dialogRef.close();
  }

  addReview(): void {
    if(this.review!=""){
  
      this.aws.addReview(this.data['imdb_id'], this.review, this.data['user_id'], this.data['name'], this.data['image_url'], this.rating).subscribe(
        (img: any) =>{
          console.log(img);
          console.log(img);
          console.log(img);
          console.log(img);
  
            });  
      
      this.router.navigate(['/home']);

    }
  

    this.dialogRef.close();
  }

  constructor( public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public router:Router, public aws:AwsService) { }


}
