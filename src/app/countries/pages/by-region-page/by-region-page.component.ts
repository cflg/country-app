import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-page-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {
  public regions: Country[] = []
  public regiones: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedRegion?: Region

  constructor(private region: CountriesService){}

  ngOnInit(): void {
    this.regions = this.region.cacheStore.byRegion.countries
    this.selectedRegion = this.region.cacheStore.byRegion.region
  }

  searchByRegionPage( term: Region ): void{
    this.selectedRegion = term
    this.region.searchByRegionService(term)
    .subscribe( countries => this.regions = countries)
  }

}
