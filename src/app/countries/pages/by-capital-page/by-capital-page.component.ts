import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'countries-page-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = []
  public initialTerm: string = ''
  public isLoading: boolean = false

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries
    this.initialTerm = this.countriesService.cacheStore.byCapital.term
  }

    searchByCapital( term: string ): void{
      this.isLoading = true
      this.countriesService.searchByCapital( term )
      .subscribe( countries => {
        this.countries = countries
        this.isLoading = false
      })
    }
}
