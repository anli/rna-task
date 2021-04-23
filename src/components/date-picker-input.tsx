import styled from '@emotion/native';
import {formatISO, parseISO} from 'date-fns';
import {format} from 'date-fns/fp';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Chip, List, Text} from 'react-native-paper';

const NO_TITLE_STYLE = {height: 0};

const TODAY_DATE_STRING = formatISO(new Date(new Date().setHours(0, 0, 0, 0)), {
  representation: 'date',
});
interface Props {
  control: any;
  accessibilityLabel?: string;
  name?: string;
  onUpdate?: () => any;
}

const DatePickerInput = ({
  control,
  accessibilityLabel = 'Selected Date',
  name = 'date',
  onUpdate,
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
              testID="DateInput"
              onPress={onShow}
              titleStyle={NO_TITLE_STYLE}
              title={null}
              description={() => (
                <Description
                  value={value}
                  onClearDate={onClearDate}
                  accessibilityLabel={accessibilityLabel}
                />
              )}
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

const ChipContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const getDateValue = (value: string = TODAY_DATE_STRING): Date => {
  return parseISO(value);
};

const Input = styled(List.Item)`
  padding-top: 0px;
  padding-bottom: 0px;
`;

const Description = ({value, onClearDate, accessibilityLabel}: any) => {
  return (
    <DescriptionContainer>
      {value ? (
        <ChipContainer>
          <Chip
            testID="ShowDateTimePicker"
            mode="outlined"
            accessibilityLabel={accessibilityLabel}
            onClose={onClearDate}>
            {format('EEE, d MMM')(parseISO(value))}
          </Chip>
        </ChipContainer>
      ) : (
        <Text>Add date</Text>
      )}
    </DescriptionContainer>
  );
};

const DescriptionContainer = styled.View`
  margin-left: -12px;
`;
