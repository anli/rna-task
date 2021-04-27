import {Text} from '@components';
import styled from '@emotion/native';
import {dateLocale} from '@i18n';
import {format, parseISO} from 'date-fns';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {List, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  title: string;
  onPress: () => void;
  date?: string;
  isCompleted?: boolean;
  onCompletePress: () => void;
  schedule?: {frequency: number; period: string};
}

const Task = ({
  title,
  date,
  onPress,
  isCompleted = false,
  onCompletePress,
  schedule,
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
    <>
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
        description={() => {
          return (
            <>
              <Description>
                <DescriptionText color={colors.backdrop}>
                  {getDescription(date)}
                </DescriptionText>
                {schedule && (
                  <ScheduleIcon
                    name="repeat"
                    color={colors.backdrop}
                    size={18}
                  />
                )}
              </Description>
            </>
          );
        }}
      />
    </>
  );
};

export default Task;

const getDescription = (value?: string) => {
  if (value) {
    return format(parseISO(value), 'EEE, d MMM', {locale: dateLocale});
  }
  return null;
};

const Description = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const DescriptionText = styled(Text)`
  font-size: 14px;
`;

const ScheduleIcon = styled(Icon)`
  padding: 0px 8px 0px 8px;
  align-self: center;
`;
