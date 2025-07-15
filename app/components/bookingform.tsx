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
    <View style={styles.container}>
      {/* Label: Điểm đến */}
      <Text style={styles.label}>Điểm đến</Text>
      <View style={styles.inputGroup}>
        <Ionicons name="location-outline" size={18} color="#009688" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập điểm đến"
          placeholderTextColor="#b0b0b0"
          value={destination}
          onChangeText={setDestination}
          editable={true}
        />
      </View>
      {/* Label: Điểm đón */}
      <Text style={styles.label}>Điểm đón</Text>
      <View style={styles.inputGroup}>
        <Ionicons name="location-outline" size={18} color="#009688" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập điểm đón"
          placeholderTextColor="#b0b0b0"
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
          <Ionicons name="locate" size={18} color={selectedLocation === 'current' ? '#fff' : '#009688'} style={{ marginRight: 6 }} />
          <Text style={[styles.selectBtnText, selectedLocation === 'current' && { color: '#fff' }]}>Vị trí hiện tại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectBtn, selectedLocation === 'custom' ? styles.selectBtnActive : styles.selectBtnInactive]}
          onPress={() => setSelectedLocation('custom')}
        >
          <MaterialCommunityIcons name="map-marker-radius-outline" size={18} color={selectedLocation === 'custom' ? '#fff' : '#009688'} style={{ marginRight: 6 }} />
          <Text style={[styles.selectBtnText, selectedLocation === 'custom' && { color: '#fff' }]}>Chọn vị trí</Text>
        </TouchableOpacity>
      </View>
      {/* Label: Thời gian đón */}
      <Text style={styles.label}>Thời gian đón</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.selectBtn, selectedTime === 'now' ? styles.selectBtnActive : styles.selectBtnInactive]}
          onPress={() => setSelectedTime('now')}
        >
          <Ionicons name="time-outline" size={18} color={selectedTime === 'now' ? '#fff' : '#009688'} style={{ marginRight: 6 }} />
          <Text style={[styles.selectBtnText, selectedTime === 'now' && { color: '#fff' }]}>Ngay bây giờ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectBtn, selectedTime === 'custom' ? styles.selectBtnActive : styles.selectBtnInactive]}
          onPress={() => setSelectedTime('custom')}
        >
          <Ionicons name="calendar-outline" size={18} color={selectedTime === 'custom' ? '#fff' : '#009688'} style={{ marginRight: 6 }} />
          <Text style={[styles.selectBtnText, selectedTime === 'custom' && { color: '#fff' }]}>Chọn thời gian khác</Text>
        </TouchableOpacity>
      </View>
      {/* Label: Chọn loại xe */}
      <Text style={styles.label}>Chọn loại xe</Text>
      <View style={styles.carRow}>
        <TouchableOpacity
          style={[styles.carBtn, selectedCar === '4' ? styles.carBtnActive : styles.carBtnInactive]}
          onPress={() => setSelectedCar('4')}
        >
          <FontAwesome5 name="car-side" size={20} color={selectedCar === '4' ? '#009688' : '#b0b0b0'} />
          <Text style={[styles.carBtnTitle, selectedCar === '4' && { color: '#009688' }]}>4 chỗ</Text>
          <Text style={[styles.carBtnDesc, selectedCar === '4' && { color: '#4dd0c6' }]}>Tiết kiệm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.carBtn, selectedCar === '7' ? styles.carBtnActive : styles.carBtnInactive]}
          onPress={() => setSelectedCar('7')}
        >
          <FontAwesome5 name="shuttle-van" size={20} color={selectedCar === '7' ? '#009688' : '#b0b0b0'} />
          <Text style={[styles.carBtnTitle, selectedCar === '7' && { color: '#009688' }]}>7 chỗ</Text>
          <Text style={[styles.carBtnDesc, selectedCar === '7' && { color: '#4dd0c6' }]}>Phù hợp gia đình</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.carBtn, selectedCar === 'bike' ? styles.carBtnActive : styles.carBtnInactive]}
          onPress={() => setSelectedCar('bike')}
        >
          <FontAwesome5 name="motorcycle" size={20} color={selectedCar === 'bike' ? '#009688' : '#b0b0b0'} />
          <Text style={[styles.carBtnTitle, selectedCar === 'bike' && { color: '#009688' }]}>Xe máy</Text>
          <Text style={[styles.carBtnDesc, selectedCar === 'bike' && { color: '#4dd0c6' }]}>Nhanh chóng</Text>
        </TouchableOpacity>
      </View>
      {/* Box tổng kết */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Ionicons name="location-outline" size={16} color="#009688" style={{ marginRight: 6 }} />
          <Text style={styles.summaryText} numberOfLines={1}>{destination}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Ionicons name="time-outline" size={16} color="#009688" style={{ marginRight: 6 }} />
          <Text style={styles.summaryText}>Ngay bây giờ</Text>
        </View>
        <View style={styles.summaryRow}>
          <FontAwesome5 name={selectedCar === 'bike' ? 'motorcycle' : selectedCar === '7' ? 'shuttle-van' : 'car-side'} size={16} color="#009688" style={{ marginRight: 6 }} />
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
      >
        <Text style={styles.confirmBtnText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 18,
    paddingBottom: 24,
    margin: 0,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: '#757575',
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
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
    color: '#b0b0b0',
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  selectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#b2dfdb',
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginRight: 10,
    justifyContent: 'center',
  },
  selectBtnActive: {
    backgroundColor: '#009688',
    borderColor: '#009688',
  },
  selectBtnInactive: {
    backgroundColor: '#fff',
    borderColor: '#b2dfdb',
  },
  selectBtnText: {
    color: '#009688',
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
    borderColor: '#e0e0e0',
  },
  carBtnActive: {
    backgroundColor: '#e0f7f4',
    borderColor: '#009688',
  },
  carBtnInactive: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
  },
  carBtnTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 2,
    color: '#222',
  },
  carBtnDesc: {
    fontSize: 12,
    color: '#b0b0b0',
  },
  summaryBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
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
    backgroundColor: '#00bfa5',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
    width: '100%',
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
