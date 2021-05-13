import styled from '@emotion/native';
import {Tab, TabView} from '@ui-kitten/components';
import React from 'react';
import {useTranslation} from 'react-i18next';

interface FilterOption {
  key: string;
  labelDefaultValue: string;
  labelTranslationKey: string;
}

interface Props {
  onSelect: (key: string) => any;
  value: string;
  options: FilterOption[];
}

const FilterTaskTabs = ({onSelect, value, options}: Props) => {
  const {t} = useTranslation();
  const index = options.findIndex(({key}) => key === value);

  const onSelectTab = (selectedIndex: number) => {
    if (Number.isFinite(selectedIndex)) {
      const key = options[selectedIndex].key;
      onSelect(key);
    }
  };

  return (
    <TabView selectedIndex={index} onSelect={onSelectTab}>
      {options.map(({key, labelDefaultValue, labelTranslationKey}) => {
        const title = t(labelTranslationKey, labelDefaultValue) as string;
        return (
          <Tab key={key} title={title}>
            <EmptyTab />
          </Tab>
        );
      })}
    </TabView>
  );
};

const EmptyTab = styled.View``;

export default FilterTaskTabs;
