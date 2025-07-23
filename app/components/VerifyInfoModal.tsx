import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (info: any) => void;
};

const CustomCheckbox = ({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) => (
  <TouchableOpacity onPress={onToggle} style={{
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#009CA6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    {checked && (
      <View style={{
        width: 12,
        height: 12,
        backgroundColor: '#009CA6',
        borderRadius: 3,
      }} />
    )}
  </TouchableOpacity>
);

export default function VerifyInfoModal({ visible, onClose, onSubmit }: Props) {
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [license, setLicense] = useState('');

  const handleSubmit = () => {
    if (!agree) return; // Đảm bảo đã tick cam kết
    const info = {
      name,
      phone,
      email,
      idNumber,
      license,
    };
    onSubmit(info); // Gửi thông tin
    onClose(); // Đóng modal sau khi xác nhận
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* NFC Scan Box */}
            <View style={styles.nfcCard}>
              <Ionicons name="card-outline" size={32} color="#00838F" style={styles.nfcIcon} />
              <Text style={styles.nfcText}>
                Quét CCCD hoặc hộ chiếu qua NFC để tự động điền thông tin vào hợp đồng thuê xe.
              </Text>
              <TouchableOpacity style={styles.scanButton}>
                <Text style={styles.scanButtonText}>
                  Tiến hành quét CCCD hoặc hộ chiếu qua NFC
                </Text>
              </TouchableOpacity>
            </View>

            {/* Privacy Warning */}
            <View style={styles.warningBox}>
              <Text style={styles.warningTitle}>Quyền riêng tư & Bảo mật dữ liệu</Text>
              <Text style={styles.warningText}>
                Dữ liệu NFC của bạn được xử lý trực tiếp trên thiết bị và không lưu trữ hoặc truyền tải ra ngoài.
              </Text>
            </View>

            {/* Personal Info */}
            <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
            <TextInput
              style={styles.input}
              placeholder="Họ và tên *"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại *"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ email (tùy chọn)"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* ID Documents */}
            <Text style={styles.sectionTitle}>Giấy tờ tùy thân</Text>
            <TextInput
              style={styles.input}
              placeholder="CCCD/CMND hoặc số hộ chiếu"
              value={idNumber}
              onChangeText={setIdNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Bằng lái *"
              value={license}
              onChangeText={setLicense}
            />

            <TouchableOpacity style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={32} color="#ccc" />
              <Text style={styles.uploadText}>Tải lên ảnh bằng lái xe</Text>
              <Text style={styles.uploadHint}>JPG, PNG up to 5MB</Text>
            </TouchableOpacity>

            {/* Agreement */}
            <View style={styles.agreeRow}>
              <CustomCheckbox checked={agree} onToggle={() => setAgree(!agree)} />
              <Text style={styles.agreeText}>
                Tôi cam kết rằng mọi thông tin và giấy tờ tôi cung cấp là đúng sự thật và thuộc sở hữu của tôi. Tôi hoàn toàn chịu trách nhiệm nếu có sai lệch.
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmBtn, !agree && styles.disabledBtn]}
                onPress={handleSubmit}
                disabled={!agree}
              >
                <Text style={styles.confirmText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    paddingTop: 40,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  nfcCard: {
    backgroundColor: '#F1FCFC',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  nfcIcon: {
    marginBottom: 8,
  },
  nfcText: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#444',
  },
  scanButton: {
    backgroundColor: '#00ACC1',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  warningBox: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  warningTitle: {
    fontWeight: 'bold',
    color: '#EF6C00',
    marginBottom: 4,
  },
  warningText: {
    color: '#6D4C41',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    marginTop: 8,
    color: '#888',
  },
  uploadHint: {
    fontSize: 12,
    color: '#bbb',
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 20,
  },
  agreeText: {
    flex: 1,
    fontSize: 13,
    color: '#444',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#009688',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  cancelText: {
    color: '#333',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});