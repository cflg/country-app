import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-page-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = []
  public initialTerm: string = ''

  constructor(private count: CountriesService){}

  ngOnInit(): void {
    this.countries = this.count.cacheStore.byCountry.countries
    this.initialTerm = this.count.cacheStore.byCountry.term
  }

  searchByCountryPage(term: string): void{
    this.count.searchByCountryService(term)
    .subscribe(country => this.countries = country)
  }

}
