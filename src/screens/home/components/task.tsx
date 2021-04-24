import {dateLocale} from '@i18n';
import {format, parseISO} from 'date-fns';
import React from 'react';
import {useTranslation} from 'react-i18next';
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
  const {t} = useTranslation();

  const icon = isCompleted ? 'check' : 'checkbox-blank-outline';
  const iconColor = isCompleted ? colors.primary : colors.backdrop;
  const titleStyle: {} = isCompleted
    ? {textDecorationLine: 'line-through'}
    : {textDecorationLine: 'none'};

  const accessibilityHint = isCompleted
    ? t('task_is_completed_input.not_completed_label', 'Mark not completed')
    : t('task_is_completed_input.completed_label', 'Mark completed');

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
    return format(parseISO(value), 'EEE, d MMM', {locale: dateLocale});
  }
  return null;
};
