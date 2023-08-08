import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  UPLOAD_IMAGE_API :string = "http://ec2-18-233-98-8.compute-1.amazonaws.com/upload_image";
  SAVE_USER_API :string = "http://ec2-18-233-98-8.compute-1.amazonaws.com/add_user";
  GET_USER_API :string = "http://ec2-18-233-98-8.compute-1.amazonaws.com/get_user";
  ADD_REVIEW_API :string = "http://ec2-18-233-98-8.compute-1.amazonaws.com/add_review";
  GET_REVIEWS_BY_ID_API :string = "http://ec2-18-233-98-8.compute-1.amazonaws.com/get_reviews_by_id";
  ADD_DATA_API :string = "http://ec2-18-233-98-8.compute-1.amazonaws.com/add_movie_data";
  GET_MOVIE_BY_ID_API :string = "http://ec2-18-233-98-8.compute-1.amazonaws.com/get_movie_by_id";




  uploadImage(image:any){
    const fd:FormData = new FormData();
    fd.append('img', image, image.name);
    console.log(fd)
    console.log("-- UPLOAD IMAGE AND ANALYSE --")

     return this.http.post<any>(this.UPLOAD_IMAGE_API,fd).pipe(map(result =>{
        console.log("RESPONSE:")
        console.log(result);
        return result
 
       }
      )
     )
   }


   SaveUser(user_id:any, user_name:any, img_url:any){
    console.log("-- SAVE USER IN AWS DynamoDB --");
    console.log(user_id);
    console.log(user_name);
    console.log(img_url);
    return this.http.post<any>(this.SAVE_USER_API,{'user_id':user_id , "img_url": img_url,"user_name": user_name }).pipe(map(result =>{


      return result;
      }
     )
    )


   }


   getUser(user_id: any){
    return this.http.post<any>(`${this.GET_USER_API}`, {'user_id': user_id}).pipe(map(result =>{
      return result;
      }
     )
    )
  }


  addReview(imdb_id:any, review:any, user_id:any ,name:any  , image_url:any, rating:any ){
    console.log("API CALL - ADD REVIEW TO DynamoDB");


    return this.http.post<any>(this.ADD_REVIEW_API,{'imdb_id':imdb_id , "review": review, "user_id": user_id, "name": name, "image_url": image_url, "rating": rating}).pipe(map(result =>{
      console.log(result);


      return result;
      }
     )
    )


   }


   addData(imdb_id:any, movie_title:any ,year:any, description:any, genre:any, trailer_url:any ){
    console.log("API CALL - ADD MOVIE ADDITIONAL DATA TO DynamoDB --");



    return this.http.post<any>(this.ADD_DATA_API,{'imdb_id':imdb_id , "movie_title": movie_title, "year": year, "description": description, "genre": genre, "trailer_url": trailer_url}).pipe(map(result =>{
      console.log(result);


      return result;
      }
     )
    )


   }


   getReviews(imdb_id:any){
    console.log("API CALL - GET REVIEWS BY ID:");

    console.log(imdb_id);
   
    return this.http.post<any>(this.GET_REVIEWS_BY_ID_API,{'imdb_id':imdb_id}).pipe(map(result =>{
      console.log(result);
  
      return result;
      }
     )
    )


   }


   getMoviebyId(imdb_id:any){
    console.log("API CALL - GET ADDITIONAL MOVIE INFO FROM DynamoDB BY ID:");
    console.log(imdb_id);
   
    return this.http.post<any>(this.GET_MOVIE_BY_ID_API,{'imdb_id':imdb_id}).pipe(map(result =>{
      console.log(result);
  
      return result;
      }
     )
    )


   }



  constructor(private http:HttpClient) { }
}
