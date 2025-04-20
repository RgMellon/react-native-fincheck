import { EventManager } from "../libs/EventManager";

export const dialogEvent = new EventManager();

type DialogProps = {
  event: string;
  payload?: any;
};

export function dialogEmit({ event, payload = {} }: DialogProps) {
  dialogEvent.emit({
    event,
    payload,
  });
}
