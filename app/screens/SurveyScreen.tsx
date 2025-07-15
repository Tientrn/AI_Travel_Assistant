import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const EXPERIENCES = [
  { label: 'Thư giãn nghỉ dưỡng', icon: 'spa' },
  { label: 'Khám phá thiên nhiên', icon: 'tree' },
  { label: 'Ăn uống - ẩm thực', icon: 'utensils' },
  { label: 'Check-in sống ảo', icon: 'camera' },
  { label: 'Trải nghiệm văn hóa địa phương', icon: 'landmark' },
];
const TRANSPORTS = [
  { label: 'Tự lái', icon: 'car' },
  { label: 'Gọi xe khi cần', icon: 'taxi' },
  { label: 'Phương tiện công cộng', icon: 'bus' },
  { label: 'Đi bộ hoặc xe đạp', icon: 'biking' },
];
const BUDGETS = [
  { label: 'Tiết kiệm , vừa đủ trải nghiệm' },
  { label: 'Thoải mái chi tiêu hợp lý' },
  { label: 'Cao cấp , không giới hạn ngân sách' },
];

export default function SurveyScreen() {
  const router = useRouter();
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Xử lý chọn trải nghiệm
  const handleExperience = (label: string) => {
    setSelectedExperiences(prev => {
      const newArr = prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label];
      if (newArr.length > 0) setStep(2);
      return newArr;
    });
  };
  // Xử lý chọn phương tiện
  const handleTransport = (label: string) => {
    setSelectedTransport(label);
    setStep(3);
  };
  // Xử lý chọn ngân sách
  const handleBudget = (label: string) => {
    setSelectedBudget(label);
    setStep(4);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [step]);

  // Hiển thị bong bóng chat user
  const renderUserBubble = (text: string) => (
    <View style={styles.userMsgRow}>
      <View style={styles.userMsgBubble}>
        <Text style={styles.userMsgText}>{text}</Text>
      </View>
    </View>
  );
  // Hiển thị bong bóng chat bot
  const renderBotBubble = (text: string, children?: React.ReactNode) => (
    <>
      <View style={styles.botMsgRow}>
        <View style={styles.botMsgBubble}>
          <Text style={styles.botMsgText}>{text}</Text>
        </View>
      </View>
      {children}
    </>
  );

  return (
    <LinearGradient
      colors={["#009CA6", "#FDFDFD"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>AI Travel Assistant</Text>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={24} color="#F4C95D" />
            </TouchableOpacity>
          </View>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          >
            {/* Bot chào hỏi */}
            {step === 1 && renderBotBubble(
              'Chào bạn! Để mình hỗ trợ bạn đúng thứ bạn thích, mình cần biết một chút về gu du lịch của bạn nha'
            )}
            {/* Câu hỏi 1 */}
            {step >= 1 && renderBotBubble(
              'Đi du lịch, bạn thích trải nghiệm gì nhất?',
              <View style={styles.gridWrap}>
                {EXPERIENCES.map(opt => (
                  <TouchableOpacity
                    key={opt.label}
                    style={[
                      styles.gridBtn,
                      selectedExperiences.includes(opt.label) && styles.gridBtnActive
                    ]}
                    onPress={() => handleExperience(opt.label)}
                    activeOpacity={0.8}
                  >
                    <FontAwesome5
                      name={opt.icon as any}
                      size={26}
                      color={selectedExperiences.includes(opt.label) ? '#fff' : '#009CA6'}
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={[
                      styles.gridText,
                      selectedExperiences.includes(opt.label) && { color: '#fff' }
                    ]}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {/* User trả lời câu 1 */}

            {/* Câu hỏi 2 */}
            {step >= 2 && renderBotBubble(
              'Khi đi du lịch, bạn thường chọn cách di chuyển nào?',
              <View style={styles.gridWrap}>
                {TRANSPORTS.map(opt => (
                  <TouchableOpacity
                    key={opt.label}
                    style={[
                      styles.gridBtn,
                      selectedTransport === opt.label && styles.gridBtnActive
                    ]}
                    onPress={() => handleTransport(opt.label)}
                    activeOpacity={0.8}
                  >
                    <FontAwesome5
                      name={opt.icon as any}
                      size={26}
                      color={selectedTransport === opt.label ? '#fff' : '#009CA6'}
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={[
                      styles.gridText,
                      selectedTransport === opt.label && { color: '#fff' }
                    ]}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {/* User trả lời câu 2 */}

            {/* Câu hỏi 3 */}
            {step >= 3 && renderBotBubble(
              'Bạn ưu tiên chuyến đi theo phong cách nào?',
              <View style={styles.gridWrap}>
                {BUDGETS.map(opt => (
                  <TouchableOpacity
                    key={opt.label}
                    style={[
                      styles.gridBtn,
                      selectedBudget === opt.label && styles.gridBtnActive
                    ]}
                    onPress={() => handleBudget(opt.label)}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.gridText,
                      selectedBudget === opt.label && { color: '#fff' }
                    ]}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {/* User trả lời câu 3 */}

            {/* Xác nhận */}
            {step >= 4 && renderBotBubble(
              'Sở thích của bạn đã được lưu! Sẵn sàng cho hành trình đúng gu và tiện lợi chưa? 😎',
              <TouchableOpacity style={styles.letsGoBtn} onPress={() => router.push('/screens/HomeScreen')}>
                <Text style={styles.letsGoText}>Let&apos;s go</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
          {/* Input chat */}
          <View style={styles.inputRow}>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="happy-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Nhập tin nhắn..."
              placeholderTextColor="#009CA6"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => setInput('')}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={() => inputRef.current?.focus()}>
              <Ionicons name="mic-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setInput('')}>
              <Ionicons name="send" size={24} color="#F4C95D" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  },
  botMsgRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  botMsgBubble: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 12,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  botMsgText: {
    color: '#222',
    fontSize: 15,
    marginBottom: 8,
  },
  userMsgRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  userMsgBubble: {
    backgroundColor: '#009CA6',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  userMsgText: {
    color: '#fff',
    fontSize: 15,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 0,
    marginBottom: 8,
  },
  gridBtn: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#009CA6',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: '#009CA6',
    minHeight: 80,
  },
  gridBtnActive: {
    backgroundColor: '#009CA6',
    borderColor: '#009CA6',
    shadowOpacity: 0.15,
  },
  gridText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
  letsGoBtn: {
    backgroundColor: '#009CA6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignSelf: 'flex-start',
    marginTop: 4,
    shadowColor: '#009CA6',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
  },
  letsGoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0,
    padding: 10,
    backgroundColor: '#FDFDFD',
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
});