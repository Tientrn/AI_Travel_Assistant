import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import RentalDetailsModal from '../components/RentalDetailsModal';


const CarRentalScreen = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [messages, setMessages] = useState<
  { type: 'user' | 'system'; text: string }[]>([
  
]);

  const handleSend = () => {
  const trimmed = input.trim();
  if (!trimmed) return;

  console.log('Sent:', trimmed);
  setInput('');
};


  return (
    <LinearGradient colors={['#009CA6', '#FDFDFD']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
          style={{ flex: 1 }}
        >
          <HeaderBar title="AI Travel Assistant" />

          {/* System message */}
          <ScrollView contentContainerStyle={styles.content}>

            <View style={styles.detailsCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Thông tin thuê xe</Text>
              <TouchableOpacity onPress={() => setShowDetail(true)}>
  <Text style={styles.cardAction}>Xem chi tiết ➔</Text>
</TouchableOpacity>

            </View>
            <View style={styles.cardContent}>
              <Text style={styles.detailText}>
                🚗 <Text style={styles.textHighlight}>Corolla Altis 2018</Text>{"\n"}4 chỗ • Xăng • Số tự động
              </Text>
              <Text style={styles.detailText}>
                📍 Nhận xe:{" "}
                <Text style={styles.textHighlight}>Huyện Phú Quốc, Kiên Giang</Text>
              </Text>
              <Text style={styles.detailText}>
                🕒 Thời gian:{"\n"}
                <Text style={styles.textHighlight}>
                  Từ 10:00 20/06/2025 ➔ 10:00 21/06/2025 (1 ngày)
                </Text></Text>
              <Text style={styles.detailText}>
                🚫 Giới hạn:{" "}
                <Text style={styles.textHighlight}>300km/ngày</Text> - Nhận & trả đầy bình
              </Text>
              <Text style={styles.detailText}>
                💸 Tổng chi phí:{" "}
                <Text style={styles.textHighlight}>
                  755,200đ (chưa gồm phụ phí)
                </Text>
              </Text>
            </View>
            
            
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => {
                  setMessages((prev) => [
                    ...prev,
                    { type: 'user', text: 'Xác nhận' },
                    {
                      type: 'system',
                      text:
                        'Đã ghi nhận yêu cầu thuê xe của bạn!\n\nTrước khi tiếp tục, bạn cần xác minh thông tin cá nhân.\nHãy gửi:\n- Họ tên\n- Số điện thoại\n- Ảnh CCCD / CMND\n- Ảnh bằng lái xe',
                    },
                  ]);
                }}
              >
                <Text style={styles.buttonText}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => {
                  setEditMode(true);
                  setShowDetail(true);
                }}
              >
                <Text style={styles.buttonText}>Chỉnh sửa</Text>
              </TouchableOpacity>
            </View>

            {messages.map((msg, idx) =>
  msg.type === 'system' ? (
    <View key={idx} style={styles.systemMsg}>
      <Text style={styles.systemMsgText}>{msg.text}</Text>
    </View>
  ) : (
    <View
      key={idx}
      style={{
        alignSelf: 'flex-end',
        backgroundColor: '#009CA6',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        maxWidth: '80%',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 15 }}>{msg.text}</Text>
    </View>
  )
)}

{messages.some(
  (msg) =>
    msg.type === 'system' &&
    msg.text.includes('xác minh thông tin')
) && (
  <TouchableOpacity
    style={styles.verifyButton}
    onPress={() => {
      // TODO: Mở modal xác minh thông tin ở đây (sẽ làm sau)
    }}
  >
    <Text style={styles.verifyButtonText}>Xác minh thông tin</Text>
  </TouchableOpacity>
)}

          </ScrollView>

          <View style={styles.inputRow}>
  <TouchableOpacity activeOpacity={0.7}>
    <Ionicons name="happy-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
  </TouchableOpacity>

  <TextInput
    ref={inputRef}
    style={styles.input}
    placeholder="Ask anything..."
    placeholderTextColor="#009CA6"
    value={input}
    onChangeText={setInput}
    onSubmitEditing={handleSend}
    returnKeyType="send"
  />

  {input.length > 0 && (
    <TouchableOpacity onPress={() => setInput('')} activeOpacity={0.7}>
      <Ionicons name="close-circle" size={22} color="#009CA6" style={{ marginRight: 4 }} />
    </TouchableOpacity>
  )}

  <TouchableOpacity onPress={() => inputRef.current?.focus()}>
    <Ionicons name="mic-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
  </TouchableOpacity>

  <TouchableOpacity onPress={handleSend}>
    <Ionicons name="send" size={24} color="#F4C95D" />
  </TouchableOpacity>
</View>
  <RentalDetailsModal
            visible={showDetail}
            onClose={() => {
              setShowDetail(false);
              setEditMode(false);
            }}
            editable={editMode}
            details={details}
            onSave={(newDetails) => {
              setDetails(newDetails);
              setShowDetail(false);
              setEditMode(false);
            }}
          />

        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  infoHighlight: {
    fontWeight: 'bold',
    color: '#009CA6',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  verifyButton: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: '#FFFFFF',
  borderRadius: 24,
  marginHorizontal: 10,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
},
input: {
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: 20,
  paddingHorizontal: 16,
  paddingVertical: 10,
  fontSize: 15,
  color: '#009CA6',
  borderWidth: 1.3,
  borderColor: '#009CA6',
  marginHorizontal: 8,
},

  systemMsg: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },
  systemMsgText: {
    color: '#222',
    fontSize: 15,
    lineHeight: 21,
  },
    detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#B2DBDB',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00796B',
  },
  cardContent: {
    padding: 15,
  },
  detailText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
    lineHeight: 22,
  },
  textHighlight: {
    fontWeight: 'bold',
    color: '#009CA6',
  },
  
});

export default CarRentalScreen;
