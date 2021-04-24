import React from 'react';
import {useTheme} from 'react-native-paper';
import FAB from './fab';

interface Props {
  onPress: () => any;
  disabled: boolean;
  loading: boolean;
  accessibilityLabel: string;
}

const SaveButton = ({
  onPress,
  disabled,
  loading,
  accessibilityLabel,
}: Props) => {
  const {colors} = useTheme();

  return (
    <FAB
      backgroundColor={colors.primary}
      color={colors.background}
      disabled={disabled}
      loading={loading}
      accessibilityLabel={accessibilityLabel}
      icon="check"
      onPress={onPress}
    />
  );
};

export default SaveButton;
