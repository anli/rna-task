import styled from '@emotion/native';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {List} from 'react-native-paper';
import ChipInput from '../chip-input';
import {Props} from './../date-picker-input';
import {ScheduleDialog} from './components';

const NO_TITLE_STYLE = {height: 0};

const ScheduleInput = ({
  control,
  accessibilityLabel,
  name = 'schedule',
  onUpdate,
  disabled = false,
  placeholder,
}: Props) => {
  const [show, setShow] = useState(false);

  const onShowPicker = () => {
    setShow(true);
  };

  const onDismissPicker = () => {
    setShow(false);
  };

  return (
    <Controller
      control={control}
      render={({onChange, value}) => {
        const onClear = () => {
          onChange(null);
          onUpdate && onUpdate();
        };

        const onChangeSchedule = (scheduleValue: {
          period: string;
          frequency: number;
        }) => {
          onChange(scheduleValue);
          onDismissPicker();
          onUpdate && onUpdate();
        };

        return (
          <>
            <Input
              disabled={disabled}
              testID="ScheduleInput"
              onPress={onShowPicker}
              titleStyle={NO_TITLE_STYLE}
              title={null}
              description={() => (
                <ChipInput
                  placeholder={placeholder}
                  disabled={disabled}
                  value={getChipValue(value)}
                  onClear={onClear}
                  accessibilityLabel={accessibilityLabel}
                  closeIconAccessibilityLabel="Clear Schedule"
                />
              )}
              left={(props) => <List.Icon {...props} icon="repeat" />}
            />

            <ScheduleDialog
              values={value}
              onConfirm={onChangeSchedule}
              visible={show}
              onDismiss={onDismissPicker}
            />
          </>
        );
      }}
      name={name}
      rules={{required: false}}
      defaultValue={null}
    />
  );
};

export default ScheduleInput;

const Input = styled(List.Item)`
  padding-top: 0px;
  padding-bottom: 0px;
`;

const getChipValue = (value: any) => {
  if (value) {
    const period =
      value.frequency === 1 ? value.period.slice(0, -1) : value.period;
    return `Repeats every ${value.frequency} ${period}`;
  }

  return null;
};
