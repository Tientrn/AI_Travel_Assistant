import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, PanResponder, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Register from '../components/register';

export default function Home({ navigation }: any) {
  const [showUserReply, setShowUserReply] = useState(false);
  const [input, setInput] = useState('');
  const [userReplies, setUserReplies] = useState<string[]>([]);
  const [showRegister, setShowRegister] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const pan = useRef(new Animated.Value(0)).current;

  const handleSend = () => {
    if (input.trim() !== '') {
      setUserReplies([...userReplies, input]);
      setInput('');
    }
  };

  const showRegisterSheet = () => {
    pan.setValue(500); // bắt đầu từ dưới màn hình
    setShowRegister(true);
    Animated.timing(pan, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  };
  const hideRegisterSheet = () => {
    Animated.timing(pan, {
      toValue: 500,
      duration: 500, // hoặc 500 cho mượt hơn
      useNativeDriver: false,
    }).start(() => {
      setShowRegister(false);
      // KHÔNG cần pan.setValue(0) ngay lập tức, để lần show tiếp theo sẽ set lại
    });
  };

  // PanResponder cho bottom sheet
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
    onPanResponderMove: Animated.event([
      null,
      { dy: pan },
    ], { useNativeDriver: false }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 80) { hideRegisterSheet(); }
      else {
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
        enabled={!showRegister} // chỉ bật khi KHÔNG có popup
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ width: 24 }} />
          <Text style={styles.headerTitle}>AI Travel Assistant</Text>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="#757575" />
          </TouchableOpacity>
        </View>
        {/* Chat content */}
        <View style={styles.chatContent}>
          <View style={styles.botMsgRow}>
            <View style={styles.botMsgBubble}>
              <Text style={styles.botMsgText}>
                Xin chào! Tôi là trợ lý ảo AI, chào mừng bạn đến Phú Quốc 🏝️ Rất nhiều ưu đãi đang chờ bạn! Đăng ký thành viên ngay để nhận ưu đãi và quà tặng hấp dẫn 🎁
              </Text>
              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => {
                  setShowUserReply(true);
                  showRegisterSheet();
                }}
              >
                <Text style={styles.registerBtnText}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
          {showUserReply && (
            <View style={styles.userMsgRow}>
              <TouchableOpacity style={styles.registerBtn}>
                <Text style={styles.registerBtnText}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          )}
          {userReplies.map((msg, idx) => (
            <View style={styles.userMsgRow} key={idx}>
              <View style={styles.registerBtn}>
                <Text style={styles.registerBtnText}>{msg}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* Input */}
        <View style={styles.inputRow}>
          <Ionicons name="happy-outline" size={24} color="#757575" style={{ marginHorizontal: 8 }} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor="#757575"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={() => inputRef.current?.focus()}>
            <Ionicons name="mic-outline" size={24} color="#757575" style={{ marginHorizontal: 8 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSend}>
            <Ionicons name="send" size={24} color="#0097a7" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {showRegister && (
        <TouchableWithoutFeedback onPress={() => { hideRegisterSheet(); Keyboard.dismiss(); }}>
          <View style={styles.registerOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={0} // Đặt về 0 để không bị hở
              style={{ width: '100%', flex: 1, justifyContent: 'flex-end' }}
              enabled={showRegister}
            >
              <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
              >
                <Animated.View
                  style={[
                    styles.registerSheet,
                    { transform: [{ translateY: pan }] },
                  ]}
                  {...panResponder.panHandlers}
                >
                  <Register />
                </Animated.View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  chatContent: {
    flex: 1,
    padding: 16,
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
  registerBtn: {
    backgroundColor: '#0097a7',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  registerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  userMsgRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
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
  registerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
    zIndex: 100,
    flex: 1, // thêm dòng này
  },
  registerSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '90%',
    backgroundColor: 'transparent',
  },
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
}); 