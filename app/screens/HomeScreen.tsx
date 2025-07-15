import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BookingForm from '../components/bookingform';
import DetailBooking from '../components/Detailbooking';

type BookingDetailData = {
  destination: string;
  pickup: string;
  selectedTime: string;
  selectedCar: string;
};

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<'datxe' | 'thuexe' | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  // Xử lý xác nhận booking
  const handleBookingConfirm = (data: BookingDetailData) => {
    setShowBooking(false);
    setMessages(prev => [
      ...prev,
      { type: 'system', text: 'Dưới đây là thông tin chi tiết đặt xe của bạn, vui lòng xác nhận lại.' },
      { type: 'booking_detail', data }
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#757575" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Travel Assistant</Text>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="#757575" />
          </TouchableOpacity>
        </View>
        {/* Nội dung chat */}
        <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
          {/* Tin nhắn AI đầu tiên */}
          <View style={styles.aiMsgRow}>
            <View style={styles.aiMsgBubble}>
              <Text style={styles.aiMsgText}>
                Chào bạn! <Text>😊</Text> Mình thấy bạn đang có mặt tại Phú Quốc , thật tuyệt vời! 🎉{"\n"}
                Bạn đang muốn đặt xe có tài xế để thoải mái khám phá các điểm đến, hay muốn thuê xe tự lái để chủ động vi vu theo cách riêng của mình? 🚗
              </Text>
              <View style={styles.aiBtnRow}>
                <TouchableOpacity
                  style={[styles.aiBtn, selectedOption === 'datxe' ? styles.aiBtnSelected : styles.aiBtnUnselected]}
                  onPress={() => { setSelectedOption('datxe'); setShowBooking(true); }}
                >
                  <Text style={[styles.aiBtnText, selectedOption === 'datxe' ? styles.aiBtnTextSelected : styles.aiBtnTextUnselected]}>Đặt xe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.aiBtn, selectedOption === 'thuexe' ? styles.aiBtnSelected : styles.aiBtnUnselected]}
                  onPress={() => setSelectedOption('thuexe')}
                >
                  <Text style={[styles.aiBtnText, selectedOption === 'thuexe' ? styles.aiBtnTextSelected : styles.aiBtnTextUnselected]}>Thuê xe</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Render các message trong chatbox */}
          {messages.map((msg, idx) => {
            if (msg.type === 'system') {
              return (
                <View key={idx} style={styles.systemMsg}><Text style={styles.systemMsgText}>{msg.text}</Text></View>
              );
            }
            if (msg.type === 'booking_detail') {
              return <DetailBooking key={idx} {...msg.data} />;
            }
            return null;
          })}
        </ScrollView>
        {/* Thanh nhập nội dung */}
        <View style={styles.inputRow}>
          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="happy-outline" size={26} color="#b0b0b0" />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor="#b0b0b0"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => setInput('')}
            returnKeyType="send"
          />
          {input.length > 0 && (
            <TouchableOpacity onPress={() => setInput('')} activeOpacity={0.6}>
              <Ionicons name="close-circle" size={22} color="#b0b0b0" style={{ marginRight: 4 }} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => inputRef.current?.focus()} activeOpacity={0.6}>
            <Ionicons name="mic-outline" size={26} color="#b0b0b0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInput('')} activeOpacity={0.6}>
            <Ionicons name="send" size={26} color="#0097a7" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* Popup BookingForm */}
      {showBooking && (
        <View style={styles.popupOverlay}>
          <TouchableOpacity style={styles.popupBg} activeOpacity={1} onPress={() => setShowBooking(false)} />
          <View style={styles.popupContent}>
            <BookingForm onConfirm={handleBookingConfirm} />
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0097a7',
  },
  aiMsgRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  aiMsgBubble: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 12,
    maxWidth: '90%',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  aiMsgText: {
    color: '#222',
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 21,
  },
  aiBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  aiBtn: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginRight: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBtnSelected: {
    backgroundColor: '#009688',
    borderColor: '#009688',
    shadowColor: '#009688',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  aiBtnUnselected: {
    backgroundColor: '#f9f9f9',
    borderColor: '#b2dfdb',
    shadowColor: 'transparent',
  },
  aiBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  aiBtnTextSelected: {
    color: '#fff',
  },
  aiBtnTextUnselected: {
    color: '#009688',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    color: '#222',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.18)',
    zIndex: 100,
  },
  popupBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  popupContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  closeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 2,
    elevation: 2,
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
  },
});
