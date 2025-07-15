import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TripRating from '../components/TripRating';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TripFeedbackScreen() {
  const router = useRouter();
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [showFeedbackBtns, setShowFeedbackBtns] = useState(true);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Và... bạn đã đến nơi rồi!\nChúng tôi hy vọng chuyến đi vừa qua đã mang đến cho bạn những kỷ niệm thật khó quên. ✨' },
    { type: 'bot', text: 'Chúng tôi rất muốn biết chuyến đi của bạn thế nào! 😁\nChia sẻ trải nghiệm để giúp chúng tôi phục vụ tốt hơn nhé!' },
    { type: 'bot_action' },
  ]);
  const [input, setInput] = useState('');
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [showRegister, setShowRegister] = useState(false);
  const [registerAnim] = useState(new Animated.Value(0));
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showTripRating, setShowTripRating] = useState(false);

  React.useEffect(() => {
    if (showRegister) {
      Animated.timing(registerAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(registerAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [showRegister]);

  React.useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages, userMessages]);

  const handleSend = () => {
    if (input.trim() !== '') {
      setUserMessages(prev => [...prev, { type: 'user', text: input.trim() }]);
      setInput('');
    }
  };

  const handleFeedback = () => {
    setFeedbackSent(true);
    setShowFeedbackBtns(false);
    setMessages(prev => ([
      ...prev,
      { type: 'bot', text: '🎉 Cảm ơn bạn đã phản hồi!\nHẹn gặp lại bạn trong hành trình tiếp theo!✈️🌏' },
      { type: 'bot', text: 'Đang ấp ủ chuyến đi tiếp theo?\nCùng nhau làm cho hành trình sắp tới thêm phần rực rỡ nhé!✈️🌞' },
      { type: 'bot', text: 'Bạn muốn đánh giá chi tiết chuyến đi? Hãy gửi đánh giá bên dưới nhé!' }, // Thêm tin nhắn này
    ]));
    setShowTripRating(true); // Hiện TripRatingScreen
  };

  return (
    <LinearGradient
      colors={["#009CA6", "#FDFDFD"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={{ width: 32, alignItems: 'flex-start' }}>
            <Ionicons name="arrow-back" size={24} color="#F4C95D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Travel Assistant</Text>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="#F4C95D" />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
          style={{ flex: 1 }}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16, paddingBottom: 32, flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {[...messages, ...userMessages].map((msg, idx) => {
              if (msg.type === 'bot') {
                return (
                  <View key={idx} style={styles.botMsgRow}>
                    <View style={styles.botMsgBubble}>
                      <Text style={styles.botMsgText}>{msg.text}</Text>
                    </View>
                  </View>
                );
              }
              if (msg.type === 'user') {
                return (
                  <View key={idx} style={styles.userMsgRow}>
                    <View style={styles.userMsgBubble}>
                      <Text style={styles.userMsgText}>{msg.text}</Text>
                    </View>
                  </View>
                );
              }
              if (msg.type === 'bot_action') {
                return (
                  <View key={idx} style={styles.botMsgRow}>
                    {showFeedbackBtns && !feedbackSent && (
                      <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                        <TouchableOpacity style={styles.feedbackBtn} onPress={handleFeedback}>
                          <Ionicons name="happy-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
                          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Gửi đánh giá</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.skipBtn} onPress={handleFeedback}>
                          <Text style={{ color: '#009CA6', fontWeight: 'bold' }}>Bỏ qua</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              }
              return null;
            })}
            {/* Hiện TripRatingScreen nếu showTripRating = true */}
            {showTripRating && (
              <View style={{ marginTop: 24 }}>
                <TripRating />
              </View>
            )}
          </ScrollView>
          {/* Thanh nhập liệu */}
          <View style={styles.inputRow}>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="happy-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Hãy chia sẻ cảm nhận của bạn..."
              placeholderTextColor="#4FC3F7"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={() => inputRef.current?.focus()}>
              <Ionicons name="mic-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSend}>
              <Ionicons name="send" size={24} color="#F4C95D" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {/* Popup đăng ký bottom sheet */}
      </SafeAreaView>
    </LinearGradient>
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
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.2,
    textAlign: 'center',
    flex: 1,
  },
  botMsgRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  botMsgBubble: {
    backgroundColor: '#f2f2f2',
    borderRadius: 14,
    padding: 14,
    maxWidth: '85%',
    alignSelf: 'flex-start',
    shadowColor: '#009CA6',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  botMsgText: {
    color: '#222',
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 21,
  },
  registerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009CA6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
    marginTop: 6,
    marginBottom: 2,
  },
  userMsgRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  userMsgBubble: {
    backgroundColor: '#009CA6',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  userMsgText: {
    color: '#fff',
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 24,
    margin: 10,
    shadowColor: '#009CA6',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    color: '#009CA6',
    borderWidth: 1.5,
    borderColor: '#009CA6',
    marginHorizontal: 8,
  },
  feedbackBtn: {
    flex: 1,
    backgroundColor: '#009CA6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 8,
  },
  skipBtn: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.18)',
    zIndex: 100,
    justifyContent: 'flex-end',
  },
  sheetContent: {
    width: '100%',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
}); 