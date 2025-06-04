import { Component, OnInit } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { ApiService } from '../services/api.service'
import { IProfile } from 'webapp/src/interfaces/profile.interface'
import { AuthService } from '../services/auth.service'
import { filter } from 'rxjs'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { MatRippleModule } from '@angular/material/core'
import { CookieService } from 'ngx-cookie-service'
import { ViewportService } from '../services/viewport.service'
import { AsyncPipe } from '@angular/common'
import { CartService } from '../services/cart.service'

@UntilDestroy()
@Component({
  selector: 'app-profile',
  imports: [TranslateModule, RouterOutlet, MatRippleModule, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public name: string | null = null
  public logout = false
  public closing = false
  public viewportWidth = 0
  public profileMenuItems: {
    class: string
    translateKey: string
    tab: string
  }[] = [
    { class: 'edit-profile', translateKey: 'profile_header_editProfile', tab: 'edit-profile' },
    { class: 'orders', translateKey: 'profile_header_orders', tab: 'orders' },
    { class: 'wishlist', translateKey: 'wishList', tab: 'wishlist' },
    { class: 'notifications', translateKey: 'profile_header_notifications', tab: 'notifications' },
    { class: 'security', translateKey: 'securityPolicy', tab: 'policy' },
    { class: 'faq', translateKey: 'frecuentlyAskedQuestions', tab: 'frecuentlyAskedQuestions' },
    { class: 'sign-out', translateKey: 'signOut', tab: 'sign-out' },
  ]

  constructor(
    private router: Router,
    private apiService: ApiService,
    private actR: ActivatedRoute,
    public authService: AuthService,
    private cookie: CookieService,
    private viewport: ViewportService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.setCurrentIndexFromRoute()

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.setCurrentIndexFromRoute()
      })

    this.viewport.Viewport$.pipe(untilDestroyed(this)).subscribe((value) => {
      this.viewportWidth = value.width
    })

    this.loadProfile()

    this.authService.name.pipe(untilDestroyed(this)).subscribe((value) => {
      this.name = value
    })
  }

  private setCurrentIndexFromRoute(): void {
    const fullUrl = this.router.url.split('?')[0]
    const lastSegment = fullUrl.split('/').pop() ?? ''
    const index = this.profileMenuItems.findIndex((item) => item.tab === lastSegment)
    this.authService.index.next(index !== -1 ? index : 0)
  }

  public setCurrentIndex(index: number): void {
    if (index !== this.profileMenuItems.length - 1) {
      this.authService.index.next(index)
      this.router
        .navigate([this.profileMenuItems[index].tab], {
          relativeTo: this.actR,
        })
        .catch((error: unknown) => {
          console.error(error)
        })
    } else if (index === this.profileMenuItems.length - 1) {
      this.logOut()
    }
  }

  private logOut(): void {
    this.logout = true
  }

  public cancel(): void {
    this.logout = false
  }

  public logOutConfirm(): void {
    this.router.navigateByUrl('/').catch((error: unknown) => {
      console.error(error)
    })
    this.cookie.delete('user-authed', '/')
    this.cookie.delete('access-token', '/')
    this.cartService.removeCart()
    this.authService.remveProfile()
    this.authService.name.next(null)
  }

  private loadProfile(): void {
    this.apiService
      .profile()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data: IProfile) => {
          this.authService.setName(data.name)
          this.authService.setProfile(data)
        },
        error: (error: unknown) => {
          console.error(error)
        },
      })
  }
}
