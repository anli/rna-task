import React from 'react';
import {Platform} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';

interface Props {
  onPress?: () => void;
}

const ANDROID_ICON = 'arrow-left';
const IOS_ICON = 'chevron-left';

const icon = Platform.select({
  ios: IOS_ICON,
  android: ANDROID_ICON,
}) as string;

const BackButton = ({onPress}: Props) => {
  const {colors} = useTheme();
  return (
    <IconButton
      icon={icon}
      color={colors.text}
      onPress={onPress}
      accessibilityLabel="Back"
    />
  );
};

export default BackButton;
