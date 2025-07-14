import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LadyPage1({ navigation }: any) {
  return (
    <ImageBackground
      source={require('../assets/images/ladypage1.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>
          Đặt xe, Thuê xe nhanh{"\n"}chóng với giá cực tốt
        </Text>
        <View style={styles.row}>
          <Text style={styles.desc}>
            Kết nối với các tài xế địa phương, so sánh giá cả và đặt xe. Thuê xe một cách dễ dàng cho chuyến đi của bạn
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/screens/ladypage2')}>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    padding: 24,
    paddingBottom: 48,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  desc: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    opacity: 0.85,
    textAlign: 'left',
    marginRight: 12,
  },
  nextButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
