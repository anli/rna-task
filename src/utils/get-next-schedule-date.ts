import {formatISO} from 'date-fns';
import add from 'date-fns/add';

const getNextScheduleDateString = (
  date: string,
  period: string,
  frequency: number,
) => {
  const newDate = add(new Date(date), {[period]: frequency});
  return formatISO(newDate, {representation: 'date'});
};

export default getNextScheduleDateString;
