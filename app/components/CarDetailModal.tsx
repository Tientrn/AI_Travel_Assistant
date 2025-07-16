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
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={28} color="#222" />
          </TouchableOpacity>
          {/* Car image */}
          <Image
            source={{ uri: car.image }}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Car name & info */}
          <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
            <Text style={styles.carName}>{car.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 4,
              }}
            >
              <Ionicons name="star" size={16} color="#F4C95D" />
              <Text
                style={{ color: "#222", fontWeight: "bold", marginLeft: 4 }}
              >
                {car.rating || 4.9}
              </Text>
              <MaterialIcons
                name="directions-car"
                size={16}
                color="#009CA6"
                style={{ marginLeft: 12 }}
              />
              <Text style={{ color: "#222", marginLeft: 4 }}>
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
              <Text style={{ color: "#009CA6", fontWeight: "bold" }}>
                {mockLocation}
              </Text>
              <View style={{ flex: 1 }} />
              <Text style={{ color: "#009CA6", fontWeight: "bold" }}>
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
              <Text style={{ color: "#009CA6" }}>
                Thành phố Phú Quốc, tỉnh Kiên Giang, Việt Nam
              </Text>
              <View style={{ flex: 1 }} />
              <Text style={{ color: "#F4C95D", fontWeight: "bold" }}>
                30.000đ
              </Text>
            </View>
            <Text style={styles.sectionLabel}>Bảo hiểm thuê xe</Text>
            <View style={styles.insuranceBox}>
              <Ionicons
                name="shield-checkmark"
                size={20}
                color="#009CA6"
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: "#222", flex: 1 }}>
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
                  <Ionicons name={f.icon as any} size={20} color="#009CA6" />
                  <Text style={styles.amenityLabel}>{f.label}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.sectionLabel}>Vị trí xe</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons
                name="location"
                size={18}
                color="#009CA6"
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: "#222" }}>{mockLocation}</Text>
            </View>
            <View style={styles.mapBox}>
              <Ionicons
                name="map"
                size={40}
                color="#F4C95D"
                style={{ alignSelf: "center" }}
              />
              <Text style={{ color: "#b0b0b0", textAlign: "center" }}>
                [Bản đồ vị trí xe]
              </Text>
            </View>
            <Text style={styles.sectionLabel}>Chủ xe</Text>
            <View style={styles.ownerBox}>
              <View style={styles.ownerAvatar}>
                <Ionicons name="person" size={36} color="#009CA6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", color: "#222" }}>
                  {mockOwner.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 2,
                  }}
                >
                  <Ionicons name="star" size={14} color="#F4C95D" />
                  <Text
                    style={{ color: "#009CA6", fontSize: 13, marginLeft: 4 }}
                  >
                    {mockOwner.rating}
                  </Text>
                  <Text
                    style={{ color: "#b0b0b0", fontSize: 13, marginLeft: 6 }}
                  >
                    ({mockOwner.trips} chuyến)
                  </Text>
                </View>
                <Text style={{ color: "#b0b0b0", fontSize: 13 }}>
                  Tỉ lệ phản hồi {mockOwner.responseRate} • Tỉ lệ đồng ý{" "}
                  {mockOwner.acceptRate} • Phản hồi trong{" "}
                  {mockOwner.responseTime}
                </Text>
              </View>
            </View>
            <Text style={styles.sectionLabel}>Đánh giá</Text>
            {mockReviews.map((r, idx) => (
              <View key={idx} style={styles.reviewBox}>
                <Text style={{ fontWeight: "bold", color: "#009CA6" }}>
                  {r.name}
                </Text>
                <Text style={{ color: "#b0b0b0", fontSize: 13, marginLeft: 8 }}>
                  {r.date}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  <Ionicons name="star" size={14} color="#F4C95D" />
                  <Text
                    style={{ color: "#009CA6", fontSize: 13, marginLeft: 2 }}
                  >
                    {r.rating}
                  </Text>
                </View>
              </View>
            ))}
            <Text style={styles.sectionLabel}>Giấy tờ thuê xe</Text>
            <Text style={styles.descText}>
              Chọn 1 trong 2 hình thức: GPLX(đối chiếu) & CCCD (đối chiếu VNeID)
              hoặc GPLX(đối chiếu) & Passport (giữ lại)
            </Text>
            <Text style={styles.sectionLabel}>Tài sản thế chấp</Text>
            <Text style={styles.descText}>
              15 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) hoặc xe
              máy (kèm cà vẹt gốc) giá trị 15 triệu
            </Text>
            <Text style={styles.sectionLabel}>Điều khoản</Text>
            <Text style={styles.descText}>
              - Sử dụng xe đúng mục đích.\n- Không sử dụng xe vào mục đích phi
              pháp, trái luật.\n- Không hút thuốc, nhai kẹo cao su, xả rác trong
              xe.\n- Không chở hàng quốc cấm, dễ cháy nổ.
            </Text>
            <Text style={styles.sectionLabel}>Phí có thể phát sinh</Text>
            <Text style={styles.descText}>
              Phí vượt giới hạn: Không tính phí\nPhí quá giờ: 50.000đ/giờ\nPhí
              phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá 5 giờ, phụ
              thu thêm 1 ngày thuê.
            </Text>
            <Text style={styles.sectionLabel}>Chính sách huỷ chuyến</Text>
            <Text style={styles.descText}>
              An tâm thuê xe, không lo bị huỷ chuyến với chính sách huỷ chuyến
              của AI Drive.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#009CA6",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
                marginTop: 18,
                marginBottom: 0,
              }}
              onPress={() => onSelectCar && onSelectCar(car)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                Chọn xe này
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportBtn}>
              <Text style={{ color: "#F44336", fontWeight: "bold" }}>
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
    backgroundColor: "rgba(0,0,0,0.18)",
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "92%",
    paddingBottom: 16,
    paddingTop: 0,
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 2,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  carName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginTop: 8,
  },
  sectionLabel: {
    fontWeight: "bold",
    color: "#009CA6",
    marginTop: 18,
    marginBottom: 6,
    fontSize: 15,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  timeBox: {
    backgroundColor: "#E0F7FA",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginRight: 8,
  },
  timeTitle: {
    color: "#009CA6",
    fontWeight: "bold",
    fontSize: 13,
  },
  timeValue: {
    color: "#222",
    fontSize: 13,
    marginTop: 2,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
  },
  insuranceBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FBE7",
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
  },
  featuresRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    color: "#009CA6",
    fontSize: 13,
    marginRight: 8,
  },
  descText: {
    color: "#222",
    fontSize: 14,
    marginBottom: 4,
  },
  amenitiesRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  amenityBox: {
    alignItems: "center",
    marginRight: 18,
  },
  amenityLabel: {
    color: "#009CA6",
    fontSize: 12,
    marginTop: 2,
  },
  mapBox: {
    backgroundColor: "#E0F7FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  ownerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  reviewBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  reportBtn: {
    marginTop: 18,
    alignSelf: "center",
  },
});

export default CarDetailModal;
