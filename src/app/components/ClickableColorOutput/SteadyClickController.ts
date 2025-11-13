import type { MouseEvent } from 'react';

export class SteadyClickController {
  readonly DRAG_DELAY = 100;
  readonly DRAG_THRESHOLD = 5;
  timer: ReturnType<typeof setTimeout> | null = null;
  dragging: boolean = false;
  initialMousePosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(private readonly callback: (e: MouseEvent<HTMLElement>) => void) {}

  onMouseDown = (e: MouseEvent<HTMLElement>) => {
    this.startTimer();
    this.initialMousePosition = { x: e.pageX, y: e.pageY };
  };

  onMouseUp = (e: MouseEvent<HTMLElement>) => {
    const { x, y } = this.initialMousePosition;
    if (
      Math.abs(x - e.pageX) < this.DRAG_THRESHOLD &&
      Math.abs(y - e.pageY) < this.DRAG_THRESHOLD &&
      !this.dragging
    ) {
      this.callback(e);
    }
    this.endTimer();
  };

  private startTimer = () => {
    this.timer = setTimeout(() => this.onTimer(), this.DRAG_DELAY);
  };

  private onTimer = () => {
    this.timer = null;
    this.dragging = true;
  };

  private endTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    setTimeout(() => (this.dragging = false));
  };
}
