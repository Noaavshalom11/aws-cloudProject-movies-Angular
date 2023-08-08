import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AwsService } from '../aws.service';
import { Router } from '@angular/router';


export interface DialogData {
  imdb_id:string;
  movie_title:any;
  year:any;

}

@Component({
  selector: 'app-add-movie-data-dialog',
  templateUrl: './add-movie-data-dialog.component.html',
  styleUrls: ['./add-movie-data-dialog.component.css']
})
export class AddMovieDataDialogComponent {
  description="";
  genres = ["Action","Adventure","Comedy","Drama","Fantasy","Horror","Mystery","sci-fi","Romance", "Thriller","Western"];
  genre = "";
  trailer_url="";




  onNoClickNo(): void {
    this.dialogRef.close();
  }

  addData(){


  
      this.aws.addData(this.data['imdb_id'], this.data['movie_title'], this.data['year'],  this.description, this.genre, this.trailer_url).subscribe(
        (img: any) =>{
  
            });  
      
      this.router.navigate(['/home']);

    
  

    this.dialogRef.close();

  }



  constructor( public dialogRef: MatDialogRef<AddMovieDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public router:Router, public aws:AwsService) { }


}
