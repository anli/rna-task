import {format, parseISO} from 'date-fns/fp';
import React from 'react';
import {List, useTheme} from 'react-native-paper';

interface Props {
  title: string;
  onPress: () => void;
  date?: string;
  isCompleted?: boolean;
}

const Task = ({title, date, onPress, isCompleted = false}: Props) => {
  console.log({title, isCompleted});
  const {colors} = useTheme();
  const icon = isCompleted ? 'check' : 'checkbox-blank-outline';
  const iconColor = isCompleted ? colors.primary : colors.backdrop;
  const titleStyle: {} = isCompleted
    ? {textDecorationLine: 'line-through'}
    : {textDecorationLine: 'none'};

  return (
    <List.Item
      title={title}
      titleStyle={titleStyle}
      right={(props) => <List.Icon {...props} icon={icon} color={iconColor} />}
      onPress={onPress}
      description={getDescription(date)}
    />
  );
};

export default Task;

const getDescription = (value?: string) => {
  if (value) {
    return format('EEE, d MMM')(parseISO(value));
  }
  return null;
};
