import styled from '@emotion/native';
import * as chrono from 'chrono-node';
import {formatISO} from 'date-fns';
import NativeDebounce from 'lodash.debounce';
import R from 'ramda';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {HelperText, IconButton, useTheme} from 'react-native-paper';
import Text from './text';

interface Props {
  control: any;
  label?: string;
  accessibilityLabel?: string;
  name?: string;
  errors: any;
  isCompleted?: boolean;
  onProcessText?: (date: string) => void;
  onUpdate?: () => void;
  editable?: boolean;
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
  onUpdate = () => {},
}: Props) => {
  const [formattedValue, setFormattedValue] = useState<FormattedValue>(
    undefined,
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const {colors} = useTheme();

  const onChangeText = (input: string, onChange?: (text: string) => any) => {
    const result = processText(input, colors.primary);

    if (result) {
      const {texts, date, value} = result;
      setFormattedValue(texts);
      onProcessText && onProcessText(date);
      setIsProcessing(false);
      onChange && onChange(value);
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
          const onClearText = () => {
            onChange('');
            onChangeText('');
            onUpdate();
          };
          const canClear = !isProcessing && !isCompleted && !R.isEmpty(value);

          return (
            <InputContainer>
              <Input
                editable={!isCompleted}
                isCompleted={isCompleted}
                placeholder={label}
                onChangeText={(text) => {
                  onProcessText && setIsProcessing(true);
                  onChange(text);
                  onProcessText && debounce(() => onChangeText(text, onChange));
                }}
                onBlur={() => {
                  onBlur;
                  onUpdate();
                }}
                accessibilityLabel={accessibilityLabel}
                multiline>
                {displayValue}
              </Input>
              {canClear && (
                <ClearTextButton
                  accessibilityLabel="Clear Text Button"
                  icon="close"
                  onPress={onClearText}
                  size={16}
                />
              )}
              {isProcessing && (
                <ProcessTextIndicator
                  accessibilityLabel="Process Text Indicator"
                  color={colors.placeholder}
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
  flex: 1;
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
    const value = R.pipe(
      R.trim,
      R.replace(/  +/g, ' '),
    )(R.slice(0, startPosition)(input) + R.slice(endPosition, Infinity)(input));

    return {texts, date, value};
  }

  return undefined;
};

const DateText = styled(Text)``;

const ProcessTextIndicator = styled.ActivityIndicator``;

const InputContainer = styled.View`
  padding: 16px 16px 16px 16px;
  flex-direction: row;
`;

const ClearTextButton = styled(IconButton)`
  padding: 0px 0px 0px 0px;
  margin: 4px 0px 0px 0px;
`;
