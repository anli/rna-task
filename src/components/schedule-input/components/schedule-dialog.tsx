import styled from '@emotion/native';
import Slider from '@react-native-community/slider';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  RadioButton,
  useTheme,
} from 'react-native-paper';

const LABEL_STYLE = {fontSize: 14};

interface FormData {
  period: string;
  frequency: number;
}

interface ScheduleDialogProps {
  visible: boolean;
  onDismiss: () => any;
  values?: FormData;
  onConfirm: (schedule: FormData) => any;
}

const ScheduleDialog = ({
  visible,
  onDismiss,
  values,
  onConfirm,
}: ScheduleDialogProps) => {
  const {control, handleSubmit} = useForm<FormData>();
  const {colors} = useTheme();

  const LABEL_STYLE_DISABLED = {fontSize: 14, color: colors.disabled};
  const defaultFrequency = values?.frequency || 1;
  const defaultPeriod = values?.period || 'week';

  const onDone = handleSubmit(async (formData) => {
    onConfirm(formData);
  });

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Schedule</Dialog.Title>
        <Dialog.Content>
          <Controller
            control={control}
            name="frequency"
            rules={{required: true, min: 1, max: 12}}
            defaultValue={defaultFrequency}
            render={({onChange, value}) => (
              <>
                <Paragraph>Repeat every {value}</Paragraph>
                <FrequencySlider
                  accessibilityLabel="Frequency Slider Input"
                  minimumValue={1}
                  maximumValue={12}
                  step={1}
                  value={value}
                  onValueChange={onChange}
                  minimumTrackTintColor={colors.primary}
                  thumbTintColor={colors.primary}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="period"
            rules={{required: true, min: 1, max: 12}}
            defaultValue={defaultPeriod}
            render={({onChange, value}) => (
              <RadioButton.Group onValueChange={onChange} value={value}>
                <PeriodOption
                  disabled
                  labelStyle={LABEL_STYLE_DISABLED}
                  label="Day"
                  value="day"
                />
                <PeriodOption
                  labelStyle={LABEL_STYLE}
                  label="Week"
                  value="week"
                />
                <PeriodOption
                  disabled
                  labelStyle={LABEL_STYLE_DISABLED}
                  label="Month"
                  value="month"
                />
              </RadioButton.Group>
            )}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <DialogButton
            uppercase={false}
            onPress={onDismiss}
            color={colors.placeholder}>
            Cancel
          </DialogButton>
          <DialogButton uppercase={false} onPress={onDone}>
            Done
          </DialogButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ScheduleDialog;

const DialogButton = styled(Button)`
  margin-left: 16px;
`;

const PeriodOption = styled(RadioButton.Item)`
  padding: 0px 0px 0px 0px;
`;

const FrequencySlider = styled(Slider)`
  width: 100%;
  margin-left: -8px;
  height: 48px;
`;
