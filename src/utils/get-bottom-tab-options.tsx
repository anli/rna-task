import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const getBottomTabOptions = (icon: string): BottomTabNavigationOptions => ({
  tabBarIcon: ({color, size}) => <Icon name={icon} color={color} size={size} />,
});

export default getBottomTabOptions;
