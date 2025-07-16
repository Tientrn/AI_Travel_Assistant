import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const driver = {
  name: 'Nguyễn Văn A',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg', // Thay bằng ảnh thật nếu có
  rating: 4.92,
  distance: 4.8,
  duration: 18,
};

const ratingOptions = [
  { icon: 'emoticon-sad-outline', label: 'Kém' },
  { icon: 'emoticon-neutral-outline', label: 'Trung bình' },
  { icon: 'emoticon-happy-outline', label: 'Khá' },
  { icon: 'emoticon-excited-outline', label: 'Tốt' },
  { icon: 'star-outline', label: 'Xuất sắc' }, // <-- SỬA LẠI ĐÚNG
];

const goodPoints = [
  { icon: <MaterialIcons name="workspace-premium" size={18} color="#00b6b6" />, label: 'Chuyên nghiệp' },
  { icon: <FontAwesome name="car" size={16} color="#00b6b6" />, label: 'Phương tiện sạch sẽ' },
  { icon: <MaterialCommunityIcons name="clock-check-outline" size={18} color="#00b6b6" />, label: 'Đúng giờ' },
  { icon: <MaterialCommunityIcons name="map-marker-path" size={18} color="#00b6b6" />, label: 'Lộ trình tốt' },
  { icon: <Entypo name="music" size={16} color="#00b6b6" />, label: 'Nhạc hay' },
  { icon: <MaterialCommunityIcons name="emoticon-excited-outline" size={18} color="#00b6b6" />, label: 'Trò chuyện vui vẻ' },
];

const paymentMethods = [
  { icon: <MaterialIcons name="attach-money" size={20} color="#00b6b6" />, label: 'Tiền mặt' },
  { icon: <MaterialCommunityIcons name="bank-transfer" size={20} color="#00b6b6" />, label: 'Chuyển khoản' },
  { icon: <FontAwesome name="credit-card" size={18} color="#00b6b6" />, label: 'Thẻ tín dụng' },
];

export default function TripRating({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);
  const [otherFeedback, setOtherFeedback] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<number>(0);

  const togglePoint = (idx: number) => {
    setSelectedPoints((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <View >
      {/* ĐÃ BỎ HEADER Ở ĐÂY */}
      <ScrollView contentContainerStyle={{  paddingBottom: 32 }}>
        {/* Driver Card */}
        <View style={styles.driverCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: driver.avatar }} style={styles.avatar} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#222' }}>
                Cảm ơn bạn đã đi cùng
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Text style={{ color: '#00b6b6', fontWeight: 'bold' }}>{driver.name}</Text>
                <MaterialIcons name="verified" size={16} color="#00d47e" style={{ marginLeft: 4 }} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Ionicons name="star" size={14} color="#F4C95D" />
                <Text style={{ marginLeft: 2, color: '#666', fontWeight: 'bold' }}>{driver.rating}</Text>
              </View>
            </View>
          </View>
          <View style={styles.tripInfoRow}>
            <View style={styles.tripInfoItem}>
              <MaterialCommunityIcons name="map-marker-distance" size={18} color="#F4C95D" />
              <Text style={styles.tripInfoLabel}>Quãng đường</Text>
              <Text style={styles.tripInfoValue}>{driver.distance} km</Text>
            </View>
            <View style={styles.tripInfoItem}>
              <MaterialCommunityIcons name="clock-outline" size={18} color="#F4C95D" />
              <Text style={styles.tripInfoLabel}>Thời gian</Text>
              <Text style={styles.tripInfoValue}>{driver.duration} phút</Text>
            </View>
          </View>
        </View>

        {/* Rating */}
        <Text style={styles.sectionTitle}>Bạn thấy chuyến đi thế nào?</Text>
        <View style={styles.ratingRow}>
          {ratingOptions.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.ratingIcon,
                selectedRating === idx && { backgroundColor: '#e0f7fa' },
              ]}
              onPress={() => setSelectedRating(idx)}
            >
              <MaterialCommunityIcons
                name={opt.icon as any}
                size={32}
                color={selectedRating === idx ? '#00b6b6' : '#bdbdbd'}
              />
              <Text
                style={{
                  color: selectedRating === idx ? '#00b6b6' : '#888',
                  fontSize: 13,
                  marginTop: 2,
                }}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Good Points */}
        <Text style={styles.sectionTitle}>Bạn thấy điểm nào tốt?</Text>
        <View style={styles.goodPointsRow}>
          {goodPoints.map((pt, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.goodPointBtn,
                selectedPoints.includes(idx) && { backgroundColor: '#00b6b6' },
              ]}
              onPress={() => togglePoint(idx)}
            >
              {React.cloneElement(pt.icon, {
                color: selectedPoints.includes(idx) ? '#fff' : '#00b6b6',
              })}
              <Text
                style={{
                  color: selectedPoints.includes(idx) ? '#fff' : '#00b6b6',
                  marginLeft: 4,
                  fontSize: 13,
                }}
              >
                {pt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Other Feedback */}
        <Text style={styles.sectionTitle}>Ý kiến khác (tùy chọn)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Hãy chia sẻ thêm chi tiết về trải nghiệm của bạn..."
          placeholderTextColor="#bdbdbd"
          value={otherFeedback}
          onChangeText={setOtherFeedback}
          multiline
        />

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <View style={styles.paymentRow}>
          {paymentMethods.map((pm, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.paymentBtn,
                selectedPayment === idx && { backgroundColor: '#00b6b6' },
              ]}
              onPress={() => setSelectedPayment(idx)}
            >
              {React.cloneElement(pm.icon, {
                color: selectedPayment === idx ? '#fff' : '#00b6b6',
              })}
              <Text
                style={{
                  color: selectedPayment === idx ? '#fff' : '#00b6b6',
                  marginLeft: 6,
                  fontWeight: 'bold',
                }}
              >
                {pm.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.skipBtn}>
            <Text style={{ color: '#00b6b6', fontWeight: 'bold' }}>Bỏ qua</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
            <Ionicons name="send" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Gửi đánh giá</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#00b6b6',
  },
  driverCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#009CA6',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#00b6b6',
  },
  tripInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  tripInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  tripInfoLabel: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  tripInfoValue: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#00b6b6',
    fontSize: 15,
    marginTop: 18,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ratingIcon: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 6,
    borderRadius: 10,
  },
  goodPointsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  goodPointBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#222',
    minHeight: 60,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 18,
  },
  paymentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginRight: 10,
    justifyContent: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  skipBtn: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginRight: 8,
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#00b6b6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    marginLeft: 8,
  },
});
