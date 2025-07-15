import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DetailBookingProps = {
  destination: string;
  pickup: string;
  selectedTime: string;
  selectedCar: string;
  onEdit?: () => void;
  onConfirm?: () => void;
};

export default function DetailBooking({ destination, pickup, selectedTime, selectedCar, onEdit, onConfirm }: DetailBookingProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chi tiết chuyến đi</Text>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <MaterialIcons name="edit" size={18} color="#F4C95D" />
        </TouchableOpacity>
      </View>
      {/* Điểm đón */}
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="location" size={22} color="#009CA6" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Điểm đón</Text>
          <Text style={styles.value}>{pickup}</Text>
          <Text style={styles.desc}>55 Trần Hưng Đạo, Phú Quốc, Kiên Giang</Text>
        </View>
      </View>
      {/* Điểm đến */}
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="flag" size={22} color="#009CA6" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Điểm đến</Text>
          <Text style={styles.value}>{destination}</Text>
          <Text style={styles.desc}>Điểm tham quan du lịch</Text>
        </View>
      </View>
      {/* Thời gian đón & Phương tiện */}
      <View style={[styles.row, { marginBottom: 0 }]}> 
        <View style={styles.iconWrap}>
          <Ionicons name="time" size={22} color="#009CA6" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Thời gian đón</Text>
          <Text style={styles.value}>{selectedTime === 'now' ? 'Ngay bây giờ' : 'Thời gian khác'}</Text>
        </View>
        <View style={styles.iconWrap}>
          <FontAwesome5 name="car-side" size={20} color="#009CA6" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Phương tiện</Text>
          <Text style={styles.value}>{selectedCar === '4' ? '4 chỗ' : selectedCar === '7' ? '7 chỗ' : 'Xe máy'}</Text>
        </View>
      </View>
      {/* Giá ước tính */}
      <View style={styles.divider} />
      <View style={styles.priceActionRow}>
        <View>
          <Text style={styles.priceLabel}>Giá ước tính</Text>
          <Text style={styles.priceValue}>125,000 VND</Text>
        </View>
        <TouchableOpacity style={[styles.actionBtn, styles.actionBtnPrimary, {flexShrink: 0, paddingHorizontal: 16, marginLeft: 35}]} onPress={onConfirm}> 
          <Text style={[styles.actionBtnText, styles.actionBtnTextPrimary]}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFDFD',
    borderRadius: 16,
    padding: 18,
    marginTop: 6,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 0,
    maxWidth: '88%',
    alignSelf: 'flex-start',
    shadowColor: '#009CA6',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009CA6',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginHorizontal: -18,
    marginTop: -18,
    marginBottom: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  editBtn: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#009CA6',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
    gap: 12,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F4C95D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 0,
  },
  label: {
    fontSize: 13,
    color: '#009CA6',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  desc: {
    fontSize: 12,
    color: '#b0b0b0',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  divider: {
    height: 1,
    backgroundColor: '#b2dfdb',
    marginVertical: 10,
    borderRadius: 1,
  },
  priceLabel: {
    fontSize: 13,
    color: '#F4C95D',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 20,
    color: '#009CA6',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  priceActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginLeft: 8,
    marginRight: 8,
  },
  actionBtn: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    flexDirection: 'row',
  },
  actionBtnPrimary: {
    backgroundColor: '#009CA6',
    shadowColor: '#009CA6',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  actionBtnSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#009CA6',
  },
  actionBtnText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  actionBtnTextPrimary: {
    color: '#fff',
  },
  actionBtnTextSecondary: {
    color: '#009CA6',
  },
});
