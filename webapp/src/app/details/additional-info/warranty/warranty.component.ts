import { Component, Input } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
@Component({
  selector: 'app-warranty',
  imports: [TranslateModule],
  templateUrl: './warranty.component.html',
  styleUrl: './warranty.component.scss',
})
export class WarrantyComponent {
  @Input() manualsFileUrl = ''
  @Input() certificateFileUrl = ''
  public isWarrantyOpen = false

  public openExternalLink(link: string): void {
    window.open(link, '_blank')
  }

  public toggleWarranty(): void {
    this.isWarrantyOpen = !this.isWarrantyOpen

    if (this.isWarrantyOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}
