import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Activar el carrusel al cargar la vista
    this.activateCarousel();
  }

  private activateCarousel() {
    // Esperar un breve momento para que el carrusel se renderice completamente
    setTimeout(() => {
      // Activar el carrusel usando jQuery
      (window as any).$('#carouselExampleSlidesOnly').carousel();
    }, 100);
  }
}
