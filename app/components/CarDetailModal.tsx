import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const mockOwner = {
  name: "Trần Nhật Tiến",
  rating: 4.9,
  trips: 23,
  responseRate: "100%",
  acceptRate: "20%",
  responseTime: "5 phút",
};

const mockReviews = [
  { name: "Lê Hoàng Giang", date: "18/06/2025", rating: 5 },
  { name: "Lê Hoàng Giang", date: "18/06/2025", rating: 5 },
];

const mockFeatures = [
  { icon: "bluetooth", label: "Bluetooth" },
  { icon: "camera", label: "Camera lùi" },
  { icon: "car", label: "Lốp dự phòng" },
];

const mockLocation = "Huyện Phú Quốc, Kiên Giang";

const CarDetailModal = ({
  car,
  onClose,
  onSelectCar, // thêm prop này
}: {
  car: any;
  onClose: () => void;
  onSelectCar?: (car: any) => void; // thêm type
}) => {
  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.bg} activeOpacity={1} onPress={onClose} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Car image */}
          <Image
            source={{ uri: car.image }}
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Car name & info */}
          <View style={styles.contentContainer}>
            <Text style={styles.carName}>{car.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={18} color="#F4C95D" />
              <Text style={styles.ratingText}>
                {car.rating || 4.9}
              </Text>
              <MaterialIcons
                name="directions-car"
                size={18}
                color="#009CA6"
                style={{ marginLeft: 16 }}
              />
              <Text style={styles.tripsText}>
                {car.trips || 23} chuyến
              </Text>
            </View>
            
            <Text style={styles.sectionLabel}>Thời gian thuê xe</Text>
            <View style={styles.timeRow}>
              <View style={styles.timeBox}>
                <Text style={styles.timeTitle}>Nhận xe</Text>
                <Text style={styles.timeValue}>21h00 T4, 18/06/2025</Text>
              </View>
              <View style={styles.timeBox}>
                <Text style={styles.timeTitle}>Trả xe</Text>
                <Text style={styles.timeValue}>22h00 T5, 19/06/2025</Text>
              </View>
            </View>
            
            <Text style={styles.sectionLabel}>Địa điểm giao nhận xe</Text>
            <View style={styles.locationBox}>
              <Ionicons
                name="location"
                size={18}
                color="#009CA6"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.locationText}>
                {mockLocation}
              </Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.freeText}>
                Miễn phí
              </Text>
            </View>
            <View style={styles.locationBox}>
              <Ionicons
                name="location"
                size={18}
                color="#009CA6"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.locationText}>
                Phú Quốc, Kiên Giang
              </Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.feeText}>
                30.000đ
              </Text>
            </View>
            
            <Text style={styles.sectionLabel}>Bảo hiểm thuê xe</Text>
            <View style={styles.insuranceBox}>
              <Ionicons
                name="shield-checkmark"
                size={22}
                color="#009CA6"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.insuranceText}>
                Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa
                2.000.000 VND trong trường hợp có sự cố ngoài ý muốn.
              </Text>
            </View>
            
            <Text style={styles.sectionLabel}>Đặc điểm</Text>
            <View style={styles.featuresRow}>
              <Text style={styles.featureText}>
                {car.transmission || "Số tự động"}
              </Text>
              <Text style={styles.featureText}>• {car.fuel || "Xăng"}</Text>
              <Text style={styles.featureText}>• {car.seats || "4 chỗ"}</Text>
              <Text style={styles.featureText}>• 101/100KM</Text>
            </View>
            
            <Text style={styles.sectionLabel}>Mô tả</Text>
            <Text style={styles.descText}>
              Xe đời mới, sạch sẽ, máy êm – phù hợp cho cả di chuyển công tác
              lẫn du lịch. Nội thất rộng rãi, trang bị đầy đủ điều hòa, màn hình
              cảm ứng và nhiều tính năng an toàn.
            </Text>
            
            <Text style={styles.sectionLabel}>Các tiện nghi trên xe</Text>
            <View style={styles.amenitiesRow}>
              {mockFeatures.map((f, idx) => (
                <View key={idx} style={styles.amenityBox}>
                  <Ionicons name={f.icon as any} size={22} color="#009CA6" />
                  <Text style={styles.amenityLabel}>{f.label}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.sectionLabel}>Vị trí xe</Text>
            <View style={styles.locationInfoRow}>
              <Ionicons
                name="location"
                size={20}
                color="#009CA6"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.locationInfoText}>{mockLocation}</Text>
            </View>
            <View style={styles.mapBox}>
              <Ionicons
                name="map"
                size={48}
                color="#F4C95D"
                style={{ alignSelf: "center", marginBottom: 8 }}
              />
              <Text style={styles.mapText}>
                [Bản đồ vị trí xe]
              </Text>
            </View>
            
            <Text style={styles.sectionLabel}>Chủ xe</Text>
            <View style={styles.ownerBox}>
              <View style={styles.ownerAvatar}>
                <Ionicons name="person" size={40} color="#009CA6" />
              </View>
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerName}>
                  {mockOwner.name}
                </Text>
                <View style={styles.ownerRatingRow}>
                  <Ionicons name="star" size={16} color="#F4C95D" />
                  <Text style={styles.ownerRatingText}>
                    {mockOwner.rating}
                  </Text>
                  <Text style={styles.ownerTripsText}>
                    ({mockOwner.trips} chuyến)
                  </Text>
                </View>
                <Text style={styles.ownerStatsText}>
                  Tỉ lệ phản hồi {mockOwner.responseRate} • Tỉ lệ đồng ý{" "}
                  {mockOwner.acceptRate} • Phản hồi trong{" "}
                  {mockOwner.responseTime}
                </Text>
              </View>
            </View>
            
            <Text style={styles.sectionLabel}>Đánh giá</Text>
            {mockReviews.map((r, idx) => (
              <View key={idx} style={styles.reviewBox}>
                <Text style={styles.reviewName}>
                  {r.name}
                </Text>
                <Text style={styles.reviewDate}>
                  {r.date}
                </Text>
                <View style={styles.reviewRatingRow}>
                  <Ionicons name="star" size={16} color="#F4C95D" />
                  <Text style={styles.reviewRatingText}>
                    {r.rating}
                  </Text>
                </View>
              </View>
            ))}
            
            <Text style={styles.sectionLabel}>Giấy tờ thuê xe</Text>
            <View style={styles.termsContainer}>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>GPLX (đối chiếu) & CCCD (đối chiếu VNeID)</Text>
              </View>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>GPLX (đối chiếu) & Passport (giữ lại)</Text>
              </View>
            </View>
            
            <Text style={styles.sectionLabel}>Tài sản thế chấp</Text>
            <View style={styles.termsContainer}>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>15 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe)</Text>
              </View>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>Xe máy (kèm cà vẹt gốc) giá trị 15 triệu</Text>
              </View>
            </View>
            
            <Text style={styles.sectionLabel}>Phí có thể phát sinh</Text>
            <View style={styles.termsContainer}>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>Phí vượt giới hạn: Không tính phí</Text>
              </View>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>Phí quá giờ: 50.000đ/giờ</Text>
              </View>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>Phí phát sinh nếu hoàn trả xe trễ giờ</Text>
              </View>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>Trường hợp trễ quá 5 giờ, phụ thu thêm 1 ngày thuê</Text>
              </View>
            </View>
            
            <Text style={styles.sectionLabel}>Chính sách huỷ chuyến</Text>
            <Text style={styles.descText}>
              An tâm thuê xe, không lo bị huỷ chuyến với chính sách huỷ chuyến
              của AI Drive.
            </Text>
            
            <Text style={styles.sectionLabel}>Điều khoản</Text>
            <View style={styles.termsContainer}>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>Sử dụng xe đúng mục đích.</Text>
              </View>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>Không sử dụng xe vào mục đích phi pháp, trái luật.</Text>
              </View>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>Không hút thuốc, nhai kẹo cao su, xả rác trong xe.</Text>
              </View>
              <View style={styles.termItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.termText}>Không chở hàng quốc cấm, dễ cháy nổ.</Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => onSelectCar && onSelectCar(car)}
            >
              <Text style={styles.selectButtonText}>
                Chọn xe này
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.reportBtn}>
              <Text style={styles.reportText}>
                Báo cáo xe này
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: 100,
    justifyContent: "flex-end",
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
container: {
  backgroundColor: "#fff",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  maxHeight: "92%",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.15,
  shadowRadius: 20,
  elevation: 10,
},
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  carName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingText: {
    color: "#1a1a1a",
    fontWeight: "700",
    marginLeft: 6,
    fontSize: 16,
  },
  tripsText: {
    color: "#666",
    fontSize: 15,
    marginLeft: 16,
    fontWeight: "500",
  },
  sectionLabel: {
    fontWeight: "700",
    color: "#2d3748",
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
    letterSpacing: -0.3,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  timeBox: {
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 14,
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  timeTitle: {
    color: "#4a5568",
    fontWeight: "600",
    fontSize: 13,
  },
  timeValue: {
    color: "#2d3748",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  locationText: {
    color: "#2d3748",
    fontWeight: "600",
    flex: 1,
    fontSize: 13,
  },
  freeText: {
    color: "#38a169",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 13,
  },
  feeText: {
    color: "#d69e2e",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 13,
  },
  insuranceBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fff4",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#c6f6d5",
  },
  insuranceText: {
    color: "#2d3748",
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  featuresRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    color: "#4a5568",
    fontSize: 13,
    marginRight: 12,
    fontWeight: "500",
  },
  descText: {
    color: "#4a5568",
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  amenitiesRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  amenityBox: {
    alignItems: "center",
    marginRight: 20,
  },
  amenityLabel: {
    color: "#4a5568",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  locationInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  locationInfoText: {
    color: "#2d3748",
    flex: 1,
    fontWeight: "500",
  },
  mapBox: {
    backgroundColor: "#f7fafc",
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  mapText: {
    color: "#a0aec0",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
  },
  ownerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7fafc",
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  ownerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontWeight: "700",
    color: "#2d3748",
    fontSize: 16,
  },
  ownerRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  ownerRatingText: {
    color: "#4a5568",
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "600",
  },
  ownerTripsText: {
    color: "#a0aec0",
    fontSize: 13,
    marginLeft: 8,
  },
  ownerStatsText: {
    color: "#a0aec0",
    fontSize: 13,
    lineHeight: 18,
  },
  reviewBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  reviewName: {
    fontWeight: "700",
    color: "#4a5568",
    fontSize: 14,
  },
  reviewDate: {
    color: "#a0aec0",
    fontSize: 13,
    marginLeft: 10,
  },
  reviewRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  reviewRatingText: {
    color: "#4a5568",
    fontSize: 13,
    marginLeft: 3,
    fontWeight: "600",
  },
  termsContainer: {
    marginTop: 6,
    marginBottom: 10,
  },
  termItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#4a5568",
    marginRight: 8,
    marginTop: 2,
    fontWeight: "600",
  },
  termText: {
    color: "#4a5568",
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  selectButton: {
    backgroundColor: "#2d3748",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  selectButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: -0.3,
  },
  reportBtn: {
    marginTop: 16,
    alignSelf: "center",
  },
  reportText: {
    color: "#e53e3e",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default CarDetailModal;
