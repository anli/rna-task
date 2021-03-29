import styled from '@emotion/native';
import React from 'react';
import {FAB} from 'react-native-paper';

interface Props {
  onPress: () => any;
  disabled: boolean;
  loading: boolean;
}

const SaveButton = ({onPress, disabled, loading}: Props) => {
  return (
    <Button
      disabled={disabled}
      loading={loading}
      accessibilityLabel="Save"
      icon="check"
      onPress={onPress}
    />
  );
};

export default SaveButton;

const Button = styled(FAB)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
