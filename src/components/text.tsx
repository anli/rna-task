import styled from '@emotion/native';

const Text = styled.Text<{color: string}>`
  color: ${({color}) => color};
`;

export default Text;
