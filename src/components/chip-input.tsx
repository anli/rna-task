import styled from '@emotion/native';
import React from 'react';
import {Chip, useTheme} from 'react-native-paper';
import Text from './text';

const ChipInput = ({
  placeholder,
  value,
  onClear,
  accessibilityLabel,
  disabled,
  closeIconAccessibilityLabel,
}: any) => {
  const {colors} = useTheme();
  const color = disabled ? colors.disabled : colors.text;

  return (
    <DescriptionContainer>
      {value ? (
        <ChipContainer>
          <Chip
            disabled={disabled}
            testID="ShowDateTimePicker"
            mode="outlined"
            accessibilityLabel={accessibilityLabel}
            closeIconAccessibilityLabel={closeIconAccessibilityLabel}
            onClose={() => !disabled && onClear()}>
            {value}
          </Chip>
        </ChipContainer>
      ) : (
        <Text color={color}>{placeholder}</Text>
      )}
    </DescriptionContainer>
  );
};

export default ChipInput;

const DescriptionContainer = styled.View`
  margin-left: -12px;
`;

const ChipContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
