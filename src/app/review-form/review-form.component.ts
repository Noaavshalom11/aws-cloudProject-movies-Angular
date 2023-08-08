import { Component,  } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { AwsService } from '../aws.service';
import { AuthService } from '../auth.service';
import { AddMovieDataDialogComponent } from '../add-movie-data-dialog/add-movie-data-dialog.component';




@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})


export class ReviewFormComponent {
  movie:any;
  reviews:any;
  user_id:any;
  image_url:any;
  name:any;
  movie_data:any;
  movie_status=true;
  spinnerStatus = false;
  message = false;


  description:any;
  genre:any;
  trailer_url:any ;

  openReviewDialog(){
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '600px',
      data: {imdb_id:this.movie['id'], user_id:this.user_id, name:this.name, image_url:this.image_url }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
      }
    });
  }



  openAddMovieDataDialog(){

    const dialogRef = this.dialog.open(AddMovieDataDialogComponent, {
      width: '600px',
      data: {imdb_id:this.movie['id'], movie_title:this.movie['originalTitleText']['text'], year:this.movie['releaseDate']['year'] }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
      }
    });
  }




  ngOnInit(): void {
    this.movie = JSON.parse(this.route.snapshot.paramMap.get('data'));
    this.spinnerStatus = true;

    this.aws.getMoviebyId(this.movie['id']).subscribe(
      (movie_data:any) => {
        if(movie_data.length!=0){
          this.movie_status=false;

        }else{
          this.message = true;

        }
        this.spinnerStatus = false;

        this.description = movie_data[0]['description'];
        this.genre = movie_data[0]['genre'];
        this.trailer_url = this._sanitizer.bypassSecurityTrustResourceUrl(movie_data[0]['trailer_url']);





      }

    )

    this.aws.getReviews(this.movie['id']).subscribe(
      (reviews: any) =>{
        for(const i in reviews){
          this.reviews = reviews;


  
  
        }
       


          })
          
          this.authService.getUser().subscribe(
            user => {
              this.user_id = user.uid;
              this.aws.getUser(this.user_id).subscribe(
              (result) =>{
                this.image_url=result['img_url']
                this.name=result['user_name']
            
      
                  });
      
            }
          )
          
          ;  




  }

  constructor(public router:Router, private route: ActivatedRoute, public dialog: MatDialog, public aws:AwsService, public authService: AuthService, public _sanitizer: DomSanitizer) { }

}
