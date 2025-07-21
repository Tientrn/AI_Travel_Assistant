// components/ContractSection.tsx
import React, { useState } from 'react';
import { LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const icons = {
  info: 'file-document-outline',
  time: 'calendar-clock',
  duty: 'account-check-outline',
  cost: 'cash-multiple',
  note: 'clipboard-text-outline',
};

export const ContractSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: keyof typeof icons;
  children: React.ReactNode;
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{ marginBottom: 12, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1 }}>
      <TouchableOpacity
        onPress={toggle}
        style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}
      >
        <Icon name={icons[icon]} size={20} color="#000" style={{ marginRight: 8 }} />
        <Text style={{ fontWeight: 'bold', flex: 1 }}>{title}</Text>
        <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color="#000" />
      </TouchableOpacity>
      {expanded && (
        <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
          {children}
        </View>
      )}
    </View>
  );
};
