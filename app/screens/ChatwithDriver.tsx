import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatwithDriver() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleSend = () => {
    if (input.trim() !== '') {
      setInput('');
    }
  };

  const handleZoomMap = () => {
    setShowMapModal(true);
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
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
         
          <Text style={styles.headerTitle}>AI Travel Assistant</Text>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="#F4C95D" />
          </TouchableOpacity>
        </View>
        {/* Khu vực trạng thái xe và tài xế */}
        <View style={styles.statusWrap}>
          {/* Bản đồ mô phỏng */}
          <View style={styles.mapSection}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.85} onPress={handleZoomMap}>
              <Image
                source={require('../assets/images/map.jpg')}
                style={styles.mapImage}
                resizeMode="cover"
              />
              {/* Nút phóng to */}
              <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomMap}>
                <Ionicons name="expand" size={22} color="#009CA6" />
              </TouchableOpacity>
              {/* Icon xe */}
              <View style={styles.carIcon}>
                <Ionicons name="car" size={48} color="#F4C95D" />
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
          {/* Trạng thái xe và các nút hành động */}
          <View style={styles.statusSection}>
            <View style={styles.progressRow}>
              <Ionicons name="car" size={18} color="#009CA6" style={{ marginRight: 8 }} />
              <View style={styles.progressBar} />
            </View>
            <View style={styles.statusBox}>
              <Text style={styles.statusTitle}>Xe của bạn đang trên đường đến!</Text>
              <Text style={styles.statusDesc}>⏱️ Thời gian đến dự kiến: 3 phút.{"\n"}Trong lúc chờ đợi, bạn có thể:</Text>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.actionBtnCol, selectedAction === 'weather' && styles.actionBtnSelected]}
                onPress={() => setSelectedAction('weather')}
              >
                <Ionicons name="cloud-outline" size={18} color={selectedAction === 'weather' ? '#fff' : '#009CA6'} style={{ marginRight: 6 }} />
                <Text style={[styles.actionBtnText, selectedAction === 'weather' && styles.actionBtnTextSelected]}>Thời tiết hôm nay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.actionBtnCol, selectedAction === 'contact' && styles.actionBtnSelected]}
                onPress={() => setSelectedAction('contact')}
              >
                <Ionicons name="call" size={18} color={selectedAction === 'contact' ? '#fff' : '#009CA6'} style={{ marginRight: 6 }} />
                <Text style={[styles.actionBtnText, selectedAction === 'contact' && styles.actionBtnTextSelected]}>Liên hệ tài xế</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.actionBtnCol, selectedAction === 'camera' && styles.actionBtnSelected]}
                onPress={() => setSelectedAction('camera')}
              >
                <Ionicons name="camera" size={18} color={selectedAction === 'camera' ? '#fff' : '#009CA6'} style={{ marginRight: 6 }} />
                <Text style={[styles.actionBtnText, selectedAction === 'camera' && styles.actionBtnTextSelected]}>Xem camera tài xế</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.actionBtnCol, selectedAction === 'traffic' && styles.actionBtnSelected]}
                onPress={() => setSelectedAction('traffic')}
              >
                <Ionicons name="car-sport" size={18} color={selectedAction === 'traffic' ? '#fff' : '#009CA6'} style={{ marginRight: 6 }} />
                <Text style={[styles.actionBtnText, selectedAction === 'traffic' && styles.actionBtnTextSelected]}>Xem kẹt xe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
        {/* Input chat */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
          style={{}}
        >
          <View style={styles.inputRow}>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="happy-outline" size={24} color="#009CA6" style={{ marginHorizontal: 8 }} />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Nhắn cho tài xế..."
              placeholderTextColor="#009CA6"
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
    position: 'absolute', left: '50%', top: '60%', marginLeft: -24,
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
