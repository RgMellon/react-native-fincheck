import { format, parse } from "date-fns";

export function formateDateBeforeSend(date: string) {
  return format(
    parse(date, "dd/MM/yyyy", new Date()),
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
  );
}
