// components/VerifyInfoModal.tsx
import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (info: { name: string; phone: string }) => void;
};

export default function VerifyInfoModal({ visible, onClose, onSubmit }: Props) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Xác minh thông tin</Text>

          <TextInput
            placeholder="Họ tên"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
            placeholderTextColor="#999"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={[styles.btn, styles.cancel]}>
              <Text style={styles.btnText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onSubmit({ name, phone });
                onClose();
              }}
              style={[styles.btn, styles.submit]}
            >
              <Text style={styles.btnText}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 15,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: '#ccc',
  },
  submit: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
