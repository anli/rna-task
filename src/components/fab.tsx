import styled from '@emotion/native';
import {FAB as FABNative} from 'react-native-paper';

const FAB = styled(FABNative)<{backgroundColor: string}>`
  background-color: ${({backgroundColor}) => backgroundColor};
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

export default FAB;
