import React from 'react';
import {List} from 'react-native-paper';

interface Props {
  title: string;
  onPress: () => void;
}
const Task = ({title, onPress}: Props) => (
  <List.Item title={title} onPress={onPress} />
);

export default Task;
