import {
  BackButton,
  DatePickerInput,
  Header,
  SaveButton,
  TaskNameInput,
} from '@components';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {useAppDispatch} from '@store';
import {TaskActions} from '@task';
import {dispatchAsyncAction, STATUS} from '@utils';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Appbar} from 'react-native-paper';

interface FormData {
  name: string;
  date?: string;
}

const Component = (): JSX.Element => {
  const {goBack, canGoBack} = useNavigation();
  const {control, handleSubmit, errors, setValue} = useForm<FormData>();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
  const {t} = useTranslation();

  const onBack = () => {
    canGoBack() && goBack();
  };

  const onSave = handleSubmit(async (task) => {
    const isSuccessful = await dispatchAsyncAction({
      setStatus,
      dispatch,
      action: TaskActions.create(task),
    });
    isSuccessful && onBack();
  });

  const onProcessText = (date: string) => {
    date && setValue('date', date);
  };

  return (
    <Screen>
      <Header>
        <BackButton onPress={onBack} />
        <Appbar.Content title="" />
      </Header>
      <TaskNameInput
        label={t('task_name_input.label', 'Enter title')}
        accessibilityLabel={t(
          'task_name_input.accessibility_label',
          'Task Name',
        )}
        control={control}
        errors={errors}
        onProcessText={onProcessText}
      />
      <DatePickerInput
        placeholder={t('task_name_input.placeholder', 'Add date')}
        control={control}
        accessibilityLabel={t(
          'date_picker_input.accessibility_label',
          'Selected Date',
        )}
      />
      <SaveButton
        accessibilityLabel={t('task_save_button.accessibility_label', 'Save')}
        disabled={status === STATUS.LOADING}
        loading={status === STATUS.LOADING}
        onPress={onSave}
      />
    </Screen>
  );
};

export const options: StackNavigationOptions = {
  headerShown: false,
};

export default class TaskAddScreen {
  static Component = Component;
  static options = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;
