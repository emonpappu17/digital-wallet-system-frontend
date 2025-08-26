import { parseISO, format } from "date-fns";

export const handleFormateDate = (v: string) => {
    console.log(v);
    const date = parseISO(v);
    return format(date, "h:mma dd/MM/yy").toLowerCase();
}