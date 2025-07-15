// components/InputBar.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function InputBar({ value, setValue, onSend }: {
  value: string;
  setValue: (val: string) => void;
  onSend: () => void;
}) {
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={styles.inputRow}>
      <TouchableOpacity>
        <Ionicons name="happy-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Ask anything..."
        placeholderTextColor="#009CA6"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onSend}
        returnKeyType="send"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => setValue('')}>
          <Ionicons name="close-circle" size={22} color="#009CA6" style={{ marginRight: 4 }} />
        </TouchableOpacity>
      )}
      <TouchableOpacity>
        <Ionicons name="mic-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSend}>
        <Ionicons name="send" size={24} color="#F4C95D" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#FDFDFD',
    borderRadius: 24,
    shadowColor: '#009CA6',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    color: '#009CA6',
    borderWidth: 1.5,
    borderColor: '#009CA6',
    marginHorizontal: 8,
  },
});
