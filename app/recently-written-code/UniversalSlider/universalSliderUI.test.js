import { UniversalSliderUI } from './universalSliderUI';
import { shallow } from 'enzyme';

const slides = [1, 2, 3, 4, 5, 6, 7, 8];

const UI = new UniversalSliderUI(slides, 4);
UI.touchPositions.differences = { x: 300, y: 100 };

describe('UniversalSliderUI functionality', () => {
  test('shouldShowInactiveSlidesNumber should be true', () => {
    expect(UI.shouldShowInactiveSlidesNumber()).toBe(true)
  });

  test('calculateInactiveSlides shoud return 4', () => {
    expect(UI.calculateInactiveSlides()).toBe(4);
  });

  test('getActiveSlides should return [5, 6, 7, 8]', () => {
    expect(UI.getActiveSlides(4)).toEqual([5, 6, 7, 8]);
  });

  test(`getActiveSlides should populate array with
        first slides when cut off is on the end of slides`, () => {
    expect(UI.getActiveSlides(7)).toEqual([8, 1, 2, 3]);
  });

  test('findSlidePosition should return 3', () => {
    expect(UI.findSlidePosition(4)).toBe(3);
  });

  test('makeSlideActive should return array with 2 being first', () => {
    expect(UI.makeSlideActive(2)[0]).toBe(2);
  });

  test('isLastSlide should return true', () => {
    expect(UI.isLastSlide(7)).toBe(true);
  });

  test('isLastSlide should return false', () => {
    expect(UI.isLastSlide(3)).toBe(false);
  });

  test('getSlidesAfterMoveBack should return [4, 5, 6, 7]', () => {
    expect(UI.getSlidesAfterMoveBack(5)).toEqual([4, 5, 6, 7]);
  });

  test('getSlidesAfterMoveForward should return [5, 6, 7, 8]', () => {
    expect(UI.getSlidesAfterMoveForward(4)).toEqual([5, 6, 7, 8]);
  });

  test('isHorizontalSwipe shoul return true', () => {
    expect(UI.isHorizontalSwipe()).toBe(true);
  });

  test('isSwipeLeft should return true', () => {
    expect(UI.isSwipeLeft()).toBe(true);
  });
});