import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { ApiService } from 'webapp/src/app/services/api.service'
import { ICountry } from 'webapp/src/interfaces/country.interfaces'
import * as countryTelData from 'country-telephone-data'
import { AsyncPipe } from '@angular/common'
import { AuthService } from 'webapp/src/app/services/auth.service'
import { PulseLoaderComponent } from '../../../ui/loaders/pulse-loader/pulse-loader.component'

@Component({
  selector: 'app-with-number',
  imports: [TranslateModule, ReactiveFormsModule, AsyncPipe, PulseLoaderComponent],
  templateUrl: './with-number.component.html',
  styleUrls: ['./with-number.component.scss', '../../flags.component.scss'],
})
export class WithNumberComponent implements OnInit {
  public withNumber?: FormGroup
  public displayMsg = false
  public countries: ICountry[] = []
  public filteredCountries: ICountry[] = []
  public searchKeyword?: string
  public currentCountry: ICountry = {
    name: 'Georgia',
    iso2: 'ge',
    dialCode: '+995',
  }
  public showLoader = false

  @ViewChild('phone') phone?: ElementRef<HTMLInputElement>

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.withNumber = new FormGroup<{ phone: FormControl<number | null> }>({
      phone: new FormControl(null, [Validators.required, Validators.minLength(9)]),
    })
    this.countryList()
  }

  public inputChange(): void {
    if (this.withNumber!.get('phone')?.valid) {
      this.displayMsg = false
    }
  }

  public onSubmit(): void {
    if (!this.withNumber!.get('phone')?.valid) {
      this.displayMsg = true
    } else {
      this.showLoader = true
      this.displayMsg = false
      const username = this.currentCountry.dialCode + String(this.withNumber!.get('phone')?.value)
      this.apiService.user(username).subscribe({
        next: (data) => {
          if (data.success) this.authService.setLoginTypeCode()
          this.authService.setUsername(username)
          this.showLoader = false
          this.withNumber?.reset()
        },
        error: (error: unknown) => {
          console.error(error)
          this.showLoader = false
        },
      })
    }
  }

  public focusPhone(): void {
    if (this.phone) this.phone.nativeElement.focus()
  }

  private countryList(): void {
    const ctd = countryTelData as { allCountries: unknown }
    const raw = ctd.allCountries as ICountry[]

    const excludeIso = new Set<string>([
      'ax',
      'aq',
      'hm',
      'nf',
      'sj',
      'cx',
      'cc',
      're',
      'yt',
      'gg',
      'je',
      'im',
      'fk',
      'eh',
    ])

    this.countries = raw
      .map((country) => {
        const cleanName = country.name.replace(/\s*\(.*\)$/, '')
        return {
          iso2: country.iso2,
          name: cleanName,
          dialCode: `+${country.dialCode}`,
        } as ICountry
      })
      .filter((country) => !excludeIso.has(country.iso2))
      .sort((a, b) => a.name.localeCompare(b.name))
    this.filteredCountries = this.countries
  }

  public setCountry(index: number): void {
    this.currentCountry = {
      name: this.filteredCountries[index].name,
      iso2: this.filteredCountries[index].iso2,
      dialCode: this.filteredCountries[index].dialCode,
    }
    this.authService.closeFlags()
  }

  public onCountrySearch(keyword: string): void {
    const search = keyword.trim().toLowerCase().replace('+', '')
    this.filteredCountries = this.countries.filter((country) => {
      return (
        country.name.toLowerCase().includes(search) ||
        country.dialCode.replace('+', '').includes(search) ||
        country.iso2.toLowerCase().includes(search)
      )
    })
  }

  public cleanup(): void {
    this.withNumber?.reset()
    this.displayMsg = false
  }
}
