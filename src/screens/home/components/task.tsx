import {format, parseISO} from 'date-fns/fp';
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

const getDescription = (value?: string) => {
  if (value) {
    return format('EEE, d MMM')(parseISO(value));
  }
  return null;
};
