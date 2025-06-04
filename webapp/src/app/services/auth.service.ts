import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { IProfile } from 'webapp/src/interfaces/profile.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public popupVisibility$ = new BehaviorSubject<boolean>(false)
  public current = new BehaviorSubject<'login' | 'register'>('login')
  public loginType = new BehaviorSubject<'number' | 'email' | 'code'>('number')
  public registerType = new BehaviorSubject<'number' | 'code'>('number')
  public showFlags = new BehaviorSubject<boolean>(false)
  public finalHeight = new BehaviorSubject<number>(507)
  public finalHeightReg = new BehaviorSubject<number>(407)
  public sentUsername: string | null = null
  private profile = new BehaviorSubject<IProfile | null>(null)
  public name = new BehaviorSubject<string | null>(null)
  public index = new BehaviorSubject<number>(0)

  public setProfile(profile: IProfile): void {
    this.profile.next(profile)
  }

  public remveProfile(): void {
    this.profile.next(null)
  }

  public getProfile(): Observable<IProfile | null> {
    return this.profile.asObservable()
  }

  public setName(name: string | null): void {
    this.name.next(name)
  }

  public addHeight(number: number): void {
    this.finalHeight.next(this.finalHeight.value + number)
  }

  public removeHeight(number: number): void {
    this.finalHeight.next(this.finalHeight.value - number)
  }

  public addHeightReg(number: number): void {
    if (this.finalHeightReg.value <= 407) {
      this.finalHeightReg.next(this.finalHeightReg.value + number)
    }
  }

  public removeHeightReg(number: number): void {
    const newHeight = this.finalHeightReg.value - number
    if (newHeight >= 407) {
      this.finalHeightReg.next(newHeight)
    } else {
      this.finalHeightReg.next(407)
    }
  }

  public openPopup(): void {
    this.popupVisibility$.next(true)
  }

  public closePopup(): void {
    this.popupVisibility$.next(false)
    this.current.next('login')
  }

  public setLogin(): void {
    this.current.next('login')
  }

  public setLoginTypeNumber(): void {
    this.loginType.next('number')
  }

  public setLoginTypeCode(): void {
    this.loginType.next('code')
  }

  public setLoginTypeEmail(): void {
    this.loginType.next('email')
  }

  public setRegisterTypeNumber(): void {
    this.registerType.next('number')
  }

  public setRegisterTypeCode(): void {
    this.registerType.next('code')
  }

  public setRegister(): void {
    this.current.next('register')
  }

  public openFlags(): void {
    this.showFlags.next(true)
  }

  public closeFlags(): void {
    this.showFlags.next(false)
  }

  public toggleFlags(): void {
    this.showFlags.next(!this.showFlags.value)
  }

  public setUsername(username: string): void {
    this.sentUsername = String(+username)
  }

  public resetUsername(): void {
    this.sentUsername = null
  }
}
