import styled from '@emotion/native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {HelperText} from 'react-native-paper';

interface Props {
  control: any;
  label?: string;
  accessibilityLabel?: string;
  name?: string;
  errors: any;
  isCompleted?: boolean;
}

const TaskNameInput = ({
  control,
  label = 'Enter title',
  accessibilityLabel = 'Task Name',
  name = 'name',
  errors,
  isCompleted = false,
}: Props) => {
  return (
    <>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            isCompleted={isCompleted}
            placeholder={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            accessibilityLabel={accessibilityLabel}
          />
        )}
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
  padding: 16px 16px 16px 16px;
  font-size: 24px;
  text-decoration-line: ${({isCompleted}) =>
    isCompleted ? 'line-through' : 'none'};
`;
