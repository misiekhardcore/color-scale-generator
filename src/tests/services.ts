type FakeMouseEventInit = {
  bubbles: boolean;
  cancelable: boolean;
  composed: boolean;
  altKey: boolean;
  button: 0 | 1 | 2 | 3 | 4;
  buttons: number;
  clientX: number;
  clientY: number;
  ctrlKey: boolean;
  metaKey: boolean;
  movementX: number;
  movementY: number;
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  shiftKey: boolean;
  x: number;
  y: number;
};

class FakeMouseEvent extends MouseEvent {
  constructor(type: string, values: Partial<FakeMouseEventInit>) {
    const { pageX, pageY, offsetX, offsetY, x, y, ...mouseValues } = values;
    super(type, mouseValues);

    // Use Object.defineProperty to set read-only properties that JSDOM doesn't allow setting directly
    Object.defineProperty(this, 'offsetX', {
      value: offsetX || 0,
      writable: false,
      configurable: true,
    });
    Object.defineProperty(this, 'offsetY', {
      value: offsetY || 0,
      writable: false,
      configurable: true,
    });
    Object.defineProperty(this, 'pageX', {
      value: pageX || 0,
      writable: false,
      configurable: true,
    });
    Object.defineProperty(this, 'pageY', {
      value: pageY || 0,
      writable: false,
      configurable: true,
    });
    Object.defineProperty(this, 'x', {
      value: x || 0,
      writable: false,
      configurable: true,
    });
    Object.defineProperty(this, 'y', {
      value: y || 0,
      writable: false,
      configurable: true,
    });
  }
}

export function getMouseEvent(
  type: string,
  values: Partial<FakeMouseEventInit> = {}
): FakeMouseEvent {
  values = {
    bubbles: true,
    cancelable: true,
    ...values,
  };
  return new FakeMouseEvent(type, values);
}
