import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { catchError, switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'countries-page-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {
  public country?: Country
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
    ){

  }
  /* ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( ({ id }) => {
      //console.log({params: params['id']})
      //console.log({params: id})
      //this.searchCountryPage(id)
      this.countriesService.searchCountryByAlphaCode(id)
      .subscribe(country => {
        console.log(country);

      })
    })
  } */
  /* searchCountryPage(code: string): void{

      this.countriesService.searchCountryByAlphaCode(code)
      .subscribe(country => {
        console.log(country);

      })

  } */
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) =>  this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe( country => {
      if(!country) return this.router.navigateByUrl('')
      return  this.country = country

    })
  }

}
