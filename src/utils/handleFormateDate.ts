import { parseISO, format } from "date-fns";

export const handleFormateDate = (v: string) => {
    const date = parseISO(v);
    return format(date, "h:mma dd/MM/yy").toLowerCase();
}