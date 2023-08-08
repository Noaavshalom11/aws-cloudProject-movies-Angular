import { AwsService } from './../aws.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ImdbService } from '../imdb.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user_id:string;
  movies$:any;
  added_dates:any;
  movies:Array<any>=[];
  dataSource:any;
  keywords = "";
  movies_status =false;
  image_url:string;
  name:string;
  user_status=false;
  results_status = false;

  
  getMovie() {
    this.movies=[];
    if(this.keywords != "") {
    this.results_status = false;


    this.movies$ = this.imdb.getMovie(this.keywords);
    this.movies_status = false;

    this.movies$.subscribe( (movies: any)  => {
      console.log(movies)
      console.log(movies['results']);



      
      for(const i in movies['results']){
        if ((movies['results'][i]['primaryImage']!=null) && (movies['results'][i]['releaseDate']!=null))
        {
          this.movies.push(movies['results'][i]);
      
        }
      }
      if(this.movies.length == 0){
        this.results_status = true;



      }
      this.movies_status = true;

    })
  }else{
    this.results_status = true;


  }
}



  goToMovie(index: any){
    this.router.navigate(['/movies/review', {data: JSON.stringify(this.movies[index])}] ,{skipLocationChange: true, replaceUrl: false});
  }


  
  geTopMovies(){
    console.log(1);
    this.movies=[];

    this.movies$ = this.imdb.geTopMovies(); 
    this.movies$.subscribe( (movies: any)  => {
      console.log(movies)
      console.log(4);
      console.log(movies['results']);
      for(const i in movies['results']){
        if ((movies['results'][i]['primaryImage']!=null) && (movies['results'][i]['releaseDate']!=null))
        {
          console.log(i);


          this.movies.push(movies['results'][i]);

        }


      }
      console.log(this.movies);
      console.log("555555555");

      this.movies_status = true;


    
    })
    

  } 
  
  goToJob(index: any){
    this.router.navigate(['/jobs/job', {data: JSON.stringify(this.movies[index])}] ,{skipLocationChange: true, replaceUrl: false});
  }


  constructor(public authService: AuthService, public router:Router, public aws:AwsService, public imdb:ImdbService ) { }
  ngOnInit(): void {

    this.movies=[];

    this.movies$ = this.imdb.geTopMovies(); 
    this.movies$.subscribe( (movies: any)  => {
      console.log(movies['results']);
      for(const i in movies['results']){
        if ((movies['results'][i]['primaryImage']!=null) && (movies['results'][i]['releaseDate']!=null) && (movies['results'][i]['id']!="tt5113044"))
        {
          this.movies.push(movies['results'][i]);

        }


      }
      
      this.movies_status = true;
      this.results_status = false;



    
    }
    
    )
    
    
    this.authService.getUser().subscribe(
      user => {
        this.user_id = user.uid;

        this.aws.getUser(this.user_id).subscribe(
        (result) =>{
          console.log("-- AWS CALL - GET LOGED IN NAME + IMAGE OF USER ID --");
          console.log(this.user_id);
          console.log("RESPONSE:");
          console.log(result);


          this.image_url=result['img_url']
          this.name=result['user_name']
          this.user_status=true;




            });

      }
    )
  }
}




