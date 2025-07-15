import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const EXPERIENCES = [
  { label: 'Thư giãn nghỉ dưỡng', icon: 'spa', color: '#009688' },
  { label: 'Khám phá thiên nhiên', icon: 'tree', color: '#009688' },
  { label: 'Ăn uống - ẩm thực', icon: 'utensils', color: '#009688' },
  { label: 'Check-in sống ảo', icon: 'camera', color: '#009688' },
  { label: 'Trải nghiệm văn hóa địa phương', icon: 'landmark', color: '#009688' },
];

const TRANSPORTS = [
  { label: 'Tự lái', icon: 'car', color: '#e53935' },
  { label: 'Gọi xe khi cần', icon: 'taxi', color: '#43a047' },
  { label: 'Phương tiện công cộng', icon: 'bus', color: '#fb8c00' },
  { label: 'Đi bộ hoặc xe đạp', icon: 'biking', color: '#039be5' },
];

const BUDGETS = [
  { label: 'Tiết kiệm , vừa đủ trải nghiệm', color: '#009688' },
  { label: 'Thoải mái chi tiêu hợp lý', color: '#009688' },
  { label: 'Cao cấp , không giới hạn ngân sách', color: '#009688' },
];

export default function SurveyScreen() {
  const router = useRouter();
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  // Xác định trạng thái từng bước
  const [step, setStep] = useState(1);

  // Khi chọn xong câu 1 (ít nhất 1 lựa chọn), tự động sang câu 2
  const handleExperience = (label: string) => {
    setSelectedExperiences(prev => {
      const newArr = prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label];
      // Nếu chọn ít nhất 1, sang bước 2
      if (newArr.length > 0) setStep(2);
      return newArr;
    });
  };

  // Khi chọn xong câu 2, sang câu 3
  const handleTransport = (label: string) => {
    setSelectedTransport(label);
    setStep(3);
  };

  // Khi chọn xong câu 3, sang phần xác nhận
  const handleBudget = (label: string) => {
    setSelectedBudget(label);
    setStep(4);
  };

  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput>(null);

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
          <Text style={styles.headerTitle}>Trải nghiệm đúng gu bạn</Text>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="#757575" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          {/* Câu hỏi 1 */}
          {step >= 1 && (
            <>
              <View style={styles.box}>
                <Text style={styles.boxText}>
                  Chào bạn! Để mình hỗ trợ bạn đúng thứ bạn thích, mình cần biết một chút về gu du lịch của bạn nha
                </Text>
              </View>
              <View style={styles.questionRow}>
                <View style={styles.questionCircle}><Text style={styles.questionCircleText}>1</Text></View>
                <Text style={styles.questionHighlight}>Đi du lịch, bạn thích trải nghiệm gì nhất?</Text>
              </View>
              <View style={styles.gridWrap}>
                {EXPERIENCES.map(opt => (
                  <TouchableOpacity
                    key={opt.label}
                    style={[
                      styles.gridBtn,
                      selectedExperiences.includes(opt.label) && {
                        backgroundColor: opt.color,
                        shadowOpacity: 0.15,
                        borderColor: opt.color,
                      },
                    ]}
                    onPress={() => handleExperience(opt.label)}
                    activeOpacity={0.75}
                  >
                    <FontAwesome5
                      name={opt.icon as any}
                      size={24}
                      color={selectedExperiences.includes(opt.label) ? '#fff' : opt.color}
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={[
                      styles.gridText,
                      selectedExperiences.includes(opt.label) && { color: '#fff' }
                    ]}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Câu hỏi 2 */}
          {step >= 2 && (
            <>
              <View style={styles.questionRow}>
                <View style={styles.questionCircle}><Text style={styles.questionCircleText}>2</Text></View>
                <Text style={styles.questionHighlight}>Khi đi du lịch, bạn thường chọn cách di chuyển nào?</Text>
              </View>
              <View style={styles.gridWrap}>
                {TRANSPORTS.map(opt => (
                  <TouchableOpacity
                    key={opt.label}
                    style={[
                      styles.gridBtn,
                      selectedTransport === opt.label && {
                        backgroundColor: opt.color,
                        shadowOpacity: 0.15,
                        borderColor: opt.color,
                      },
                    ]}
                    onPress={() => handleTransport(opt.label)}
                    activeOpacity={0.75}
                  >
                    <FontAwesome5
                      name={opt.icon as any}
                      size={24}
                      color={selectedTransport === opt.label ? '#fff' : opt.color}
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={[
                      styles.gridText,
                      selectedTransport === opt.label && { color: '#fff' }
                    ]}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Câu hỏi 3 */}
          {step >= 3 && (
            <>
              <View style={styles.questionRow}>
                <View style={styles.questionCircle}><Text style={styles.questionCircleText}>3</Text></View>
                <Text style={styles.questionHighlight}>Bạn ưu tiên chuyến đi theo phong cách nào?</Text>
              </View>
              <View style={styles.gridWrap}>
                {BUDGETS.map(opt => (
                  <TouchableOpacity
                    key={opt.label}
                    style={[
                      styles.gridBtn,
                      selectedBudget === opt.label && {
                        backgroundColor: opt.color,
                        shadowOpacity: 0.15,
                        borderColor: opt.color,
                      },
                    ]}
                    onPress={() => handleBudget(opt.label)}
                    activeOpacity={0.75}
                  >
                    <Text style={[
                      styles.gridText,
                      selectedBudget === opt.label && { color: '#fff' }
                    ]}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Xác nhận */}
          {step >= 4 && (
            <>
              <View style={[styles.box, { marginTop: 16, marginBottom: 8 }]}>
                <Text style={[styles.boxText, { color: '#009688', fontWeight: 'bold', marginBottom: 4 }]}>
                  Sở thích của bạn đã được lưu!
                </Text>
                <Text style={styles.boxText}>
                  Sẵn sàng cho hành trình đúng gu và tiện lợi chưa? 😎
                </Text>
              </View>
              <TouchableOpacity style={styles.letsGoBtn} onPress={() => router.push('/screens/HomeScreen')}>
                <Text style={styles.letsGoText}>Let's go</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
        {/* Input giống ChatScreen */}
        <View style={styles.inputRow}>
          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="happy-outline" size={26} color="#b0b0b0" />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor="#b0b0b0"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => setInput('')}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={() => inputRef.current?.focus()} activeOpacity={0.6}>
            <Ionicons name="mic-outline" size={26} color="#b0b0b0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInput('')} activeOpacity={0.6}>
            <Ionicons name="send" size={26} color="#0097a7" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#009688',
  },
  box: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  boxText: {
    color: '#222',
    fontSize: 14,
    lineHeight: 20,
  },
  question: {
    color: '#222',
    fontSize: 15,
    marginBottom: 8,
    fontWeight: '500',
    marginTop: 4,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 0,
  },
  gridBtn: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: '#f5f5f5',
    minHeight: 80,
  },
  gridText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
  letsGoBtn: {
    backgroundColor: '#009688',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  letsGoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdfa',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    marginTop: 8,
    shadowColor: '#009688',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  questionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#009688',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#009688',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  questionCircleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  questionHighlight: {
    color: '#009688',
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
});