import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type HeaderBarProps = {
  title?: string;
  showBackButton?: boolean;
  onRightPress?: () => void;
};

export default function HeaderBar({
  title = 'AI Travel Assistant',
  showBackButton = true,
  onRightPress,
}: HeaderBarProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#F4C95D" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity onPress={onRightPress}>
        <MaterialIcons name="more-vert" size={24} color="#F4C95D" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
