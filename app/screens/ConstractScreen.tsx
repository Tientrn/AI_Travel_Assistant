
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ContractSection } from '../components/ConstractSection';
import HeaderBar from '../components/HeaderBar';
import InputBar from '../components/InputBar';

const CarRentalContractScreen = () => {
  const [agree, setAgree] = useState(true);

  const [text, setText] = useState('');
const handleSend = () => {
  console.log('Gửi: ', text);
  setText('');
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


  return (
    <LinearGradient colors={['#009CA6', '#FDFDFD']} style={{ flex: 1 }}>
      <HeaderBar title="Hợp đồng thuê xe" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Thông tin xe */}
        <View style={styles.card}>
          <Text style={styles.carTitle}>Corolla Altis 2018</Text>
          <Text style={styles.orderCode}>Mã đơn: #MH2031</Text>
          <Text style={styles.info}>Thời gian thuê: 20/06/2025 - 21/06/2025</Text>
          <Text style={styles.info}>Địa điểm nhận xe: Thành phố Phú Quốc, tỉnh Kiên Giang</Text>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalValue}>755,200đ</Text>
        </View>

        {/* Điều khoản accordion */}
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Điều khoản hợp đồng</Text>
        <ContractSection title='1. Thông tin chung' icon='info'>
          <Text style={styles.accordionText}>- Hợp đồng này được ký kết giữa bên cho thuê và bên thuê xe.</Text>
          <Text style={styles.accordionText}>- Bên thuê cam kết sử dụng xe đúng mục đích và bảo quản xe trong suốt thời gian thuê.</Text>
        </ContractSection>
        <ContractSection title='2. Thời gian và địa điểm thuê' icon='time'>
          <Text style={styles.accordionText}>- Thời gian thuê xe bắt đầu từ 20/06/2025 đến 21/06/2025.</Text>
          <Text style={styles.accordionText}>- Bên thuê có trách nhiệm trả xe đúng thời gian đã thỏa thuận.</Text>
        </ContractSection>
        <ContractSection title='3. Trách nhiệm của bên thuê' icon='duty'>
          <Text style={styles.accordionText}>- Người thuê chịu trách nhiệm cho xe trong thời gian thuê.</Text>
          <Text style={styles.accordionText}>- Bên thuê phải đảm bảo xe được sử dụng đúng mục đích và không vi phạm pháp luật.</Text>
          <Text style={styles.accordionText}>- Trong trường hợp xe bị hư hỏng do lỗi của bên thuê, bên thuê phải chịu toàn bộ chi phí sửa chữa.</Text>
          <Text style={styles.accordionText}>- Chủ xe có quyền kiểm tra xe bất kỳ lúc nào với lý do hợp lý.</Text>
        </ContractSection>
        <ContractSection title='4. Chi phí thuê xe' icon='cost'>
          <Text style={styles.accordionText}>- Phí thuê xe: 755,200đ cho 1 ngày.</Text>
          <Text style={styles.accordionText}>- Phí vượt giới hạn quãng đường: 3.000 VND/Km.</Text>
          <Text style={styles.accordionText}>- Phí vượt tốc độ giới hạn: Theo mức xử phạt quy định.</Text>
          <Text style={styles.accordionText}>- Phí không đổ đầy xăng khi trả xe: 150.000 VND.</Text>
          <Text style={styles.accordionText}>- Mức phạt trả xe trễ: 100.000 VND/giờ.</Text>
        </ContractSection>
        <ContractSection title='5. Lưu ý & điều khoản đặc biệt' icon='note'>
          <Text style={styles.accordionText}>- Xe được bàn giao với bình xăng đầy và vệ sinh sạch sẽ.</Text>
          <Text style={styles.accordionText}>- Người thuê cần hoàn trả xe trong tình trạng tương đương.</Text>
          <Text style={styles.accordionText}>- Mọi vi phạm sẽ bị xử lý theo điều khoản hợp đồng và pháp luật hiện hành.</Text>
        </ContractSection>
        {/* Checkbox */}
        <View style={styles.checkboxRow}>
          <CustomCheckbox checked={agree} onToggle={() => setAgree(!agree)} />
          <Text style={{ flex: 1 }}>Tôi đã đọc và đồng ý với các điều khoản của hợp đồng thuê xe.</Text>
        </View>

        {/* Chữ ký */}
        <View style={styles.signatureBox}>
          <Text style={styles.signatureLabel}>Chữ ký điện tử</Text>
          <View style={styles.signaturePad}>
            <Text style={{ color: '#999' }}>Vẽ chữ ký của bạn tại đây</Text>
          </View>
        </View>

        {/* Nút xác nhận & hủy */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>Ký và xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Hủy bỏ</Text>
        </TouchableOpacity>

        
      </ScrollView>
        <InputBar value={text} setValue={setText} onSend={handleSend} />
    </LinearGradient>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  carTitle: {
    fontWeight: 'bold',
    fontSize: 20, // Tăng kích thước font
    color: '#009CA6', // Đổi màu để nổi bật
  },
  orderCode: {
    color: '#888', // Màu sắc nhẹ để tránh trộn lẫn
    marginTop: 4,
    fontSize: 14,
  },
  info: {
    marginTop: 6,
    fontSize: 15, // Tăng kích thước font để dễ đọc
    color: '#555',
  },
  totalLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 22, // Tăng kích thước font đáng kể
    fontWeight: 'bold',
    color: '#FF5733', // Đổi màu để thu hút sự chú ý
  },
  accordion: {
    backgroundColor: '#F9F9F9', // Thêm sắc độ hài hòa hơn
    borderRadius: 8,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ddd',
  },
  accordionHeader: {
    color: '#017374',
    fontWeight: 'bold',
    fontSize: 16,
  },
  accordionText: {
    fontWeight: '600',
    color: '#444',
    fontSize: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  signatureBox: {
    marginTop: 16,
  },
  signatureLabel: {
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 16,
    color: '#444',
  },
  signaturePad: {
    backgroundColor: '#F5F5F5',
    height: 120,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#009CA6', // Đổi màu viền chữ ký để làm nổi bật
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#009CA6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#009CA6',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16, // Tăng kích thước font chữ
  },
  cancelButton: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#ddd',
  },
  cancelText: {
    color: '#444',
    fontSize: 15, // Tăng kích thước font chữ
  },
});

export default CarRentalContractScreen;
