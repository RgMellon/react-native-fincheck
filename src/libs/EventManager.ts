type EventProps = {
  event: string;
  listener: (payload?: any) => void;
};

type EmitProps = {
  event: string;
  payload: any;
};

export class EventManager {
  private listeners;

  constructor() {
    this.listeners = new Map();
  }

  on({ event, listener }: EventProps) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const currentListener = this.listeners.get(event);

    currentListener.push(listener);
  }

  emit({ event, payload }: EmitProps) {
    if (!this.listeners.has(event)) {
      return;
    }

    const currentEvent = this.listeners.get(event);

    currentEvent.forEach((currentListener: (payload: any) => void) => {
      currentListener(payload);
    });
  }

  removeListener(event: string, listener: (payload: any) => void) {
    if (!this.listeners.has(event)) {
      return;
    }

    const currentEvent = this.listeners.get(event);
    const filtredListener = currentEvent.filter(
      (currentListener: (payload: any) => void) => currentListener !== listener
    );

    this.listeners.set(event, filtredListener);
  }
}
