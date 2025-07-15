import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TripInfoCard = ({
  driver = {
    name: "Nguyễn Văn A",
    rating: 4.92,
    reviews: 3241,
    distance: "Cách 300m",
    car: "Toyota Camry",
    plate: "ABC 123",
    color: "Bạc",
  },
  pickup = "55 Trần Hưng Đạo, Phú Quốc, Kiên Giang",
  dropoff = "Suối Tranh Phú Quốc, Ấp suối Mây, xã Dương Tơ, thành phố Phú Quốc, tỉnh Kiên Giang",
  eta = "Đến sau 3 phút",
  arrival = "10:45 AM",
  payment = "**** 4582",
  price = "125,000 VND",
  isPremium = true,
}) => {
  return (
    <View style={styles.card}>
      {/* Driver Info */}
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color="#009CA6" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F4C95D" />
            <Text style={styles.ratingText}>{driver.rating}</Text>
            <Text style={styles.reviewText}>· {driver.reviews}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{driver.distance}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Car Info */}
      <View style={styles.carRow}>
        <View style={styles.carBadge}>
          <MaterialIcons name="directions-car" size={18} color="#009CA6" />
          <Text style={styles.carText}>{driver.car}</Text>
        </View>
        <View style={styles.plateBadge}>
          <Text style={styles.plateText}>{driver.plate}</Text>
        </View>
        <View style={styles.colorBadge}>
          <Text style={styles.colorText}>{driver.color}</Text>
        </View>
      </View>
      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.callBtnText}>Gọi điện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.msgBtn}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#009CA6" />
          <Text style={styles.msgBtnText}>Nhắn tin</Text>
        </TouchableOpacity>
      </View>
      {/* Trip Info */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Thông tin chuyến xe</Text>
        {isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Cao cấp</Text>
          </View>
        )}
      </View>
      <View style={styles.timeline}>
        {/* Pickup */}
        <View style={styles.timelineItem}>
          <Ionicons name="location" size={18} color="#009CA6" />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineLabel}>Điểm đón</Text>
            <Text style={styles.timelineValue}>{pickup}</Text>
            <Text style={styles.etaText}>{eta}</Text>
          </View>
        </View>
        {/* Dropoff */}
        <View style={styles.timelineItem}>
          <Ionicons name="flag" size={18} color="#F4C95D" />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineLabel}>Điểm đến</Text>
            <Text style={styles.timelineValue}>{dropoff}</Text>
            <Text style={styles.arrivalText}>
              <Ionicons name="time-outline" size={14} color="#009CA6" /> Est. arrival {arrival}
            </Text>
          </View>
        </View>
      </View>
      {/* Payment & Price */}
      <View style={styles.payRow}>
        <View style={styles.payCol}>
          <Text style={styles.payLabel}>Phương thức thanh toán</Text>
          <Text style={styles.payValue}>{payment}</Text>
        </View>
        <View style={styles.payCol}>
          <Text style={styles.payLabel}>Chi phí chuyến đi</Text>
          <Text style={styles.priceValue}>{price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 0,
    padding: 18,
    shadowColor: "#009CA6",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: "#E0F7FA", alignItems: "center", justifyContent: "center", marginRight: 12,
  },
  driverName: { fontWeight: "bold", color: "#222", fontSize: 16 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  ratingText: { color: "#009CA6", fontSize: 14, marginLeft: 4, fontWeight: "bold" },
  reviewText: { color: "#b0b0b0", fontSize: 13, marginLeft: 6 },
  badge: { backgroundColor: "#009CA6", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2, marginLeft: 10 },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  carRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  carBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#E0F7FA", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 },
  carText: { color: "#009CA6", fontWeight: "bold", marginLeft: 4 },
  plateBadge: { backgroundColor: "#F4C95D", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 },
  plateText: { color: "#222", fontWeight: "bold" },
  colorBadge: { backgroundColor: "#E0F7FA", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  colorText: { color: "#009CA6", fontWeight: "bold" },
  actionRow: { flexDirection: "row", marginTop: 14, marginBottom: 8 },
  callBtn: { backgroundColor: "#009CA6", borderRadius: 8, flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 18, marginRight: 10 },
  callBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 6 },
  msgBtn: { backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#009CA6", borderRadius: 8, flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 18 },
  msgBtnText: { color: "#009CA6", fontWeight: "bold", marginLeft: 6 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginTop: 18, marginBottom: 6 },
  sectionTitle: { color: "#009CA6", fontWeight: "bold", fontSize: 15, flex: 1 },
  premiumBadge: { backgroundColor: "#F4C95D", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2 },
  premiumText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  timeline: { marginTop: 8, marginBottom: 8 },
  timelineItem: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10 },
  timelineContent: { marginLeft: 10, flex: 1 },
  timelineLabel: { color: "#b0b0b0", fontSize: 13, fontWeight: "bold" },
  timelineValue: { color: "#222", fontWeight: "bold", fontSize: 14, marginTop: 2 },
  etaText: { color: "#009CA6", fontWeight: "bold", marginTop: 2 },
  arrivalText: { color: "#009CA6", fontSize: 13, marginTop: 2 },
  payRow: { flexDirection: "row", marginTop: 10, borderTopWidth: 1, borderTopColor: "#E0F7FA", paddingTop: 10 },
  payCol: { flex: 1 },
  payLabel: { color: "#b0b0b0", fontSize: 13 },
  payValue: { color: "#009CA6", fontWeight: "bold", fontSize: 15, marginTop: 2 },
  priceValue: { color: "#009CA6", fontWeight: "bold", fontSize: 17, marginTop: 2 },
});

export default TripInfoCard; 