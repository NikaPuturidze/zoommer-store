import { Component, ElementRef, HostListener, ViewChild } from '@angular/core'
import { CategoryComponent } from './category/category.component'
import { ImageCarouselComponent } from './image-carousel/image-carousel.component'
import { EImage, IContentResponse } from '../interfaces/content.interface'

@Component({
  selector: 'app-main',
  imports: [CategoryComponent, ImageCarouselComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public content?: IContentResponse
  public carouselWidth = 0

  @ViewChild(ImageCarouselComponent, { read: ElementRef, static: true })
  private carouselHost!: ElementRef<HTMLElement>

  ngAfterViewInit(): void {
    this.updateCarouselWidth()
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.updateCarouselWidth()
  }

  private updateCarouselWidth(): void {
    setTimeout(() => {
      this.carouselWidth = this.carouselHost.nativeElement.offsetWidth + EImage.GAP
    })
  }
}
