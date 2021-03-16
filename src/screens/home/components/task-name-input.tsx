import React from 'react';
import {Controller} from 'react-hook-form';
import {HelperText, TextInput} from 'react-native-paper';

interface Props {
  control: any;
  label?: string;
  accessibilityLabel?: string;
  name?: string;
  errors: any;
}

const TaskNameInput = ({
  control,
  label = 'Task Name',
  accessibilityLabel = 'Task Name',
  name = 'name',
  errors,
}: Props) => {
  return (
    <>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            label={label}
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
      <HelperText type="error" visible={Boolean(errors?.name)}>
        This is required.
      </HelperText>
    </>
  );
};

export default TaskNameInput;
