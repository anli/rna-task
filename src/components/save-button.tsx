import {FAB} from '@components';
import React from 'react';
import {useTheme} from 'react-native-paper';

interface Props {
  onPress: () => any;
  disabled: boolean;
  loading: boolean;
}

const SaveButton = ({onPress, disabled, loading}: Props) => {
  const {colors} = useTheme();

  return (
    <FAB
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
