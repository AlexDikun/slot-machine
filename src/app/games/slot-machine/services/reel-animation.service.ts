// src/app/games/slot-machine/services/reel-animation.service.ts

import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class ReelAnimationService {

  spinReel(
    reelEl: HTMLElement,      // барабан в DOM, подлежащий раскрутке
    finalIndex: number,       // индекс элемента, на котором остановится барабан
    symbolHeight: number,     // высота одного символа
    duration: number,         // длительность анимации
    onComplete: () => void    // функция, после завершения анимации
  ) {
    /* 
      gsap.to — анимирует DOM элемент reelEl
      y: -finalIndex * symbolHeight — сдвигает барабан по вертикали, чтобы показать нужный символ
      duration — длительность анимации
      ease: 'power2.out' — плавность движения
      onComplete — вызывается после окончания анимации
    */
    gsap.to(reelEl, {         
      y: -finalIndex * symbolHeight,
      duration,
      ease: 'power2.out',     
      onComplete,
    });
  }

  /*
  Параметры:
    reelEl: HTMLElement — барабан в DOM
    index: number — индекс символа, на который нужно сбросить позицию
    symbolHeight: number — высота символа в пикселях
  Тело функции:
      gsap.set — мгновенное применение к элементу определённого состояния.
        Используется для сброса барабана перед новым спином. 
        Cразу ставит элемент на нужную вертикальную позицию без анимации.
  */
  resetPosition(reelEl: HTMLElement, index: number, symbolHeight: number) {
    gsap.set(reelEl, { 
      y: -index * symbolHeight,
    });
  }
}
