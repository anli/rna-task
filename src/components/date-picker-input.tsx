import styled from '@emotion/native';
import {dateLocale} from '@i18n';
import {format, formatISO, parseISO} from 'date-fns';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {List} from 'react-native-paper';
import ChipInput from './chip-input';

const NO_TITLE_STYLE = {height: 0};

const TODAY_DATE_STRING = formatISO(new Date(new Date().setHours(0, 0, 0, 0)), {
  representation: 'date',
});
export interface Props {
  control: any;
  accessibilityLabel?: string;
  name?: string;
  onUpdate?: () => any;
  disabled?: boolean;
  placeholder?: string;
}

const DatePickerInput = ({
  control,
  accessibilityLabel = 'Selected Date',
  name = 'date',
  onUpdate,
  disabled = false,
  placeholder = 'Add date',
}: Props) => {
  const [show, setShow] = useState(false);

  const onShow = () => {
    setShow(true);
  };

  const onCancel = () => {
    setShow(false);
  };

  const onConfirm = (selectedDate: Date, onChange: any) => {
    setShow(false);
    onChange(formatISO(selectedDate as Date, {representation: 'date'}));
    onUpdate && onUpdate();
  };

  return (
    <Controller
      control={control}
      render={({onChange, value}) => {
        const onClearDate = () => {
          onChange(null);
          onUpdate && onUpdate();
        };

        return (
          <>
            <Input
              disabled={disabled}
              testID="DateInput"
              onPress={onShow}
              titleStyle={NO_TITLE_STYLE}
              title={null}
              description={() => {
                const chipValue = value
                  ? format(parseISO(value), 'EEE, d MMM', {
                      locale: dateLocale,
                    })
                  : null;
                return (
                  <ChipInput
                    placeholder={placeholder}
                    disabled={disabled}
                    value={chipValue}
                    onClear={onClearDate}
                    accessibilityLabel={accessibilityLabel}
                    closeIconAccessibilityLabel="Clear Date"
                  />
                );
              }}
              left={(props) => <List.Icon {...props} icon="calendar" />}
            />
            {show && (
              <DateTimePickerModal
                testID="DateTimePicker"
                isVisible={show}
                mode="date"
                onConfirm={(date) => onConfirm(date, onChange)}
                onCancel={onCancel}
                is24Hour={false}
                date={getDateValue(value || undefined)}
              />
            )}
          </>
        );
      }}
      name={name}
      rules={{required: false}}
      defaultValue={TODAY_DATE_STRING}
    />
  );
};

export default DatePickerInput;

const getDateValue = (value: string = TODAY_DATE_STRING): Date => {
  return parseISO(value);
};

const Input = styled(List.Item)`
  padding-top: 0px;
  padding-bottom: 0px;
`;
