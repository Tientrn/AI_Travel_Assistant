import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#009CA6", "#00B4D8"]}
        style={styles.gradientHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Đang di chuyển</Text>
          </View>
          <Text style={styles.etaText}>{eta}</Text>
        </View>
      </LinearGradient>

      <View style={styles.card}>
        {/* Driver Info */}
        <View style={styles.driverSection}>
          <View style={styles.driverRow}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={["#E0F7FA", "#B2EBF2"]}
                style={styles.avatar}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="person" size={28} color="#009CA6" />
              </LinearGradient>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.floor(driver.rating) ? "star" : "star-outline"}
                      size={14}
                      color="#F4C95D"
                    />
                  ))}
                </View>
                <Text style={styles.ratingText}>{driver.rating}</Text>
                <Text style={styles.reviewText}>({driver.reviews})</Text>
              </View>
            </View>
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>{driver.distance}</Text>
            </View>
          </View>

          {/* Car Info */}
          <View style={styles.carSection}>
            <View style={styles.carInfo}>
              <View style={styles.carIcon}>
                <MaterialIcons name="directions-car" size={20} color="#009CA6" />
              </View>
              <Text style={styles.carText}>{driver.car}</Text>
            </View>
            <View style={styles.plateContainer}>
              <Text style={styles.plateText}>{driver.plate}</Text>
            </View>
            <View style={styles.colorContainer}>
              <Text style={styles.colorText}>{driver.color}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.callButton}>
            <LinearGradient
              colors={["#009CA6", "#00B4D8"]}
              style={styles.callGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="call" size={18} color="#fff" />
              <Text style={styles.callButtonText}>Gọi điện</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton} onPress={() => router.push('/screens/ChatwithDriver')}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#009CA6" />
            <Text style={styles.messageButtonText}>Nhắn tin</Text>
          </TouchableOpacity>
        </View>

        {/* Trip Info */}
        <View style={styles.tripSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin chuyến xe</Text>
            {isPremium && (
              <View style={styles.premiumBadge}>
                <LinearGradient
                  colors={["#F4C95D", "#FFD700"]}
                  style={styles.premiumGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.premiumText}>Cao cấp</Text>
                </LinearGradient>
              </View>
            )}
          </View>

          <View style={styles.timeline}>
            {/* Pickup */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <Ionicons name="location" size={16} color="#009CA6" />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>Điểm đón</Text>
                <Text style={styles.timelineValue}>{pickup}</Text>
                <Text style={styles.etaText}>{eta}</Text>
              </View>
            </View>

            {/* Dropoff */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <Ionicons name="flag" size={16} color="#F4C95D" />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>Điểm đến</Text>
                <Text style={styles.timelineValue}>{dropoff}</Text>
                <Text style={styles.arrivalText}>
                  <Ionicons name="time-outline" size={14} color="#009CA6" /> Est. arrival {arrival}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment & Price */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentRow}>
            <View style={styles.paymentCol}>
              <Text style={styles.paymentLabel}>Phương thức thanh toán</Text>
              <Text style={styles.paymentValue}>{payment}</Text>
            </View>
            <View style={styles.paymentCol}>
              <Text style={styles.paymentLabel}>Chi phí chuyến đi</Text>
              <Text style={styles.priceValue}>{price}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#009CA6",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  gradientHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  etaText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
  },
  driverSection: {
    marginBottom: 20,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#009CA6",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#009CA6',
    marginRight: 4,
  },
  reviewText: {
    fontSize: 12,
    color: '#888',
  },
  distanceBadge: {
    backgroundColor: '#009CA6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  distanceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  carSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  carIcon: {
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
  },
  carText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#009CA6',
  },
  plateContainer: {
    backgroundColor: '#F4C95D',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  plateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222',
  },
  colorContainer: {
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  colorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#009CA6',
  },
  actionSection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  callButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#009CA6",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  callGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#009CA6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  messageButtonText: {
    color: '#009CA6',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14,
  },
  tripSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  premiumBadge: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  premiumGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  premiumText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeline: {
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    marginBottom: 2,
  },
  timelineValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
    lineHeight: 20,
  },
  arrivalText: {
    fontSize: 12,
    color: '#009CA6',
    fontWeight: '500',
  },
  paymentSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0F7FA',
    paddingTop: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    gap: 20,
  },
  paymentCol: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#009CA6',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009CA6',
  },
});

export default TripInfoCard; 