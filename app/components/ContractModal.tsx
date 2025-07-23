import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ContractSection } from '../components/ConstractSection';

interface ContractModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ContractModal = ({ visible, onClose, onConfirm }: ContractModalProps) => {
  const [agree, setAgree] = useState(true);

  const CustomCheckbox = ({
    checked,
    onToggle,
  }: {
    checked: boolean;
    onToggle: () => void;
  }) => (
    <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
      {checked && <View style={styles.checkboxTick} />}
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hợp đồng thuê xe</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Car Info Card - Simplified */}
          <View style={styles.card}>
            <Text style={styles.carTitle}>Corolla Altis 2018</Text>
            <Text style={styles.orderCode}>Mã đơn: #MH2031</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Thời gian:</Text>
              <Text style={styles.infoValue}>20/06/2025 - 21/06/2025</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Địa điểm:</Text>
              <Text style={styles.infoValue}>TP Phú Quốc, Kiên Giang</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng tiền:</Text>
              <Text style={styles.totalValue}>755,200đ</Text>
            </View>
          </View>

          {/* Contract Title */}
          <Text style={styles.contractTitle}>Điều khoản hợp đồng</Text>

          {/* Contract Sections */}
          <ContractSection title="1. Thông tin chung" icon="info">
            <Text style={styles.accordionText}>- Hợp đồng này được ký kết giữa bên cho thuê và bên thuê xe.</Text>
            <Text style={styles.accordionText}>- Bên thuê cam kết sử dụng xe đúng mục đích và bảo quản xe trong suốt thời gian thuê.</Text>
          </ContractSection>

          <ContractSection title="2. Thời gian và địa điểm thuê" icon="time">
            <Text style={styles.accordionText}>- Thời gian thuê xe bắt đầu từ 20/06/2025 đến 21/06/2025.</Text>
            <Text style={styles.accordionText}>- Bên thuê có trách nhiệm trả xe đúng thời gian đã thỏa thuận.</Text>
          </ContractSection>

          <ContractSection title="3. Trách nhiệm của bên thuê" icon="duty">
            <Text style={styles.accordionText}>- Người thuê chịu trách nhiệm cho xe trong thời gian thuê.</Text>
            <Text style={styles.accordionText}>- Bên thuê phải đảm bảo xe được sử dụng đúng mục đích và không vi phạm pháp luật.</Text>
            <Text style={styles.accordionText}>- Trong trường hợp xe bị hư hỏng do lỗi của bên thuê, bên thuê phải chịu toàn bộ chi phí sửa chữa.</Text>
            <Text style={styles.accordionText}>- Chủ xe có quyền kiểm tra xe bất kỳ lúc nào với lý do hợp lý.</Text>
          </ContractSection>

          <ContractSection title="4. Chi phí thuê xe" icon="cost">
            <Text style={styles.accordionText}>- Phí thuê xe: 755,200đ cho 1 ngày.</Text>
            <Text style={styles.accordionText}>- Phí vượt giới hạn quãng đường: 3.000 VND/Km.</Text>
            <Text style={styles.accordionText}>- Phí vượt tốc độ giới hạn: Theo mức xử phạt quy định.</Text>
            <Text style={styles.accordionText}>- Phí không đổ đầy xăng khi trả xe: 150.000 VND.</Text>
            <Text style={styles.accordionText}>- Mức phạt trả xe trễ: 100.000 VND/giờ.</Text>
          </ContractSection>

          <ContractSection title="5. Lưu ý & điều khoản đặc biệt" icon="note">
            <Text style={styles.accordionText}>- Xe được bàn giao với bình xăng đầy và vệ sinh sạch sẽ.</Text>
            <Text style={styles.accordionText}>- Người thuê cần hoàn trả xe trong tình trạng tương đương.</Text>
            <Text style={styles.accordionText}>- Mọi vi phạm sẽ bị xử lý theo điều khoản hợp đồng và pháp luật hiện hành.</Text>
          </ContractSection>

          {/* Agreement */}
          <View style={styles.checkboxRow}>
            <CustomCheckbox checked={agree} onToggle={() => setAgree(!agree)} />
            <Text style={styles.agreementText}>
              Tôi đã đọc và đồng ý với các điều khoản của hợp đồng thuê xe.
            </Text>
          </View>

          {/* Signature */}
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Chữ ký điện tử</Text>
            <View style={styles.signaturePad}>
              <Text style={styles.signaturePlaceholder}>Vẽ chữ ký của bạn tại đây</Text>
            </View>
          </View>

          {/* Buttons */}
          <TouchableOpacity
            style={[styles.confirmButton, !agree && styles.confirmButtonDisabled]}
            onPress={onConfirm}
            disabled={!agree}
          >
            <Text style={styles.confirmText}>Ký và xác nhận</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Hủy bỏ</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#009CA6',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  carTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#009CA6',
    marginBottom: 8,
  },
  orderCode: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    color: '#666',
    width: 80,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5733',
  },
  contractTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  accordionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#009CA6',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#009CA6',
    borderRadius: 2,
  },
  agreementText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  signatureBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  signatureLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  signaturePad: {
    backgroundColor: '#f9f9f9',
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signaturePlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#009CA6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelText: {
    color: '#666',
    fontSize: 15,
  },
});