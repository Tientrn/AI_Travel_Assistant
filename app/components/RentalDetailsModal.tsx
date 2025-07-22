import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type RentalDetailsModalProps = {
  car: any;
  onClose: () => void;
  onConfirm: () => void;
  onModify: () => void;
  visible: boolean;
  editable?: boolean;
  details?: any;
  onSave?: (newDetails: any) => void;
};

const RentalDetailsModal: React.FC<RentalDetailsModalProps> = ({
   car,
  onClose,
  onConfirm,
  onModify,
  visible,
  editable = false,
  details,
  onSave,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.bg} activeOpacity={1} onPress={onClose} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={48} color="#38a169" />
            </View>
            <Text style={styles.successTitle}>Thuê xe thành công!</Text>
            <Text style={styles.orderNumber}>Mã đơn: #RENT2025001</Text>
          </View>

          {/* Car Image */}
          <Image
            source={{ uri: "https://newcar.carlist.my/uploads/model_year_colour_images/133_large.jpg" }}
            style={styles.carImage}
            resizeMode="cover"
          />

          {/* Car Details */}
          <View style={styles.contentContainer}>
            <Text style={styles.carName}>{car.name}</Text>
            <View style={styles.carSpecs}>
              <View style={styles.specItem}>
                <Ionicons name="people" size={16} color="#4a5568" />
                <Text style={styles.specText}>{car.seats}</Text>
              </View>
              <View style={styles.specItem}>
                <Ionicons name="settings" size={16} color="#4a5568" />
                <Text style={styles.specText}>{car.transmission}</Text>
              </View>
              <View style={styles.specItem}>
                <Ionicons name="water" size={16} color="#4a5568" />
                <Text style={styles.specText}>{car.fuel}</Text>
              </View>
              <View style={styles.specItem}>
                <Ionicons name="star" size={16} color="#fbbf24" />
                <Text style={styles.specText}>{car.rating} ({car.trips})</Text>
              </View>
            </View>

            {/* Rental Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📅 Thời gian thuê xe</Text>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Nhận xe</Text>
                  <Text style={styles.detailValue}>21h00 T4, 19/06/2025</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Trả xe</Text>
                  <Text style={styles.detailValue}>22h00 T5, 20/06/2025</Text>
                </View>
              </View>
            </View>

            {/* Location Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📍 Địa điểm giao nhận</Text>
              <View style={styles.locationBox}>
                <Ionicons name="location" size={18} color="#4a5568" />
                <Text style={styles.locationText}>{car.location}</Text>
                <Text style={styles.freeText}>Miễn phí</Text>
              </View>
            </View>

            {/* Price Breakdown */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💰 Chi tiết giá</Text>
              <View style={styles.priceBreakdown}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Giá thuê cơ bản</Text>
                  <Text style={styles.priceValue}>{(car.price * 2).toLocaleString()}đ</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Phí giao xe</Text>
                  <Text style={styles.priceValue}>Miễn phí</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Phí trả xe</Text>
                  <Text style={styles.priceValue}>30,000đ</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Phí bảo hiểm</Text>
                  <Text style={styles.priceValue}>50,000đ</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Phí dịch vụ</Text>
                  <Text style={styles.priceValue}>20,000đ</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Tổng cộng</Text>
                  <Text style={styles.priceValue}>{(car.price * 2 + 100000).toLocaleString()}đ</Text>
                </View>
                <View style={styles.discountRow}>
                  <Text style={styles.discountLabel}>Giảm giá khách mới</Text>
                  <Text style={styles.discountValue}>-100,000đ</Text>
                </View>
                <View style={styles.finalPriceRow}>
                  <Text style={styles.finalPriceLabel}>Tổng thanh toán</Text>
                  <Text style={styles.finalPriceValue}>{(car.price * 2).toLocaleString()}đ</Text>
                </View>
              </View>
            </View>

            {/* Owner Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👨‍💼 Thông tin chủ xe</Text>
              <View style={styles.ownerBox}>
                <View style={styles.ownerAvatar}>
                  <Ionicons name="person" size={32} color="#4a5568" />
                </View>
                <View style={styles.ownerInfo}>
                  <Text style={styles.ownerName}>Trần Nhật Tiến</Text>
                  <View style={styles.ownerRating}>
                    <Ionicons name="star" size={14} color="#fbbf24" />
                    <Text style={styles.ownerRatingText}>4.9 (23 chuyến)</Text>
                  </View>
                  <Text style={styles.ownerPhone}>📞 090-123-4567</Text>
                </View>
              </View>
            </View>

            {/* Next Steps */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📱 Bạn sẽ nhận được</Text>
              <View style={styles.nextSteps}>
                <View style={styles.stepItem}>
                  <Ionicons name="mail" size={20} color="#38a169" />
                  <Text style={styles.stepText}>Email xác nhận</Text>
                </View>
                <View style={styles.stepItem}>
                  <Ionicons name="chatbubble" size={20} color="#38a169" />
                  <Text style={styles.stepText}>SMS thông báo</Text>
                </View>
                <View style={styles.stepItem}>
                  <Ionicons name="call" size={20} color="#38a169" />
                  <Text style={styles.stepText}>Liên hệ chủ xe</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.modifyButton} onPress={onModify}>
                <Text style={styles.modifyButtonText}>Chỉnh sửa</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                <LinearGradient
                  colors={['#38a169', '#2f855a']}
                  style={styles.confirmGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.confirmButtonText}>Xác nhận</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
    maxHeight: "95%",
    paddingBottom: 16,
    paddingTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  successIcon: {
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a5568",
  },
  carImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  carName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 8,
  },
  carSpecs: {
    flexDirection: "row",
    marginBottom: 20,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  specText: {
    fontSize: 14,
    color: "#4a5568",
    marginLeft: 4,
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flex: 1,
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  detailLabel: {
    fontSize: 12,
    color: "#718096",
    marginBottom: 4,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#2d3748",
    fontWeight: "600",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: "#2d3748",
    marginLeft: 8,
    fontWeight: "500",
  },
  freeText: {
    fontSize: 14,
    color: "#38a169",
    fontWeight: "700",
  },
  priceBreakdown: {
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: "#4a5568",
  },
  priceValue: {
    fontSize: 14,
    color: "#2d3748",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 8,
  },
  discountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  discountLabel: {
    fontSize: 14,
    color: "#38a169",
    fontWeight: "600",
  },
  discountValue: {
    fontSize: 14,
    color: "#38a169",
    fontWeight: "700",
  },
  finalPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  finalPriceLabel: {
    fontSize: 16,
    color: "#2d3748",
    fontWeight: "700",
  },
  finalPriceValue: {
    fontSize: 18,
    color: "#2d3748",
    fontWeight: "800",
  },
  ownerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 4,
  },
  ownerRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ownerRatingText: {
    fontSize: 14,
    color: "#4a5568",
    marginLeft: 4,
    fontWeight: "500",
  },
  ownerPhone: {
    fontSize: 14,
    color: "#4a5568",
    fontWeight: "500",
  },
  nextSteps: {
    backgroundColor: "#f0fff4",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#c6f6d5",
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: "#2d3748",
    marginLeft: 8,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 24,
    gap: 12,
  },
  modifyButton: {
    flex: 1,
    backgroundColor: "#f7fafc",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  modifyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a5568",
  },
  confirmButton: {
    flex: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  confirmGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default RentalDetailsModal;
