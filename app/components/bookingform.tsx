import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type BookingFormProps = {
  onConfirm?: (data: {
    destination: string;
    pickup: string;
    selectedTime: string;
    selectedCar: string;
  }) => void;
};

export default function BookingForm({ onConfirm }: BookingFormProps) {
  const [selectedLocation, setSelectedLocation] = useState<'current' | 'custom'>('current');
  const [selectedTime, setSelectedTime] = useState<'now' | 'custom'>('now');
  const [selectedCar, setSelectedCar] = useState<'4' | '7' | 'bike'>('4');
  const [destination, setDestination] = useState('Suối Tranh Phú Quốc, Ấp suối Mây, xã Dương Tơ');
  const [pickup, setPickup] = useState('Vị trí hiện tại');

  return (
    <View style={styles.card}>
      {/* Label: Điểm đến */}
      <Text style={styles.sectionTitle}>Điểm đến</Text>
      <View style={styles.inputGroup}>
        <Ionicons name="location-outline" size={18} color="#009CA6" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập điểm đến"
          placeholderTextColor="#b2dfdb"
          value={destination}
          onChangeText={setDestination}
          editable={true}
        />
      </View>
      {/* Label: Điểm đón */}
      <Text style={styles.sectionTitle}>Điểm đón</Text>
      <View style={styles.inputGroup}>
        <Ionicons name="location-outline" size={18} color="#009CA6" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập điểm đón"
          placeholderTextColor="#b2dfdb"
          value={pickup}
          onChangeText={setPickup}
          editable={true}
        />
      </View>
      {/* Nút chọn vị trí */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.selectBtn, selectedLocation === 'current' ? styles.selectBtnActive : styles.selectBtnInactive]}
          onPress={() => {
            setSelectedLocation('current');
            setPickup('Vị trí hiện tại');
          }}
        >
          <Ionicons name="locate" size={18} color={selectedLocation === 'current' ? '#fff' : '#009CA6'} style={{ marginRight: 6 }} />
          <Text style={[styles.selectBtnText, selectedLocation === 'current' && { color: '#fff' }]}>Vị trí hiện tại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectBtn, selectedLocation === 'custom' ? styles.selectBtnActive : styles.selectBtnInactive]}
          onPress={() => setSelectedLocation('custom')}
        >
          <MaterialCommunityIcons name="map-marker-radius-outline" size={18} color={selectedLocation === 'custom' ? '#fff' : '#009CA6'} style={{ marginRight: 6 }} />
          <Text style={[styles.selectBtnText, selectedLocation === 'custom' && { color: '#fff' }]}>Chọn vị trí</Text>
        </TouchableOpacity>
      </View>
      {/* Label: Thời gian đón */}
      <Text style={styles.sectionTitle}>Thời gian đón</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.selectBtn, selectedTime === 'now' ? styles.selectBtnActive : styles.selectBtnInactive]}
          onPress={() => setSelectedTime('now')}
        >
          <Ionicons name="time-outline" size={18} color={selectedTime === 'now' ? '#fff' : '#009CA6'} style={{ marginRight: 6 }} />
          <Text style={[styles.selectBtnText, selectedTime === 'now' && { color: '#fff' }]}>Ngay bây giờ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectBtn, selectedTime === 'custom' ? styles.selectBtnActive : styles.selectBtnInactive]}
          onPress={() => setSelectedTime('custom')}
        >
          <Ionicons name="calendar-outline" size={18} color={selectedTime === 'custom' ? '#fff' : '#009CA6'} style={{ marginRight: 6 }} />
          <Text style={[styles.selectBtnText, selectedTime === 'custom' && { color: '#fff' }]}>Chọn thời gian khác</Text>
        </TouchableOpacity>
      </View>
      {/* Label: Chọn loại xe */}
      <Text style={styles.sectionTitle}>Chọn loại xe</Text>
      <View style={styles.carRow}>
        <TouchableOpacity
          style={[styles.carBtn, selectedCar === '4' ? styles.carBtnActive : styles.carBtnInactive]}
          onPress={() => setSelectedCar('4')}
        >
          <FontAwesome5 name="car-side" size={20} color={selectedCar === '4' ? '#fff' : '#009CA6'} />
          <Text style={[styles.carBtnTitle, selectedCar === '4' && { color: '#fff' }]}>4 chỗ</Text>
          <Text style={[styles.carBtnDesc, selectedCar === '4' && { color: '#fff' }]}>Tiết kiệm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.carBtn, selectedCar === '7' ? styles.carBtnActive : styles.carBtnInactive]}
          onPress={() => setSelectedCar('7')}
        >
          <FontAwesome5 name="shuttle-van" size={20} color={selectedCar === '7' ? '#fff' : '#009CA6'} />
          <Text style={[styles.carBtnTitle, selectedCar === '7' && { color: '#fff' }]}>7 chỗ</Text>
          <Text style={[styles.carBtnDesc, selectedCar === '7' && { color: '#fff' }]}>Phù hợp gia đình</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.carBtn, selectedCar === 'bike' ? styles.carBtnActive : styles.carBtnInactive]}
          onPress={() => setSelectedCar('bike')}
        >
          <FontAwesome5 name="motorcycle" size={20} color={selectedCar === 'bike' ? '#fff' : '#009CA6'} />
          <Text style={[styles.carBtnTitle, selectedCar === 'bike' && { color: '#fff' }]}>Xe máy</Text>
          <Text style={[styles.carBtnDesc, selectedCar === 'bike' && { color: '#fff' }]}>Nhanh chóng</Text>
        </TouchableOpacity>
      </View>
      {/* Box tổng kết */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Ionicons name="location-outline" size={16} color="#009CA6" style={{ marginRight: 6 }} />
          <Text style={styles.summaryText} numberOfLines={1}>{destination}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Ionicons name="time-outline" size={16} color="#009CA6" style={{ marginRight: 6 }} />
          <Text style={styles.summaryText}>{selectedTime === 'now' ? 'Ngay bây giờ' : 'Thời gian khác'}</Text>
        </View>
        <View style={styles.summaryRow}>
          <FontAwesome5 name={selectedCar === 'bike' ? 'motorcycle' : selectedCar === '7' ? 'shuttle-van' : 'car-side'} size={16} color="#009CA6" style={{ marginRight: 6 }} />
          <Text style={styles.summaryText}>{selectedCar === '4' ? '4 chỗ - tiết kiệm' : selectedCar === '7' ? '7 chỗ - phù hợp gia đình' : 'Xe máy - nhanh chóng'}</Text>
        </View>
      </View>
      {/* Nút xác nhận */}
      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={() => onConfirm && onConfirm({
          destination,
          pickup,
          selectedTime,
          selectedCar,
        })}
        activeOpacity={0.85}
      >
        <Text style={styles.confirmBtnText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    width: '100%',
    shadowColor: '#009CA6',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 6,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#009CA6',
    letterSpacing: 0.2,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#b2dfdb',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  selectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#b2dfdb',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 0,
    justifyContent: 'center',
    shadowColor: '#009CA6',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  selectBtnActive: {
    backgroundColor: '#009CA6',
    borderColor: '#009CA6',
    shadowColor: '#009CA6',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  selectBtnInactive: {
    backgroundColor: '#fff',
    borderColor: '#b2dfdb',
  },
  selectBtnText: {
    color: '#009CA6',
    fontWeight: 'bold',
    fontSize: 15,
  },
  carRow: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 8,
  },
  carBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#b2dfdb',
  },
  carBtnActive: {
    backgroundColor: '#009CA6',
    borderColor: '#009CA6',
    shadowColor: '#009CA6',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  carBtnInactive: {
    backgroundColor: '#fff',
    borderColor: '#b2dfdb',
  },
  carBtnTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 2,
    color: '#009CA6',
  },
  carBtnDesc: {
    fontSize: 12,
    color: '#b2dfdb',
  },
  summaryBox: {
    backgroundColor: '#FDFDFD',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#b2dfdb',
    padding: 14,
    marginBottom: 18,
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 14,
    color: '#222',
    flex: 1,
    flexWrap: 'wrap',
  },
  confirmBtn: {
    backgroundColor: '#F4C95D',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
    width: '100%',
    shadowColor: '#009CA6',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  confirmBtnText: {
    color: '#009CA6',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
