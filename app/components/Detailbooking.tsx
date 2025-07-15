import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DetailBookingProps = {
  destination: string;
  pickup: string;
  selectedTime: string;
  selectedCar: string;
};

export default function DetailBooking({ destination, pickup, selectedTime, selectedCar }: DetailBookingProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chi tiết chuyến đi</Text>
        <TouchableOpacity style={styles.editBtn}>
          <MaterialIcons name="edit" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Điểm đón */}
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="location" size={22} color="#fff" />
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
          <Ionicons name="flag" size={22} color="#fff" />
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
          <Ionicons name="time" size={22} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Thời gian đón</Text>
          <Text style={styles.value}>{selectedTime === 'now' ? 'Ngay bây giờ' : 'Thời gian khác'}</Text>
        </View>
        <View style={styles.iconWrap}>
          <FontAwesome5 name="car-side" size={20} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Phương tiện</Text>
          <Text style={styles.value}>{selectedCar === '4' ? '4 chỗ' : selectedCar === '7' ? '7 chỗ' : 'Xe máy'}</Text>
        </View>
      </View>
      {/* Giá ước tính */}
      <View style={styles.divider} />
      <Text style={styles.priceLabel}>Giá ước tính</Text>
      <Text style={styles.priceValue}>125,000 VND</Text>
      {/* Nút xác nhận/chỉnh sửa */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.actionBtnPrimary]}>
          <Text style={[styles.actionBtnText, styles.actionBtnTextPrimary]}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]}>
          <Text style={[styles.actionBtnText, styles.actionBtnTextSecondary]}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginTop: 6,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 0,
    maxWidth: '88%',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bfa5',
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
    backgroundColor: '#0097a7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 0,
  },
  label: {
    fontSize: 13,
    color: '#757575',
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
    backgroundColor: '#eee',
    marginVertical: 10,
    borderRadius: 1,
  },
  priceLabel: {
    fontSize: 13,
    color: '#757575',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 20,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 14,
    marginLeft: 8,
    gap: 10,
  },
  actionBtn: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  actionBtnPrimary: {
    backgroundColor: '#009688',
  },
  actionBtnSecondary: {
    backgroundColor: '#f2f2f2',
  },
  actionBtnText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  actionBtnTextPrimary: {
    color: '#fff',
  },
  actionBtnTextSecondary: {
    color: '#009688',
  },
});
