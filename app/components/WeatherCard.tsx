import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// @ts-ignore
import Icon from "react-native-vector-icons/Feather";

type WeatherCardProps = {
  location?: string;
  temperature?: number;
  fahrenheit?: number;
  description?: string;
  humidity?: number;
  wind?: string;
  windDetail?: string;
  pressure?: string;
  visibility?: string;
  onPressDetail?: () => void;
};

const WeatherCard = ({
  location = "Thành phố Phú Quốc",
  temperature = 25,
  fahrenheit = 77,
  description = "Trời nắng nhẹ, có mây",
  humidity = 63,
  wind = "10 km/h",
  windDetail = "6 mph, SW",
  pressure = "1015 hPa",
  visibility = "10 km",
  onPressDetail,
}: WeatherCardProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4FC3F7", "#B3E5FC"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.headerTitle}>Cập nhật thời tiết</Text>
        <Text style={styles.headerRight}>Hôm nay</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.locationRow}>
          <Icon name="map-pin" size={16} color="#4FC3F7" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.tempRow}>
          <Icon name="cloud" size={40} color="#F4C95D" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.tempText}>{temperature}°C</Text>
            <Text style={styles.tempSubText}>
              {fahrenheit}°F | {description}
            </Text>
          </View>
        </View>
        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Icon name="droplet" size={20} color="#4FC3F7" />
            <Text style={styles.infoLabel}>Độ ẩm</Text>
            <Text style={styles.infoValue}>{humidity}%</Text>
          </View>
          <View style={styles.infoBox}>
            <Icon name="wind" size={20} color="#4FC3F7" />
            <Text style={styles.infoLabel}>Gió</Text>
            <Text style={styles.infoValue}>{wind}</Text>
            <Text style={styles.infoSub}>{windDetail}</Text>
          </View>
          <View style={styles.infoBox}>
            <Icon name="activity" size={20} color="#4FC3F7" />
            <Text style={styles.infoLabel}>Áp suất</Text>
            <Text style={styles.infoValue}>{pressure}</Text>
          </View>
          <View style={styles.infoBox}>
            <Icon name="eye" size={20} color="#4FC3F7" />
            <Text style={styles.infoLabel}>Tầm nhìn xa</Text>
            <Text style={styles.infoValue}>{visibility}</Text>
          </View>
        </View>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#FDFDFD",
    shadowColor: "#009CA6",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 0,
    width: '100%',
    alignSelf: 'center',
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.2,
  },
  headerRight: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.85,
  },
  content: {
    padding: 18,
    backgroundColor: "#FDFDFD",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 6,
    color: "#039BE5",
    fontWeight: "600",
    fontSize: 15,
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tempText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#039BE5",
  },
  tempSubText: {
    fontSize: 13,
    color: "#11cfc8",
    marginTop: 2,
    opacity: 0.7,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  infoBox: {
    width: "48%",
    backgroundColor: "#FDFDFD",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "flex-start",
    shadowColor: "#009CA6",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1.2,
    borderColor: '#4FC3F7',
  },
  infoLabel: {
    color: "#4FC3F7",
    fontSize: 13,
    marginTop: 4,
    fontWeight: '600',
    opacity: 0.8,
  },
  infoValue: {
    color: "#4FC3F7",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 2,
  },
  infoSub: {
    color: "#F4C95D",
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
  footerText: {
    textAlign: "center",
    color: "#F4C95D",
    fontSize: 14,
    paddingVertical: 10,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
});

export default WeatherCard;
