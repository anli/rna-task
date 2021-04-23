import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const getBottomTabOptions = (
  icon: string,
  accessibilityLabel: string,
): BottomTabNavigationOptions => ({
  tabBarIcon: ({color, size}) => <Icon name={icon} color={color} size={size} />,
  tabBarAccessibilityLabel: accessibilityLabel,
});

export default getBottomTabOptions;
