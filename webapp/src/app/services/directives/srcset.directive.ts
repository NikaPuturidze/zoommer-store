import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appSrcset]',
})
export class SrcsetDirective implements OnChanges {
  @Input('appSrcset') imageUrl!: string
  @Input() quality = 30
  @Input() defaultWidth = 1200

  private allowedWidths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    if (!this.imageUrl) return

    const encodedUrl = encodeURIComponent(this.imageUrl)
    const base = `https://zoommer.ge/_next/image?url=${encodedUrl}`

    const srcset = this.allowedWidths
      .map((w) => `${base}&w=${w.toString()}&q=${this.quality.toString()} ${w.toString()}w`)
      .join(', ')

    const source = `${base}&w=${this.defaultWidth.toString()}&q=${this.quality.toString()}`

    this.renderer.setAttribute(this.element.nativeElement, 'srcset', srcset)
    this.renderer.setAttribute(this.element.nativeElement, 'src', source)
    this.renderer.setAttribute(
      this.element.nativeElement,
      'sizes',
      `(max-width: ${this.defaultWidth.toString()}px) 100vw, ${this.defaultWidth.toString()}px`
    )
  }
}
