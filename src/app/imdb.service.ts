import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec    } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {
  codec = new HttpUrlEncodingCodec;

  URL_top_boxoffice_200 = 'https://moviesdatabase.p.rapidapi.com/titles';
  URL_title_search ='https://moviesdatabase.p.rapidapi.com/titles/search/title';


 decodedValue = this.codec.decodeValue('Hello%20World%21'); // Decodes the value as 'Hello World!'

  headers = new HttpHeaders({
    'X-RapidAPI-Key': '7902fd1172msh368378e6c7b0edbp16ace5jsn7ffa080169c6',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
  });

  params = new HttpParams().set('list', 'top_boxoffice_200').set('limit', '24').set('startYear', '1995').set('endYear', '2022').set('year', '2020');
  params2 = new HttpParams().set('titleType', 'movie').set('exact', 'false').set('limit', '20');



  getMovie(filterValue: string){
    const encodedValue = this.codec.encodeValue(filterValue); // Encodes the value as 'Hello%20World%21'
    let url = (`${this.URL_title_search}/${encodedValue}`)
    console.log("API CALL - GET MOVIE BY TITLE:")
    console.log(encodedValue)
    console.log(url)


    return this.http.get<any>(`${url}`, {
      headers: this.headers,
      params:this.params2
    }).pipe(map(result =>{
      console.log(3)

      console.log(result);
      return result;
      }
     )
    )


  }
  geTopMovies(){
    console.log("API CALL - GET TOP MOVIES")

    return this.http.get<any>(`${this.URL_top_boxoffice_200}`, {
      headers: this.headers,
      params:this.params
    }).pipe(map(result =>{
      console.log('RESPONSE:');
      console.log(result);
      return result;
      }
     )
    )
  }
  
  constructor(private http:HttpClient) { }
}
