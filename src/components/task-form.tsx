import React from 'react';
import {View} from 'react-native';
import DatePickerInput from './date-picker-input';
import TaskNameInput from './task-name-input';

const TaskForm = ({control, errors}: any) => (
  <View>
    <TaskNameInput control={control} errors={errors} />

    <DatePickerInput control={control} />
  </View>
);

export default TaskForm;
