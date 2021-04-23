import React from 'react';
import {useTheme} from 'react-native-paper';
import FAB from './fab';

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
      color={colors.background}
      disabled={disabled}
      loading={loading}
      accessibilityLabel="Save"
      icon="check"
      onPress={onPress}
    />
  );
};

export default SaveButton;
