import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const QUICK_REPLIES = [
  { label: 'Tôi đang ở cổng', value: 'Tôi đang ở cổng' },
  { label: 'Anh đến chưa?', value: 'Anh đến chưa?' },
  { label: 'Gửi vị trí hiện tại', value: 'location' },
  { label: 'Tôi sẽ ra ngay', value: 'Tôi sẽ ra ngay' },
];

const EMOJI_LIST = ['😀','👍','🙏','🚗','😂','🥰','😎','🎉','😅','❤️'];

const USER_AVATAR = require('../assets/images/welcome.jpg');
const DRIVER_AVATAR = require('../assets/images/ladypage1.jpg');

type Message =
  | { id: number; type: 'text'; text: string; sender: 'user' }
  | { id: number; type: 'map'; image: any }
  | { id: number; type: 'driver'; driver: { name: string; rating: number; reviews: number; distance: string } }
  | { id: number; type: 'status'; status: string; eta: string }
  | { id: number; type: 'actions' }

export default function ChatwithDriver() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [isDriverTyping, setIsDriverTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'system', text: 'Xe của bạn đang trên đường đến điểm đón!' },
    { id: 2, type: 'driver', text: 'Chào bạn, tôi là Nguyễn Văn A, tài xế của bạn hôm nay. Bạn đang ở vị trí nào để tôi dễ đón hơn?' },
  ]);

  // Tự động gửi "Tài xế đã đến điểm đón!" sau 10s
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), type: 'system', text: 'Tài xế đã đến điểm đón!' }]);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Gửi tin nhắn
  const handleSend = (msg?: string) => {
    const text = msg || input.trim();
    if (!text) return;
    if (text === 'location') {
      setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: 'Vị trí của tôi: 10.123456, 106.123456 (giả lập)' }]);
    } else {
      setMessages(prev => [...prev, { id: Date.now(), type: 'user', text }]);
    }
    setInput('');
    setShowEmoji(false);
    // Hiển thị trạng thái tài xế đang trả lời
    setIsDriverTyping(true);
    setTimeout(() => {
      setIsDriverTyping(false);
      if (text === 'Anh đến chưa?') {
        setMessages(prev => [...prev, { id: Date.now(), type: 'driver', text: 'Tôi còn cách bạn 2 phút, bạn chuẩn bị nhé!' }]);
      } else if (text === 'Tôi đang ở cổng') {
        setMessages(prev => [...prev, { id: Date.now(), type: 'driver', text: 'Tôi thấy bạn rồi, tôi sẽ dừng xe ở đó.' }]);
      } else if (text === 'Tôi sẽ ra ngay') {
        setMessages(prev => [...prev, { id: Date.now(), type: 'driver', text: 'Vâng, tôi sẽ đợi bạn ở cổng.' }]);
      } else if (text === 'location') {
        setMessages(prev => [...prev, { id: Date.now(), type: 'driver', text: 'Cảm ơn bạn đã gửi vị trí, tôi sẽ đến đó ngay.' }]);
      } else if (EMOJI_LIST.includes(text)) {
        setMessages(prev => [...prev, { id: Date.now(), type: 'driver', text: '👍' }]);
      }
    }, 1200);
  };

  // Quick reply
  const handleQuickReply = (reply: any) => {
    handleSend(reply.value);
  };

  // Kết thúc chuyến đi
  const handleEndTrip = () => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'system', text: 'Bạn đã lên xe thành công. Chúc bạn có chuyến đi vui vẻ!' }]);
    setTimeout(() => setShowRating(true), 1000);
  };

  // Render từng message
  const renderMessage = (msg: any, idx: number) => {
    if (msg.type === 'user') {
      return (
        <View key={msg.id} style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
          <View style={{ backgroundColor: '#009CA6', borderRadius: 16, padding: 12, maxWidth: '75%' }}>
            <Text style={{ color: '#fff', fontSize: 15 }}>{msg.text}</Text>
          </View>
          <Image source={USER_AVATAR} style={{ width: 28, height: 28, borderRadius: 14, marginLeft: 6 }} />
        </View>
      );
    }
    if (msg.type === 'driver') {
      return (
        <View key={msg.id} style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 }}>
          <Image source={DRIVER_AVATAR} style={{ width: 28, height: 28, borderRadius: 14, marginRight: 6 }} />
          <View style={{ backgroundColor: '#f2f2f2', borderRadius: 16, padding: 12, maxWidth: '75%' }}>
            <Text style={{ color: '#222', fontSize: 15 }}>{msg.text}</Text>
          </View>
        </View>
      );
    }
    if (msg.type === 'system') {
      return (
        <View key={msg.id} style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ color: '#009CA6', fontSize: 14, fontStyle: 'italic' }}>{msg.text}</Text>
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack?.()) router.back();
              else router.push('/screens/HomeScreen');
            }}
            style={{ padding: 8, marginLeft: -8 }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={24} color="#F4C95D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat với tài xế</Text>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="#F4C95D" />
          </TouchableOpacity>
        </View>
        {/* Mini-map */}
        <View style={styles.mapSection}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.85} onPress={() => setShowMapModal(true)}>
            <Image
              source={require('../assets/images/map.jpg')}
              style={styles.mapImage}
              resizeMode="cover"
            />
            {/* Nút phóng to bản đồ */}
            <TouchableOpacity style={styles.zoomBtn} onPress={() => setShowMapModal(true)}>
              <Ionicons name="expand" size={22} color="#009CA6" />
            </TouchableOpacity>
            {/* Icon xe và khách (giả lập) */}
            <View style={[styles.carIcon, { left: '40%', top: '60%' }]}> {/* Tài xế */}
              <Ionicons name="car" size={36} color="#F4C95D" />
            </View>
            <View style={[styles.carIcon, { left: '60%', top: '70%' }]}> {/* Khách */}
              <Ionicons name="person" size={32} color="#009CA6" />
            </View>
          </TouchableOpacity>
        </View>
        {/* Thông tin tài xế */}
        <View style={styles.driverInfo}>
          <View style={styles.avatarWrap}>
            <Ionicons name="person" size={40} color="#009CA6" style={{ alignSelf: 'center', marginTop: 4 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>Nguyễn Văn A</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#F4C95D" />
              <Text style={styles.ratingText}>4.9</Text>
              <Text style={styles.reviewText}>(3124 đánh giá)</Text>
            </View>
            <Text style={styles.distanceText}>Còn 300 mét.</Text>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call" size={22} color="#009CA6" />
          </TouchableOpacity>
        </View>
        {/* Khu vực chat */}
        <ScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }} contentContainerStyle={{ paddingBottom: 80 }}>
          {messages.map(renderMessage)}
          {isDriverTyping && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Image source={DRIVER_AVATAR} style={{ width: 28, height: 28, borderRadius: 14, marginRight: 6 }} />
              <View style={{ backgroundColor: '#f2f2f2', borderRadius: 16, padding: 12, maxWidth: '75%', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#222', fontSize: 15, marginRight: 8 }}>Tài xế đang trả lời...</Text>
                <Animated.View style={{ width: 24 }}>
                  <Ionicons name="ellipsis-horizontal" size={22} color="#009CA6" />
                </Animated.View>
              </View>
            </View>
          )}
        </ScrollView>
        {/* Quick replies */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8, marginBottom: 2 }}>
          {QUICK_REPLIES.map((q, idx) => (
            <TouchableOpacity
              key={idx}
              style={{ backgroundColor: '#E0F7FA', borderRadius: 18, paddingVertical: 8, paddingHorizontal: 18, marginRight: 8, marginBottom: 8 }}
              onPress={() => handleQuickReply(q)}
            >
              <Text style={{ color: '#009CA6', fontWeight: 'bold', fontSize: 15 }}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Input chat */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
        >
          <View style={styles.inputRow}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setShowEmoji(e => !e)}>
              <Ionicons name="happy-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Nhắn cho tài xế..."
              placeholderTextColor="#009CA6"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={() => handleSend('location')}>
              <Ionicons name="location" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSend()}>
              <Ionicons name="send" size={24} color="#F4C95D" />
            </TouchableOpacity>
          </View>
          {/* Emoji picker */}
          {showEmoji && (
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, marginBottom: 8, padding: 8, justifyContent: 'center', shadowColor: '#009CA6', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
              {EMOJI_LIST.map((emoji, idx) => (
                <TouchableOpacity key={idx} onPress={() => handleSend(emoji)} style={{ marginHorizontal: 4 }}>
                  <Text style={{ fontSize: 26 }}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* Nút kết thúc chuyến đi */}
        </KeyboardAvoidingView>
        {/* Modal phóng to ảnh bản đồ */}
        <Modal visible={showMapModal} transparent animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setShowMapModal(false)}>
            <View style={styles.modalContent}>
              <Image
                source={require('../assets/images/map.jpg')}
                style={styles.fullMapImage}
                resizeMode="contain"
              />
            </View>
          </Pressable>
        </Modal>
        {/* Popup đánh giá nhanh */}
        <Modal visible={showRating} transparent animationType="fade">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 28, alignItems: 'center', width: 320 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#009CA6', marginBottom: 12 }}>Bạn hài lòng với tài xế không?</Text>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                {[1,2,3,4,5].map(star => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Ionicons name={star <= rating ? 'star' : 'star-outline'} size={32} color="#F4C95D" style={{ marginHorizontal: 2 }} />
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={{ backgroundColor: '#009CA6', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 32 }}
                onPress={() => setShowRating(false)}
                disabled={rating === 0}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Gửi đánh giá</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.2,
    flex: 1,
    textAlign: 'center',
    marginLeft: -24,
  },
  statusWrap: {
    flex: 1,
  },
  mapSection: {
    height: 180,
    backgroundColor: '#e0f7fa',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: 16,
    marginBottom: 0,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  zoomBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 6,
    shadowColor: '#009CA6',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 10,
  },
  carIcon: {
    position: 'absolute',
  },
  driverInfo: {
    flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 12, margin: 16, marginBottom: 0, shadowColor: '#009CA6', shadowOpacity: 0.06, shadowRadius: 6, elevation: 1,
  },
  avatarWrap: {
    width: 48, height: 48, borderRadius: 24, overflow: 'hidden', marginRight: 12, backgroundColor: '#eee',
  },
  driverName: {
    fontWeight: 'bold', color: '#222', fontSize: 15,
  },
  ratingRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 2,
  },
  ratingText: {
    color: '#009CA6', fontSize: 13, marginLeft: 4,
  },
  reviewText: {
    color: '#b0b0b0', fontSize: 13, marginLeft: 6,
  },
  distanceText: {
    color: '#009CA6', fontSize: 13, marginTop: 2,
  },
  callBtn: {
    backgroundColor: '#e0f7fa', borderRadius: 20, padding: 8, marginLeft: 8,
  },
  statusSection: {
    padding: 16, paddingTop: 8,
  },
  progressRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
  },
  progressBar: {
    flex: 1, height: 6, backgroundColor: '#009CA6', borderRadius: 3,
  },
  statusBox: {
    backgroundColor: '#f2f2f2', borderRadius: 8, padding: 10, marginBottom: 10,
  },
  statusTitle: {
    color: '#F44336', fontWeight: 'bold', fontSize: 15,
  },
  statusDesc: {
    color: '#222', fontSize: 14, marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionBtnCol: {
    width: '48%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#009CA6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 0,
  },
  actionBtnSelected: {
    backgroundColor: '#009CA6',
    borderColor: '#009CA6',
  },
  actionBtnText: {
    color: '#009CA6',
    fontWeight: 'bold',
  },
  actionBtnTextSelected: {
    color: '#fff',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fullMapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
