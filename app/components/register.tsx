import { FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register() {
  const [method, setMethod] = useState<'zalo' | 'whatsapp'>('zalo');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState<'zalo' | 'whatsapp' | null>(null);
  const [sent, setSent] = useState<'zalo' | 'whatsapp' | null>(null);
  const [name, setName] = useState('Nguyễn Văn A');
  const [phone, setPhone] = useState('0987654321');

  const otpRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < otp.length - 1) {
      otpRefs.current[idx + 1]?.focus();
    }
    // Nếu xóa thì focus về trước (tùy ý)
    if (!value && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleSelectMethod = (m: 'zalo' | 'whatsapp') => {
    setMethod(m);
    setLoading(m);
    setSent(null);
    setTimeout(() => {
      setLoading(null);
      setSent(m);
    }, 2000); // 2 giây loading
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        {/* Thông tin cơ bản */}
        <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#f5f5f5' }]}
          value={name}
          onChangeText={setName}
          editable={true}
          placeholder="Họ và tên"
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#f5f5f5' }]}
          value={phone}
          onChangeText={setPhone}
          editable={true}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
        />

        {/* Xác thực tài khoản */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Xác thực tài khoản</Text>
        <Text style={styles.label}>Chọn phương thức nhận mã OTP</Text>
        <View style={styles.methodRow}>
          <TouchableOpacity
            style={[styles.methodBtn, method === 'zalo' && styles.methodBtnActive]}
            onPress={() => handleSelectMethod('zalo')}
            disabled={loading !== null}
          >
            <FontAwesome name="comment" size={18} color={method === 'zalo' ? '#fff' : '#007AFF'} />
            <Text style={[styles.methodText, method === 'zalo' && { color: '#fff' }]}> Zalo</Text>
            {loading === 'zalo' && <ActivityIndicator size={18} color="#fff" style={{ marginLeft: 8 }} />}
            {sent === 'zalo' && <FontAwesome name="check-circle" size={18} color="#fff" style={{ marginLeft: 8 }} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodBtn,
              styles.methodBtnOutline,
              method === 'whatsapp' && styles.methodBtnActiveWhatsapp
            ]}
            onPress={() => handleSelectMethod('whatsapp')}
            disabled={loading !== null}
          >
            <FontAwesome name="whatsapp" size={18} color={method === 'whatsapp' ? '#fff' : '#25D366'} />
            <Text style={[styles.methodText, { color: method === 'whatsapp' ? '#fff' : '#25D366' }]}> WhatsApp</Text>
            {loading === 'whatsapp' && <ActivityIndicator size={18} color="#fff" style={{ marginLeft: 8 }} />}
            {sent === 'whatsapp' && <FontAwesome name="check-circle" size={18} color="#fff" style={{ marginLeft: 8 }} />}
          </TouchableOpacity>
        </View>

        {/* Nhập mã OTP */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Nhập mã OTP</Text>
        <Text style={styles.label}>Chúng tôi đã gửi mã tới Zalo/WhatsApp</Text>
        <View style={styles.otpRow}>
          {otp.map((v, idx) => (
            <TextInput
              key={idx}
              ref={(ref) => {
                otpRefs.current[idx] = ref;
              }}
              style={styles.otpInput}
              value={v}
              onChangeText={val => handleOtpChange(val, idx)}
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.confirmBtn} onPress={() => {
          // Chuyển sang màn hình SurveyScreen
          const { router } = require('expo-router');
          router.push('/screens/SurveyScreen');
        }}>
          <Text style={styles.confirmBtnText}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resendBtn} disabled>
          <Text style={styles.resendBtnText}>Gửi lại mã</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
    color: '#009688',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
    color: '#222',
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  methodRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  methodBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 0,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
  },
  methodBtnActive: {
    backgroundColor: '#007AFF',
  },
  methodBtnOutline: {
    borderWidth: 1,
    borderColor: '#25D366',
    backgroundColor: '#fff',
  },
  methodBtnActiveOutline: {
    borderColor: '#25D366',
    backgroundColor: '#eafff3',
  },
  methodText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  sendBtn: {
    backgroundColor: '#00b3b3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  sendBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  otpInput: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f5f5f5',
    color: '#222',
  },
  confirmBtn: {
    backgroundColor: '#00b3b3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendBtn: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  resendBtnText: {
    color: '#00b3b3',
    fontWeight: 'bold',
    fontSize: 16,
    opacity: 0.5,
  },
  methodBtnActiveWhatsapp: {
    backgroundColor: '#25D366',
    borderColor: '#25D366',
  },
}); 