import {Text} from '@components';
import styled from '@emotion/native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {List, useTheme} from 'react-native-paper';

const NO_TITLE_STYLE = {height: 0};

interface Props {
  control: any;
  accessibilityLabel: string;
  name?: string;
  onPress: () => void;
  completedLabel: string;
  notCompletedLabel: string;
}
const IsCompletedInput = ({
  control,
  accessibilityLabel,
  name = 'isCompleted',
  completedLabel,
  notCompletedLabel,
  onPress,
}: Props) => {
  const {colors} = useTheme();

  return (
    <Controller
      control={control}
      render={({onChange, value}) => {
        const onPressInput = () => {
          onChange(!value);
          onPress();
        };

        return (
          <Input
            accessibilityLabel={accessibilityLabel}
            testID="IsCompletedInput"
            onPress={onPressInput}
            titleStyle={NO_TITLE_STYLE}
            title={null}
            description={() => (
              <Description color={colors.primary}>
                {value ? completedLabel : notCompletedLabel}
              </Description>
            )}
            left={(props) => <List.Icon {...props} icon="check" />}
          />
        );
      }}
      name={name}
      rules={{required: false}}
      defaultValue={false}
    />
  );
};

export default IsCompletedInput;

const Input = styled(List.Item)`
  padding-top: 0px;
  padding-bottom: 0px;
`;

const Description = styled(Text)`
  margin-left: -12px;
  color: ${({color}) => color};
`;
