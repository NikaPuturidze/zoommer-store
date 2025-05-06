import { Component } from '@angular/core'
import { CategoryComponent } from './category/category.component'
import { ImageCarouselComponent } from './image-carousel/image-carousel.component'

@Component({
  selector: 'app-main',
  imports: [CategoryComponent, ImageCarouselComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
