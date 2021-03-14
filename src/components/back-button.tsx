import React from 'react';
import {Platform} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
  return (
    <IconButton
      icon={icon}
      color={Colors.white}
      onPress={onPress}
      accessibilityLabel="Back"
    />
  );
};

export default BackButton;
