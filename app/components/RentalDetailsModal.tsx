import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface RentalDetailsModalProps {
  visible: boolean;
  onClose: () => void;
}

const RentalDetailsModal: React.FC<RentalDetailsModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.background} onPress={onClose} />
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollContent}>

            {/* Section: Xe */}
            <Text style={styles.sectionTitle}>🚗 Xe thuê</Text>
            <View style={styles.box}>
              <Text style={styles.primary}>Corolla Altis 2018</Text>
              <Text style={styles.sub}>4 chỗ • Số tự động • Xăng</Text>
            </View>

            {/* Section: Thời gian */}
            <Text style={styles.sectionTitle}>🗓️ Thời gian thuê</Text>
            <View style={styles.box}>
              <Text style={styles.label}>⏱️ Thời gian:</Text>
              <Text style={styles.text}>Từ 10:00 20/06/2025 ➝ 10:00 21/06/2025</Text>
              <Text style={styles.text}>📅 1 ngày • Giới hạn: 300km/ngày</Text>
              <Text style={styles.text}>⛽ Nhận & trả xe đầy bình</Text>
            </View>

            {/* Section: Chi phí */}
            <Text style={styles.sectionTitle}>💰 Chi phí</Text>
            <View style={styles.box}>
              <View style={styles.row}>
                <Text style={styles.label}>Giá cơ bản (1 ngày)</Text>
                <Text style={styles.text}>844,000đ</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Phí giao xe</Text>
                <Text style={styles.text}>50,000đ</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Bảo hiểm</Text>
                <Text style={styles.text}>30,000đ</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.label, { color: '#4CAF50' }]}>Giảm giá (20%)</Text>
                <Text style={[styles.text, { color: '#4CAF50' }]}>-168,800đ</Text>
              </View>
              <View style={styles.rowTotal}>
                <Text style={styles.totalLabel}>Tổng thanh toán</Text>
                <Text style={styles.totalAmount}>755,200đ</Text>
              </View>
            </View>

            {/* Section: Khách hàng */}
            <Text style={styles.sectionTitle}>👤 Thông tin khách hàng</Text>
            <View style={styles.box}>
              <Text style={styles.text}>Nguyen Van A</Text>
              <Text style={styles.text}>📞 0912 345 678</Text>
              <Text style={styles.text}>📧 nguyenvana@gmail.com</Text>
              <Text style={styles.text}>🚗 Thuê xe tự lái</Text>
            </View>

            {/* Section: Giấy tờ */}
            <Text style={styles.sectionTitle}>📝 Giấy tờ yêu cầu</Text>
            <View style={[styles.box, { backgroundColor: '#FFF7E0' }]}>
              <Text style={[styles.text, { color: '#B45309' }]}>
                CCCD + Bằng lái xe B1 trở lên
              </Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Đóng</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  background: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '92%',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    color: '#009CA6',
  },
  box: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  primary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  sub: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
  },
  label: {
    color: '#555',
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
    paddingTop: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#009CA6',
  },
  closeButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RentalDetailsModal;
