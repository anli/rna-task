import styled from '@emotion/native';
import React from 'react';
import {FAB, useTheme} from 'react-native-paper';

interface Props {
  onPress: () => any;
  disabled: boolean;
  loading: boolean;
}

const SaveButton = ({onPress, disabled, loading}: Props) => {
  const {colors} = useTheme();

  return (
    <Button
      backgroundColor={colors.primary}
      disabled={disabled}
      loading={loading}
      accessibilityLabel="Save"
      icon="check"
      onPress={onPress}
    />
  );
};

export default SaveButton;

const Button = styled(FAB)<{backgroundColor: string}>`
  background-color: ${({backgroundColor}) => backgroundColor};
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
