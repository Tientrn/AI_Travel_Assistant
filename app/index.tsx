import { useFonts } from 'expo-font'; // Thêm dòng này
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  const router = useRouter();

  // Load font
  const [fontsLoaded] = useFonts({
    'JimNightshade-Regular': require('./assets/fonts/JimNightshade-Regular.ttf'),
  });

  if (!fontsLoaded) {
    // Nếu dùng Expo SDK < 49, dùng AppLoading, còn không thì return null hoặc spinner
    return null;
  }

  return (
    <ImageBackground
      source={require('./assets/images/welcome.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.centeredArtTextContainer}>
          <Text style={styles.artText}>TRAVEL AI</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.welcomeText}>CHÀO MỪNG BẠN ĐẾN VỚI{"\n"}TRAVEL AI</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/ladypage1')}>
            <Text style={styles.buttonText}>BẮT ĐẦU NGAY</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 0,
  },
  centeredArtTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  artText: {
    fontSize: 48,
    color: '#fff',
    fontFamily: 'JimNightshade-Regular', // Đảm bảo font đã add vào project và đã load bằng useFonts
    textAlign: 'center',
    marginTop: 0,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 51, 51, 0.5)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#00b3b3',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desc: {
    flex: 1, // Cho phép text chiếm hết phần còn lại
    color: '#fff',
    fontSize: 15,
    opacity: 0.85,
    marginBottom: 24,
    textAlign: 'left',
    marginRight: 12, // Tạo khoảng cách với button
  },
  nextButton: {
    padding: 8,
  },
}); 