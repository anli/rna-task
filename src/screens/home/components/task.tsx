import {formatRelative, parseISO} from 'date-fns';
import {enUS} from 'date-fns/esm/locale';
import React from 'react';
import {List} from 'react-native-paper';

interface Props {
  title: string;
  onPress: () => void;
  date?: string;
}
const Task = ({title, date, onPress}: Props) => (
  <List.Item
    title={title}
    onPress={onPress}
    description={getDescription(date)}
  />
);

export default Task;

const getDescription = (date?: string) => {
  if (date) {
    const locale = {
      ...enUS,
      formatRelative: (token: any) => formatRelativeLocale[token],
    };
    return formatRelative(parseISO(date), new Date(), {locale});
  }
  return null;
};

const formatRelativeLocale = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday",
  today: "'Today",
  tomorrow: "'Tomorrow",
  nextWeek: 'eeee',
  other: 'EEE, d MMM yyyy',
} as any;
