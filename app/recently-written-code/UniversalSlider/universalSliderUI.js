export class UniversalSliderUI {
  constructor(slides, displaySize) {
    this.slides = slides;
    this.slidesDisplayCount = displaySize;
    this.touchPositions = {
      initial: {x: 0, y: 0 },
      differences: { x: 0, y: 0}
    };
    this.showInactiveSlidesNumber = this.shouldShowInactiveSlidesNumber();
    this.inactiveSlidesNumber = this.calculateInactiveSlides();
  }

  shouldShowInactiveSlidesNumber() {
    return this.slides.length > this.slidesDisplayCount;
  }
  
  calculateInactiveSlides() {
    return this.showInactiveSlidesNumber ? this.slides.length - this.slidesDisplayCount : 0;
  }

  setTouchPositionsInitials(event) {
    const { clientX: x, clientY: y } = event.touches[0];
    this.touchPositions.initial = { x, y };
  }

  setTouchPositionsDifferences(event) {
    const { clientX, clientY } = event.touches[0];
    this.touchPositions.differences = { 
      x: this.touchPositions.initial.x - clientX, 
      y: this.touchPositions.initial.y - clientY
    };
  }

  isHorizontalSwipe() {
    return Math.abs(this.touchPositions.differences.x) > Math.abs(this.touchPositions.differences.y);
  }

  isSwipeLeft() {
    return this.touchPositions.differences.x > 0;
  }

  getSlidesAfterMoveBack(activeSlide) {
    const slidePosition = this.findSlidePosition(activeSlide);

    const prevSlideIndex = slidePosition ? slidePosition -1 : this.slides.length - 1;
    return this.getActiveSlides(prevSlideIndex);
  }

  getSlidesAfterMoveForward(activeSlide) {
    const slidePosition = this.findSlidePosition(activeSlide);

    const nextSlideIndex = this.isLastSlide(slidePosition) ? 0 : slidePosition + 1;
    return this.getActiveSlides(nextSlideIndex);
  }

  isLastSlide(position) {
    return position === this.slides.length -1 
  }

  makeSlideActive(slide) {
    return this.getActiveSlides(this.findSlidePosition(slide));
  }

  findSlidePosition(activeSlide) {
    return this.slides.indexOf(activeSlide);
  }

  getActiveSlides(cutOffStart = 0) {
    const cutOffLength = cutOffStart + this.slidesDisplayCount;
    let activeSlides = this.slides.slice(cutOffStart, cutOffLength);
    
    if (activeSlides.length < this.slidesDisplayCount) {
      const missingCount = this.slidesDisplayCount - activeSlides.length;
      activeSlides = [...activeSlides, ...this.slides.slice(0, missingCount)];
    }
    return activeSlides;
  }
}