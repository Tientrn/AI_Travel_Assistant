import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

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
  { label: 'Tiết kiệm, vừa đủ trải nghiệm' },
  { label: 'Thoải mái chi tiêu hợp lý' },
  { label: 'Cao cấp, không giới hạn ngân sách' },
];

// Fake voice recognition
function fakeSpeechToText(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Tôi thích chụp ảnh đẹp và ăn hải sản tươi"), 1500);
  });
}

export default function SurveyScreen() {
  const router = useRouter();
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hey! Mình là Travel Buddy 🤖 Hãy cho mình biết gu du lịch của bạn nhé!',
      step: 1
    }
  ]);
  const [isAITyping, setIsAITyping] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Voice input handler
  const handleVoiceInput = async () => {
    setIsRecording(true);
    setMessages(prev => [...prev, { type: 'user', text: 'Đang lắng nghe...', step }]);
    
    const text = await fakeSpeechToText();
    setIsRecording(false);
    
    // Remove "Đang lắng nghe..." and add real response
    setMessages(prev => prev.filter(msg => msg.text !== 'Đang lắng nghe...'));
    setMessages(prev => [...prev, { type: 'user', text, step }]);
    setInput(text);
    
    // Auto process the response
    setTimeout(() => processUserResponse(text), 500);
  };

  // Process user response (voice or text)
  const processUserResponse = (response: string) => {
    const lowerResponse = response.toLowerCase();
    
    // Map voice/text response to options
    if (step === 1) {
      const newExperiences: string[] = [];
      if (lowerResponse.includes('thư giãn') || lowerResponse.includes('nghỉ dưỡng') || lowerResponse.includes('spa')) {
        newExperiences.push('Thư giãn nghỉ dưỡng');
      }
      if (lowerResponse.includes('thiên nhiên') || lowerResponse.includes('khám phá') || lowerResponse.includes('tree')) {
        newExperiences.push('Khám phá thiên nhiên');
      }
      if (lowerResponse.includes('ăn') || lowerResponse.includes('ẩm thực') || lowerResponse.includes('hải sản') || lowerResponse.includes('utensils')) {
        newExperiences.push('Ăn uống - ẩm thực');
      }
      if (lowerResponse.includes('chụp ảnh') || lowerResponse.includes('check-in') || lowerResponse.includes('sống ảo') || lowerResponse.includes('camera')) {
        newExperiences.push('Check-in sống ảo');
      }
      if (lowerResponse.includes('văn hóa') || lowerResponse.includes('địa phương') || lowerResponse.includes('landmark')) {
        newExperiences.push('Trải nghiệm văn hóa địa phương');
      }
      
              if (newExperiences.length > 0) {
          setSelectedExperiences(newExperiences);
          addBotMessage('Nice! 🎯 Bạn thích di chuyển kiểu gì khi đi du lịch?', 2);
          setStep(2);
        }
          } else if (step === 2) {
        const newTransports: string[] = [];
        if (lowerResponse.includes('tự lái') || lowerResponse.includes('car')) {
          newTransports.push('Tự lái');
        }
        if (lowerResponse.includes('gọi xe') || lowerResponse.includes('taxi')) {
          newTransports.push('Gọi xe khi cần');
        }
        if (lowerResponse.includes('công cộng') || lowerResponse.includes('bus')) {
          newTransports.push('Phương tiện công cộng');
        }
        if (lowerResponse.includes('đi bộ') || lowerResponse.includes('xe đạp') || lowerResponse.includes('biking')) {
          newTransports.push('Đi bộ hoặc xe đạp');
        }
        
        if (newTransports.length > 0) {
          setSelectedTransports(newTransports);
          addBotMessage('Cool! 🚀 Cuối cùng, bạn thích du lịch kiểu gì?', 3);
          setStep(3);
        }
    } else if (step === 3) {
              if (lowerResponse.includes('tiết kiệm') || lowerResponse.includes('vừa đủ')) {
          setSelectedBudget('Tiết kiệm, vừa đủ trải nghiệm');
          addBotMessage('Perfect! 🎉 Mình đã hiểu gu của bạn rồi. Sẵn sàng khám phá chưa? 😎', 4);
          setStep(4);
        } else if (lowerResponse.includes('thoải mái') || lowerResponse.includes('hợp lý')) {
          setSelectedBudget('Thoải mái chi tiêu hợp lý');
          addBotMessage('Perfect! 🎉 Mình đã hiểu gu của bạn rồi. Sẵn sàng khám phá chưa? 😎', 4);
          setStep(4);
        } else if (lowerResponse.includes('cao cấp') || lowerResponse.includes('không giới hạn')) {
          setSelectedBudget('Cao cấp, không giới hạn ngân sách');
          addBotMessage('Perfect! 🎉 Mình đã hiểu gu của bạn rồi. Sẵn sàng khám phá chưa? 😎', 4);
        }
    }
  };

  // Add bot message
  const addBotMessage = (text: string, currentStep: number) => {
    setMessages(prev => [...prev, { type: 'bot', text, step: currentStep }]);
  };

  // Handle send text input
  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { type: 'user', text: input.trim(), step }]);
      processUserResponse(input.trim());
      setInput('');
    }
  };

  // Handle option selection
  const handleExperience = (label: string) => {
    setSelectedExperiences(prev => {
      const newArr = prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label];
      return newArr;
    });
  };

  const handleTransport = (label: string) => {
    setSelectedTransports(prev => {
      const newArr = prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label];
      return newArr;
    });
  };

  const handleBudget = (label: string) => {
    setSelectedBudget(label);
  };

  // Get placeholder text based on current step
  const getPlaceholderText = () => {
    switch (step) {
      case 1: return "Mô tả sở thích du lịch của bạn hoặc nhấn 'Tiếp tục'...";
      case 2: return "Mô tả cách di chuyển bạn thích hoặc nhấn 'Tiếp tục'...";
      case 3: return "Mô tả phong cách du lịch bạn thích hoặc nhấn 'Tiếp tục'...";
      default: return "Nhập tin nhắn...";
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages, step]);

  // Render message
  const renderMessage = (message: any, idx: number) => {
    if (message.type === 'bot') {
      return (
        <View key={`bot-${idx}`} style={styles.botMsgRow}>
          <View style={styles.botMsgBubble}>
            <Text style={styles.botMsgText}>{message.text}</Text>
          </View>
        </View>
      );
    }
    if (message.type === 'user') {
      return (
        <View key={`user-${idx}`} style={styles.userMsgRow}>
          <View style={styles.userMsgBubble}>
            <Text style={styles.userMsgText}>{message.text}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

    // Render options based on current step
  const renderOptions = () => {
    if (step === 1) {
      return (
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Chọn nhanh:</Text>
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
                  size={24}
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
          {selectedExperiences.length > 0 && (
            <TouchableOpacity 
              style={styles.continueBtn} 
              onPress={() => {
                setMessages(prev => [...prev, { type: 'user', text: `Tôi thích: ${selectedExperiences.join(', ')}`, step }]);
                addBotMessage('Nice! 🎯 Bạn thích di chuyển kiểu gì khi đi du lịch?', 2);
                setStep(2);
              }}
            >
              <Text style={styles.continueText}>Tiếp tục</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else if (step === 2) {
      return (
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Chọn nhanh:</Text>
          <View style={styles.gridWrap}>
            {TRANSPORTS.map(opt => (
              <TouchableOpacity
                key={opt.label}
                style={[
                  styles.gridBtn,
                  selectedTransports.includes(opt.label) && styles.gridBtnActive
                ]}
                onPress={() => handleTransport(opt.label)}
                activeOpacity={0.8}
              >
                <FontAwesome5
                  name={opt.icon as any}
                  size={24}
                  color={selectedTransports.includes(opt.label) ? '#fff' : '#009CA6'}
                  style={{ marginBottom: 8 }}
                />
                <Text style={[
                  styles.gridText,
                  selectedTransports.includes(opt.label) && { color: '#fff' }
                ]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedTransports.length > 0 && (
            <TouchableOpacity 
              style={styles.continueBtn} 
              onPress={() => {
                setMessages(prev => [...prev, { type: 'user', text: `Tôi ưu tiên: ${selectedTransports.join(', ')}`, step }]);
                addBotMessage('Cool! 🚀 Cuối cùng, bạn thích du lịch kiểu gì?', 3);
                setStep(3);
              }}
            >
              <Text style={styles.continueText}>Tiếp tục</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else if (step === 3) {
      return (
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Chọn nhanh:</Text>
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
          {selectedBudget && (
            <TouchableOpacity 
              style={styles.continueBtn} 
              onPress={() => {
                setMessages(prev => [...prev, { type: 'user', text: `Tôi ưu tiên: ${selectedBudget}`, step }]);
                addBotMessage('Perfect! 🎉 Mình đã hiểu gu của bạn rồi. Sẵn sàng khám phá chưa? 😎', 4);
                setStep(4);
              }}
            >
              <Text style={styles.continueText}>Tiếp tục</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else if (step === 4) {
      return (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.letsGoBtn} onPress={() => router.push('/screens/HomeScreen')}>
            <Text style={styles.letsGoText}>Let&apos;s go</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

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
              <Ionicons name="arrow-back" size={24} color="#F4C95D" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>AI Travel Assistant</Text>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={24} color="#F4C95D" />
            </TouchableOpacity>
          </View>



          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Messages */}
            {messages.map((message, idx) => renderMessage(message, idx))}

            {/* AI typing indicator */}
            {isAITyping && (
              <View style={styles.botMsgRow}>
                <View style={styles.botMsgBubble}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ActivityIndicator size="small" color="#009CA6" style={{ marginRight: 8 }} />
                    <Text style={styles.botMsgText}>AI đang xử lý...</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Options */}
            {renderOptions()}
          </ScrollView>

          {/* Fixed Input Bar */}
          <View style={styles.inputRow}>
            <TouchableOpacity onPress={handleVoiceInput} disabled={isRecording}>
              <Ionicons 
                name={isRecording ? "mic" : "mic-outline"} 
                size={24} 
                color={isRecording ? "#F44336" : "#009CA6"} 
                style={{ marginHorizontal: 8 }} 
              />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder={getPlaceholderText()}
              placeholderTextColor="#009CA6"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              returnKeyType="send"
              editable={!isRecording}
            />
            <TouchableOpacity onPress={handleSend} disabled={!input.trim() || isRecording}>
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
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
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

  responseContainer: {
    marginTop: 10,
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  continueBtn: {
    backgroundColor: '#009CA6',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    marginTop: 16,
    shadowColor: '#009CA6',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});