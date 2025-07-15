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
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor: '#FDFDFD' }} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        {/* Mô tả ngắn */}
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          <FontAwesome name="gift" size={32} color="#F4C95D" style={{ marginBottom: 4 }} />
          <Text style={{ color: '#009CA6', fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>Đăng ký thành viên</Text>
          <Text style={{ color: '#666', fontSize: 13, textAlign: 'center' }}>
            Nhận ưu đãi độc quyền và quà tặng hấp dẫn khi đăng ký!
          </Text>
        </View>
        {/* Thông tin cơ bản */}
        <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#FDFDFD', borderColor: '#009CA6' }]}
          value={name}
          onChangeText={setName}
          editable={true}
          placeholder="Họ và tên"
          placeholderTextColor="#009CA6"
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#FDFDFD', borderColor: '#009CA6' }]}
          value={phone}
          onChangeText={setPhone}
          editable={true}
          placeholder="Số điện thoại"
          placeholderTextColor="#009CA6"
          keyboardType="phone-pad"
        />

        {/* Xác thực tài khoản */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Xác thực tài khoản</Text>
        <Text style={styles.label}>Chọn phương thức nhận mã OTP</Text>
        <View style={styles.methodRow}>
          <TouchableOpacity
            style={[styles.methodBtn, method === 'zalo' ? styles.methodBtnActive : styles.methodBtnInactive]}
            onPress={() => handleSelectMethod('zalo')}
            disabled={loading !== null}
          >
            <FontAwesome name="comment" size={18} color={method === 'zalo' ? '#fff' : '#009CA6'} />
            <Text style={[styles.methodText, method === 'zalo' && { color: '#fff' }]}> Zalo</Text>
            {loading === 'zalo' && <ActivityIndicator size={18} color="#fff" style={{ marginLeft: 8 }} />}
            {sent === 'zalo' && <FontAwesome name="check-circle" size={18} color="#fff" style={{ marginLeft: 8 }} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodBtn, method === 'whatsapp' ? styles.methodBtnActiveWhatsapp : styles.methodBtnInactiveWhatsapp]}
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
        <Text style={styles.label}>Chúng tôi đã gửi mã tới {method === 'zalo' ? 'Zalo' : 'WhatsApp'}</Text>
        <View style={styles.otpRow}>
          {otp.map((v, idx) => (
            <TextInput
              key={idx}
              ref={(ref) => { otpRefs.current[idx] = ref; }}
              style={[
                styles.otpInput,
                v ? styles.otpInputFilled : null
              ]}
              value={v}
              onChangeText={val => handleOtpChange(val, idx)}
              keyboardType="number-pad"
              maxLength={1}
              placeholder="-"
              placeholderTextColor="#B2DFDB"
              onFocus={() => {
                // force re-render for focus style
                otpRefs.current[idx]?.setNativeProps({ style: styles.otpInputFocused });
              }}
              onBlur={() => {
                otpRefs.current[idx]?.setNativeProps({ style: styles.otpInput });
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.confirmBtn, otp.every(x => x) ? {} : { opacity: 0.5 }]}
          onPress={() => {
            if (!otp.every(x => x)) return;
          const { router } = require('expo-router');
          router.push('/screens/SurveyScreen');
          }}
          disabled={!otp.every(x => x)}
        >
          <Text style={styles.confirmBtnText}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resendBtn, loading ? { opacity: 0.5 } : {}]}
          disabled={!!loading}
        >
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
    shadowColor: '#009CA6',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 6,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#009CA6',
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#009CA6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#FDFDFD',
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  methodRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 12,
  },
  methodBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#009CA6',
    backgroundColor: '#fff',
    padding: 12,
    justifyContent: 'center',
    shadowColor: '#009CA6',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  methodBtnActive: {
    backgroundColor: '#009CA6',
    borderColor: '#009CA6',
  },
  methodBtnInactive: {
    backgroundColor: '#fff',
    borderColor: '#009CA6',
  },
  methodBtnActiveWhatsapp: {
    backgroundColor: '#25D366',
    borderColor: '#25D366',
  },
  methodBtnInactiveWhatsapp: {
    backgroundColor: '#fff',
    borderColor: '#25D366',
  },
  methodText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    gap: 8,
  },
  otpInput: {
    width: 44,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#009CA6',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    backgroundColor: '#FDFDFD',
    color: '#009CA6',
    marginHorizontal: 2,
  },
  otpInputFilled: {
    backgroundColor: '#B2DFDB',
    color: '#009CA6',
    borderColor: '#009CA6',
  },
  otpInputFocused: {
    borderColor: '#F4C95D',
    backgroundColor: '#fffbe6',
  },
  confirmBtn: {
    backgroundColor: '#009CA6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#009CA6',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  resendBtn: {
    backgroundColor: '#FDFDFD',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1.2,
    borderColor: '#F4C95D',
  },
  resendBtnText: {
    color: '#F4C95D',
    fontWeight: 'bold',
    fontSize: 15,
    opacity: 0.85,
  },
}); 