import styled from '@emotion/native';
import {defaultTheme} from '@themes';
import {Appbar} from 'react-native-paper';

const Header = styled(Appbar.Header)`
  background-color: ${defaultTheme.colors.background};
  border-width: 0;
  elevation: 0;
`;

export default Header;
