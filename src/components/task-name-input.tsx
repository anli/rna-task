import styled from '@emotion/native';
import * as chrono from 'chrono-node';
import {formatISO} from 'date-fns';
import NativeDebounce from 'lodash.debounce';
import R from 'ramda';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {ActivityIndicator, HelperText, useTheme} from 'react-native-paper';
import Text from './text';

interface Props {
  control: any;
  label?: string;
  accessibilityLabel?: string;
  name?: string;
  errors: any;
  isCompleted?: boolean;
  onProcessText?: (date: string) => void;
}

type FormattedValue = (string | Element)[] | string | undefined;

const debounce = NativeDebounce((callback) => callback(), 1000);

const TaskNameInput = ({
  control,
  label = 'Enter title',
  accessibilityLabel = 'Task Name',
  name = 'name',
  errors,
  isCompleted = false,
  onProcessText,
}: Props) => {
  const [formattedValue, setFormattedValue] = useState<FormattedValue>(
    undefined,
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const {colors} = useTheme();

  const onChangeText = (input: string) => {
    const result = processText(input, colors.primary);

    if (result) {
      const {texts, date} = result;
      setFormattedValue(texts);
      onProcessText && onProcessText(date);
      setIsProcessing(false);
      return;
    }

    setFormattedValue(input);
    setIsProcessing(false);
    return;
  };

  return (
    <>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => {
          const displayValue = formattedValue ? formattedValue : value;
          return (
            <InputContainer>
              <Input
                isCompleted={isCompleted}
                placeholder={label}
                onChangeText={(text) => {
                  onProcessText && setIsProcessing(true);
                  onChange(text);
                  onProcessText && debounce(() => onChangeText(text));
                }}
                onBlur={onBlur}
                accessibilityLabel={accessibilityLabel}
                multiline>
                {displayValue}
              </Input>
              {isProcessing && (
                <ProcessTextIndicator
                  accessibilityLabel="Process Text Indicator"
                  size={24}
                />
              )}
            </InputContainer>
          );
        }}
        name={name}
        rules={{required: true}}
        defaultValue=""
      />
      {Boolean(errors?.name) && (
        <HelperText type="error" visible={Boolean(errors?.name)}>
          This is required.
        </HelperText>
      )}
    </>
  );
};

export default TaskNameInput;

const Input = styled.TextInput<{isCompleted?: boolean}>`
  font-size: 24px;
  text-decoration-line: ${({isCompleted}) =>
    isCompleted ? 'line-through' : 'none'};
  padding: 0px 0px 0px 0px;
`;

const processText = (input: string, color: string) => {
  const result = R.head(R.reverse(chrono.parse(input)));
  if (result) {
    const {index: startPosition, text} = result;
    const endPosition = startPosition + text.length;

    const texts = [
      R.slice(0, startPosition)(input),
      <DateText key="DateText" color={color}>
        {R.slice(startPosition, endPosition)(input)}
      </DateText>,
      R.slice(endPosition, Infinity)(input),
    ];

    const date = formatISO(result.start.date(), {representation: 'date'});
    return {texts, date};
  }

  return undefined;
};

const DateText = styled(Text)``;

const ProcessTextIndicator = styled(ActivityIndicator)`
  position: absolute;
  right: 16px;
  top: 20px;
`;

const InputContainer = styled.View`
  padding: 16px 16px 16px 16px;
  flex-direction: row;
`;
