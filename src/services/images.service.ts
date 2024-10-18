import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private sanitizer: DomSanitizer) { }

  getSafeImageUrl(img: string): SafeUrl {
    let cleanedUrl = img.replace(/[\[\]"]/g, '');
    return this.sanitizer.bypassSecurityTrustUrl(cleanedUrl);
  }

  onImageError(event: Event, fallbackImageUrl: string): void {
    const imgElement = event.target as HTMLImageElement;
    console.warn('Imagem falhou ao carregar:', imgElement.src);

    if (imgElement.src !== fallbackImageUrl) {
      imgElement.src = fallbackImageUrl;
    } else {
      console.error('Imagem de fallback também falhou:', imgElement.src);

      imgElement.onerror = null;
    }
  }
}
