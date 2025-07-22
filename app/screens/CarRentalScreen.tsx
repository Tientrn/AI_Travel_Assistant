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
import VerifyInfoModal from '../components/VerifyInfoModal';

const CarRentalScreen = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [messages, setMessages] = useState<
    { type: 'user' | 'system'; text: string }[]
  >([]);
  

const lastMessageRef = useRef('');

const handleSend = (overrideText?: string) => {
  const text = (overrideText ?? input).trim();
  if (!text || text === lastMessageRef.current) return;

  lastMessageRef.current = text;
  setMessages((prev) => [...prev, { type: 'user', text }]);
  setInput('');
};



  const renderMessage = (msg: any, idx: number) => {
      if (msg.type === "ai") {
        return (
          <View key={idx} style={styles.aiMsgRow}>
            <View style={styles.avatarWrap}>
              <Ionicons name="sparkles" size={28} color="#F4C95D" />
            </View>
            <View style={[
              styles.aiMsgBubble,
              msg.isListening && styles.listeningBubble
            ]}>
              <Text style={[
                styles.aiMsgText,
                msg.isListening && styles.listeningText
              ]}>
                {msg.text}
                {msg.isListening && " 🎤"}
              </Text>
            </View>
          </View>
        );
      }
      if (msg.type === "user") {
        return (
          <View key={idx} style={styles.userMsgRow}>
            <View style={styles.userMsgBubble}>
              <Text style={styles.userMsgText}>{msg.text}</Text>
            </View>
          </View>
        );
      }
      return null;
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
          
          <ScrollView contentContainerStyle={styles.content}>
              <View style={styles.aiMsgRow}>
                <View style={styles.avatarWrap}>
                  <Ionicons name="sparkles" size={28} color="#F4C95D" />
                </View>
                <View style={styles.aiMsgBubble}>
                  <Text style={styles.aiMsgText}>Đây là thông tin thuê xe, hãy xác nhận lại trước khi thực hiện thuê xe.</Text>
                </View>
              </View>
            
            <View style={styles.detailsCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Thông tin thuê xe</Text>
                <TouchableOpacity onPress={() => setShowDetail(true)}>
                  <Text style={styles.cardAction}>Xem chi tiết ➔</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.detailRow}>
                  <Ionicons
                    name="car-outline"
                    size={20}
                    color="#009CA6"
                    style={styles.icon}
                  />
                  <Text style={styles.detailLabel}>Xe: </Text>
                  <Text style={styles.textHighlight}>Corolla Altis 2018</Text>
                  <Text style={styles.subDetail}> – 4 chỗ • Xăng • Số tự động</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color="#009CA6"
                    style={styles.icon}
                  />
                  <Text style={styles.detailLabel}>Nhận xe: </Text>
                  <Text style={styles.textHighlight}>
                    Huyện Phú Quốc, Kiên Giang
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color="#009CA6"
                    style={styles.icon}
                  />
                  <Text style={styles.detailLabel}>Thời gian: </Text>
                  <Text style={styles.textHighlight}>
                    10:00 20/06 ➔ 10:00 21/06
                  </Text>
                  <Text style={styles.subDetail}> (1 ngày)</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="speedometer-outline"
                    size={20}
                    color="#009CA6"
                    style={styles.icon}
                  />
                  <Text style={styles.detailLabel}>Giới hạn: </Text>
                  <Text style={styles.textHighlight}>300km/ngày</Text>
                  <Text style={styles.subDetail}> – Nhận & trả đầy bình</Text>
                </View>

                <View style={[styles.detailRow, { marginTop: 8 }]}>
                  <Ionicons
                    name="cash-outline"
                    size={20}
                    color="#009CA6"
                    style={styles.icon}
                  />
                  <Text style={styles.detailLabel}>Tổng chi phí: </Text>
                  <Text style={[styles.textHighlight, { fontSize: 16 }]}>
                    755,200đ
                  </Text>
                  <Text style={styles.subDetail}> (chưa gồm phụ phí)</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionButtons}>
              
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => {
                handleSend("Xác nhận"); 
                setMessages((prev) => [
                ...prev,
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

{messages.map((msg, idx) => {
  if (msg.type === 'system') {
    const showVerify =
      msg.text.includes('xác minh thông tin'); // check cụ thể từng msg

    return (
      <React.Fragment key={idx}>
        <View style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
          <View style={styles.aiMsgRow}>
            <View style={styles.avatarWrap}>
              <Ionicons name="sparkles" size={28} color="#F4C95D" />
            </View>
            <View style={styles.aiMsgBubble}>
              <Text style={styles.aiMsgText}>{msg.text}</Text>
            </View>
          </View>

        {showVerify && (
          <View>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => setShowVerifyModal(true)}
            >
              <Text style={styles.verifyButtonText}>Xác minh thông tin</Text>
            </TouchableOpacity>

            <VerifyInfoModal
              visible={showVerifyModal}
              onClose={() => setShowVerifyModal(false)}
              onSubmit={(info) => {
                console.log('Thông tin đã gửi:', info);
                // TODO: xử lý lưu hoặc gửi API
              }}
            />
          </View>
        )}
      </View>
    </React.Fragment>
  );
}
  // You may want to handle other message types here
  return renderMessage(msg, idx);
})}
</ScrollView>

          <View style={styles.inputRow}>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons
                name="happy-outline"
                size={24}
                color="#009CA6"
                style={{ marginHorizontal: 8 }}
              />
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Ask anything..."
              placeholderTextColor="#009CA6"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />

            {input.length > 0 && (
              <TouchableOpacity onPress={() => setInput('')} activeOpacity={0.7}>
                <Ionicons
                  name="close-circle"
                  size={22}
                  color="#009CA6"
                  style={{ marginRight: 4 }}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => inputRef.current?.focus()}>
              <Ionicons
                name="mic-outline"
                size={24}
                color="#009CA6"
                style={{ marginHorizontal: 8 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSend()}>
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
            onSave={(newDetails: any) => {
              setDetails(newDetails);
              setShowDetail(false);
              setEditMode(false);
            }}
            car={{
              name: 'Corolla Altis 2018',
              image: 'https://i.imgur.com/your_car_image.jpg',
              seats: 4,
              transmission: 'Số tự động',
              fuel: 'Xăng',
              rating: 4.9,
              trips: 23,
              location: 'Huyện Phú Quốc, Kiên Giang',
              price: 377600,
            }}
            onConfirm={() => {
              console.log('Rental confirmed');
            }}
            onModify={() => {
              setEditMode(true);
              setShowDetail(true);
            }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
    flexGrow: 1,
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
    paddingVertical: 10,
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  subDetail: {
    fontSize: 15,
    color: '#777',
  },
  icon: {
    marginRight: 6,
  },
  textHighlight: {
    fontWeight: 'bold',
    color: '#009CA6',
    fontSize: 15,
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
  paddingHorizontal: 20,
  borderRadius: 12,
  backgroundColor: '#FFB300',
  alignSelf: 'flex-start',
  marginTop: 4,
  marginLeft: 44,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
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
    avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E0F7FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 2,
  },
  headerSection: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#E6FFFA', // Light teal background for visibility
  padding: 16, // Padding around the section
  marginHorizontal: 10, // Aligns the section within the page layout
  borderRadius: 12, // Subtle curve for the box
  marginBottom: 12, // Adds space below the header
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},
headerTextWrap: {
  flex: 1, // Ensures the text takes up remaining space
},
headerText: {
  color: '#2D3748', // Dark gray for text readability
  fontSize: 15,
  fontWeight: '400',
  lineHeight: 20,
},
aiMsgRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  aiMsgBubble: {
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    padding: 14,
    maxWidth: "85%",
    alignSelf: "flex-start",
    shadowColor: "#009CA6",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  aiMsgText: {
    color: "#222",
    fontSize: 15,
    marginBottom: 2,
    lineHeight: 21,
  },
  userMsgRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  userMsgBubble: {
    backgroundColor: "#009CA6",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  userMsgText: {
    color: "#fff",
    fontSize: 15,
  },
  listeningBubble: {
    backgroundColor: "#E0F7FA",
    borderColor: "#009CA6",
    borderWidth: 1,
    shadowColor: "#009CA6",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  listeningText: {
    color: "#009CA6",
    fontWeight: "bold",
  },
  },);

export default CarRentalScreen;
