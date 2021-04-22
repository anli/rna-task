import {format, parseISO} from 'date-fns/fp';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {List, useTheme} from 'react-native-paper';

interface Props {
  title: string;
  onPress: () => void;
  date?: string;
  isCompleted?: boolean;
  onCompletePress: () => void;
}

const Task = ({
  title,
  date,
  onPress,
  isCompleted = false,
  onCompletePress,
}: Props) => {
  const {colors} = useTheme();
  const icon = isCompleted ? 'check' : 'checkbox-blank-outline';
  const iconColor = isCompleted ? colors.primary : colors.backdrop;
  const titleStyle: {} = isCompleted
    ? {textDecorationLine: 'line-through'}
    : {textDecorationLine: 'none'};

  const accessibilityHint = isCompleted
    ? 'Mark not completed'
    : 'Mark completed';

  return (
    <List.Item
      title={title}
      titleStyle={titleStyle}
      right={(props) => (
        <TouchableOpacity
          onPress={onCompletePress}
          accessibilityHint={accessibilityHint}>
          <List.Icon {...props} icon={icon} color={iconColor} />
        </TouchableOpacity>
      )}
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
