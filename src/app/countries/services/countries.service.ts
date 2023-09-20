import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/countries.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1'
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }


  private saveToLocalStorage(): void{
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))

  }
  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStore')) return
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([])),
      delay(400)
    )
  }

 /*  searchByCapital( term: string ): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/capital/${ term }`)
    .pipe( tap(countries => console.log('Paso por el tap', countries)
    ),
    map( countries => []),
    tap(countries => console.log('Despues del map', countries)
    )
    )
  } */
  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    return this.http.get<Country[]>(`${ this.apiUrl }/alpha/${ code }`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0]: null),
      catchError(() => of(null))
    )
  }
  //! //////////////////////////////////////////////////////////////////////
   searchByCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries =>  this.cacheStore.byCapital = {
        term,
        countries
      }),
      tap( () => this.saveToLocalStorage())
    )
  }
  //! //////////////////////////////////////////////////////////////////////
  searchByCountryService( term: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ term }`
    return this.getCountriesRequest(url)
    .pipe(
      tap(
        countries => this.cacheStore.byCountry = {
          term,
          countries
        }
      ),
      tap( () => this.saveToLocalStorage())
    )
  }
  //! //////////////////////////////////////////////////////////////////////
  searchByRegionService( region: Region ): Observable<Country[]>{
    const url = `${ this.apiUrl }/region/${ region }`
    return this.getCountriesRequest(url)
    .pipe(
      tap(
        countries => this.cacheStore.byRegion = {
          region,
          countries
        }
      ),
      tap( () => this.saveToLocalStorage())
    )
  }
}
