import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import BookingForm from "../components/bookingform";
import CarDetailModal from "../components/CarDetailModal";
import CarRentList from "../components/CarRentList";
import DetailBooking from "../components/Detailbooking";
import RentalDetailsModal from "../components/RentalDetailsModal";
import TripInfoCard from "../components/TripInfoCard";

const AI_AVATAR = require("../assets/images/welcome.jpg"); // Sử dụng ảnh AI hoặc icon

const QUICK_SUGGESTIONS = [
  { label: "Đặt xe đến sân bay", intent: "book_car" },
  { label: "Thuê xe tự lái", intent: "rent_car" },
  { label: "Xem thời tiết", intent: "weather" },
  { label: "Gợi ý địa điểm ăn uống", intent: "suggest_food" },
];

function fakeSpeechToText(): Promise<string> {
  // Giả lập chuyển giọng nói thành text
  return new Promise((resolve) => {
    setTimeout(() => resolve("Tôi muốn thuê xe 7 chỗ ngày mai"), 1500);
  });
}

function detectIntent(text: string): { intent: string } {
  // Giả lập phân tích ý định từ text
  const t = text.toLowerCase();
  if (t.includes("đặt xe")) return { intent: "book_car" };
  if (t.includes("thuê xe")) return { intent: "rent_car" };
  if (t.includes("thời tiết")) return { intent: "weather" };
  if (t.includes("ăn uống") || t.includes("nhà hàng")) return { intent: "suggest_food" };
  if (t.includes("khách sạn") || t.includes("đặt phòng")) return { intent: "book_hotel" };
  if (t.includes("lịch trình") || t.includes("itinerary")) return { intent: "suggest_itinerary" };
  if (t.includes("gần đó") || t.includes("nearby")) return { intent: "suggest_nearby_food" };
  if (t.includes("điểm đến") || t.includes("destination")) return { intent: "weather_destination" };
  if (t.includes("theo dõi") || t.includes("track") || t.includes("chuyến đi")) return { intent: "track_trip" };
  if (t.includes("bản đồ") || t.includes("map")) return { intent: "view_map" };
  if (t.includes("chat") || t.includes("nhắn tin")) return { intent: "chat_driver" };
  if (t.includes("ảnh") || t.includes("photo")) return { intent: "view_driver_photo" };
  if (t.includes("đánh giá") || t.includes("rate")) return { intent: "rate_driver" };
  if (t.includes("thông báo") || t.includes("notification")) return { intent: "enable_notifications" };
  if (t.includes("kết thúc") || t.includes("hoàn thành") || t.includes("finish")) return { intent: "finish_trip" };
  if (t.includes("thanh toán") || t.includes("payment")) return { intent: "payment" };
  if (t.includes("chia sẻ") || t.includes("share")) return { intent: "share_trip" };
  if (t.includes("lịch sử") || t.includes("history")) return { intent: "trip_history" };
  
  // Intent mới cho flow thuê xe
  if (t.includes("xác nhận") && t.includes("thuê")) return { intent: "confirm_rent" };
  if (t.includes("chọn") && t.includes("ngày")) return { intent: "select_rental_date" };
  if (t.includes("chọn") && t.includes("địa điểm")) return { intent: "select_location" };
  if (t.includes("xác nhận") && t.includes("thời gian")) return { intent: "confirm_time" };
  if (t.includes("xác nhận") && t.includes("địa điểm")) return { intent: "confirm_location" };
  if (t.includes("chi tiết") && t.includes("giá")) return { intent: "view_price_details" };
  if (t.includes("đơn hàng") || t.includes("order")) return { intent: "view_order" };
  if (t.includes("thuê") && t.includes("khác")) return { intent: "rent_another_car" };
  if (t.includes("hỗ trợ") || t.includes("support")) return { intent: "contact_support" };
  if (t.includes("hoàn tất") || t.includes("hoàn thành")) return { intent: "confirm_rent" };
  
  return { intent: "chat" };
}

export default function HomeScreen() {
  const [input, setInput] = useState("");
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text:
        "Xin chào! Mình là trợ lý AI du lịch của bạn. Bạn muốn đặt xe, thuê xe, hỏi thời tiết hay cần gợi ý gì cho chuyến đi? Hãy nhập hoặc nói điều bạn muốn nhé!",
    },
  ]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showCarList, setShowCarList] = useState(false);
  const [selectedCarDetail, setSelectedCarDetail] = useState<any>(null);
  const [pendingCar, setPendingCar] = useState(null);
  const [showDetailBooking, setShowDetailBooking] = useState(false);
  const [bookingData, setBookingData] = useState<any | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showTripInfo, setShowTripInfo] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [quickSuggestions, setQuickSuggestions] = useState(QUICK_SUGGESTIONS);
  const [showRentalDetails, setShowRentalDetails] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages, showCarList, showBooking, showDetailBooking, showTripInfo]);

  // Xử lý gửi tin nhắn (text hoặc voice)
  const handleSend = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText) return;
    setMessages((prev: any[]) => [...prev, { type: "user", text: userText }]);
    setInput("");
    setIsAITyping(true);
    setTimeout(() => handleAIResponse(userText), 1200);
  };

  // Xử lý voice input (giả lập)
  const handleVoiceInput = async () => {
    setIsRecording(true);
    // Thêm message "Đang lắng nghe..." ngay khi bấm microphone
    setMessages((prev: any[]) => [
      ...prev,
      { type: "ai", text: "Đang lắng nghe...", isListening: true }
    ]);
    
    const text = await fakeSpeechToText();
    setIsRecording(false);
    // Xóa message "Đang lắng nghe..." và thêm kết quả
    setMessages((prev: any[]) => prev.filter(msg => !msg.isListening));
    setInput(text as string);
    // Tự động gửi luôn hoặc để user xác nhận, ở đây tự động gửi luôn
    handleSend(text as string);
  };

  // Xử lý AI phản hồi dựa trên intent
  const handleAIResponse = (userText: string) => {
    const { intent } = detectIntent(userText);
    setIsAITyping(false);
    if (intent === "book_car") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "Bạn muốn đặt xe đi đâu? Vui lòng nhập thông tin hoặc xác nhận bên dưới." },
      ]);
      setShowBooking(true);
      setShowCarList(false);
      setShowDetailBooking(false);
      setShowTripInfo(false);
      setQuickSuggestions([]);
    } else if (intent === "rent_car") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "Dưới đây là các xe tự lái phù hợp với bạn. Hãy chọn xe bạn muốn thuê!" },
      ]);
      setShowCarList(true);
      setShowBooking(false);
      setShowDetailBooking(false);
      setShowTripInfo(false);
      setQuickSuggestions([]);
    } else if (intent === "weather" || intent === "weather_destination") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "🌤️ Thời tiết hôm nay ở Phú Quốc: Nắng đẹp, nhiệt độ 29°C, độ ẩm 75%. Thời tiết hoàn hảo cho chuyến đi của bạn!" },
      ]);
      setShowTripInfo(false);
      setQuickSuggestions([
        { label: "Đặt xe đi chơi", intent: "book_car" },
        { label: "Gợi ý địa điểm", intent: "suggest_places" },
        { label: "Xem thời tiết tuần tới", intent: "weather_forecast" },
      ]);
    } else if (intent === "suggest_food" || intent === "suggest_nearby_food") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "🍽️ Gợi ý nhà hàng nổi bật gần bạn:\n• Nhà hàng Hải Sản Ớt Ngọt (500m)\n• Quán Ra Khơi (800m)\n• Xin Chào Restaurant (1.2km)\n• Phở Hải Sản Biển Đông (300m)" },
      ]);
      setShowTripInfo(false);
      setQuickSuggestions([
        { label: "Đặt xe đến Ớt Ngọt", intent: "book_car" },
        { label: "Đặt xe đến Ra Khơi", intent: "book_car" },
        { label: "Xem menu", intent: "view_menu" },
        { label: "Đặt bàn trước", intent: "book_table" },
      ]);
    } else if (intent === "book_hotel") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "🏨 Mình có thể giúp bạn đặt khách sạn! Bạn muốn ở khu vực nào và ngân sách bao nhiêu? Mình sẽ gợi ý những khách sạn phù hợp nhất." },
      ]);
      setShowTripInfo(false);
      setQuickSuggestions([
        { label: "Khách sạn 3-4 sao", intent: "hotel_3_4_star" },
        { label: "Khách sạn 5 sao", intent: "hotel_5_star" },
        { label: "Resort biển", intent: "beach_resort" },
        { label: "Homestay", intent: "homestay" },
      ]);
    } else if (intent === "suggest_itinerary") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "🗺️ Lịch trình gợi ý cho chuyến đi Phú Quốc:\n\n📅 Ngày 1: Bãi Sao → VinWonders → Sunset Sanato\n📅 Ngày 2: Cáp treo Hòn Thơm → Grand World → Chợ đêm\n📅 Ngày 3: Safari → Suối Tranh → Nhà hàng địa phương" },
      ]);
      setShowTripInfo(false);
      setQuickSuggestions([
        { label: "Đặt xe theo lịch trình", intent: "book_car_itinerary" },
        { label: "Xem chi tiết từng ngày", intent: "view_day_details" },
        { label: "Tùy chỉnh lịch trình", intent: "customize_itinerary" },
        { label: "Đặt tour hướng dẫn", intent: "book_tour" },
      ]);
    } else if (intent === "track_trip") {
      setShowTripInfo(true);
      setShowBooking(false);
      setShowCarList(false);
      setShowDetailBooking(false);
      setQuickSuggestions([
        { label: "🗺️ Xem bản đồ real-time", intent: "view_map" },
        { label: "📞 Gọi tài xế", intent: "call_driver" },
        { label: "💬 Chat với tài xế", intent: "chat_driver" },
        { label: "📸 Xem ảnh tài xế", intent: "view_driver_photo" },
        { label: "⭐ Đánh giá tài xế", intent: "rate_driver" },
        { label: "🔔 Bật thông báo", intent: "enable_notifications" },
      ]);
    } else if (intent === "view_map") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "🗺️ **BẢN ĐỒ THEO DÕI**\n\n📍 **Vị trí xe**: Đang di chuyển trên đường Nguyễn Huệ\n🎯 **Điểm đón**: 123 Đường ABC, Quận 1\n⏱️ **Thời gian còn lại**: 12 phút\n🚦 **Tốc độ hiện tại**: 25 km/h\n\n💡 **Gợi ý**: Xe đang di chuyển bình thường, không có tắc đường!" },
      ]);
      setQuickSuggestions([
        { label: "📍 Chia sẻ vị trí", intent: "share_location" },
        { label: "🚨 Báo cáo vấn đề", intent: "report_issue" },
        { label: "🔄 Làm mới", intent: "refresh_map" },
        { label: "📱 Chế độ toàn màn hình", intent: "fullscreen_map" },
      ]);
    } else if (intent === "chat_driver") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "💬 **CHAT VỚI TÀI XẾ**\n\n👨‍💼 **Tài xế**: Anh Nguyễn Văn A\n📱 **Trạng thái**: Online\n⏰ **Phản hồi trung bình**: 30 giây\n\n💬 **Tin nhắn gần đây**:\n• Tài xế: \"Tôi sẽ đến trong 10 phút nữa\"\n• Bạn: \"OK, tôi sẽ đợi ở cổng chính\"\n\nNhập tin nhắn bên dưới để chat với tài xế!" },
      ]);
      setQuickSuggestions([
        { label: "📍 Gửi vị trí", intent: "send_location" },
        { label: "⏰ Hỏi thời gian", intent: "ask_time" },
        { label: "🚪 Hướng dẫn điểm đón", intent: "pickup_guide" },
        { label: "📞 Chuyển sang gọi", intent: "switch_to_call" },
      ]);
    } else if (intent === "view_driver_photo") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "👨‍💼 **HỒ SƠ TÀI XẾ**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📸 **Thông tin cá nhân**\n• Tên: Nguyễn Văn A\n• SĐT: 090-123-4567\n• Biển số: 51A-12345\n• Tham gia: 3 năm\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n⭐ **Đánh giá & Thống kê**\n• Điểm đánh giá: 4.8/5 ⭐⭐⭐⭐⭐\n• Số đánh giá: 1,234 lượt\n• Tổng chuyến đi: 2,456 chuyến\n• Tỷ lệ hoàn thành: 99.8%\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n✅ **Xác minh & Bảo hiểm**\n• CMND: Đã xác minh ✅\n• Bằng lái: Đã xác minh ✅\n• Bảo hiểm: Đầy đủ ✅\n• Kiểm tra sức khỏe: Đạt ✅\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 **Nhận xét từ khách hàng**\n\"Tài xế rất thân thiện, lái xe an toàn và đúng giờ!\"\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
      ]);
      setQuickSuggestions([
        { label: "⭐ Đánh giá ngay", intent: "rate_now" },
        { label: "📞 Gọi tài xế", intent: "call_driver" },
        { label: "💬 Chat với tài xế", intent: "chat_driver" },
        { label: "📋 Xem lịch sử", intent: "view_history" },
      ]);
    } else if (intent === "rate_driver") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "⭐ **ĐÁNH GIÁ CHUYẾN ĐI**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n👨‍💼 **Tài xế**: Anh Nguyễn Văn A\n🚗 **Chuyến đi**: Sân bay Tân Sơn Nhất → Khách sạn ABC\n⏰ **Thời gian**: 45 phút\n💰 **Chi phí**: 250,000 VNĐ\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📊 **Hãy đánh giá các tiêu chí sau**:\n\n🌟 **Chất lượng dịch vụ**\n🚗 **Lái xe an toàn**\n⏰ **Đúng giờ**\n😊 **Thái độ phục vụ**\n🧹 **Sạch sẽ xe**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💬 **Nhận xét thêm** (tùy chọn)\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
      ]);
      setQuickSuggestions([
        { label: "⭐⭐⭐⭐⭐ Tuyệt vời", intent: "rate_5_star" },
        { label: "⭐⭐⭐⭐ Tốt", intent: "rate_4_star" },
        { label: "⭐⭐⭐ Bình thường", intent: "rate_3_star" },
        { label: "⭐⭐ Kém", intent: "rate_2_star" },
        { label: "⭐ Rất kém", intent: "rate_1_star" },
      ]);
    } else if (intent === "enable_notifications") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "🔔 **THÔNG BÁO CHUYẾN ĐI**\n\n✅ **Đã bật thông báo cho**:\n• Tài xế đến điểm đón (5 phút trước)\n• Xe đã đến\n• Bắt đầu chuyến đi\n• Kết thúc chuyến đi\n• Thanh toán hoàn tất\n\n🔕 **Có thể tắt**:\n• Thông báo quảng cáo\n• Gợi ý dịch vụ\n\n💡 **Gợi ý**: Bạn sẽ nhận thông báo khi tài xế sắp đến!" },
      ]);
      setQuickSuggestions([
        { label: "🔔 Tùy chỉnh thông báo", intent: "customize_notifications" },
        { label: "🔕 Tắt thông báo", intent: "disable_notifications" },
        { label: "📱 Cài đặt âm thanh", intent: "sound_settings" },
        { label: "⏰ Đặt lịch nhắc", intent: "set_reminder" },
      ]);
    } else if (intent === "finish_trip") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "🎉 **CHUYẾN ĐI HOÀN THÀNH!**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n✅ **THÔNG TIN CHUYẾN ĐI**\n\n🚗 **Xe**: Toyota Vios (51A-12345)\n👨‍💼 **Tài xế**: Anh Nguyễn Văn A ⭐⭐⭐⭐⭐\n📍 **Từ**: Sân bay Tân Sơn Nhất\n🎯 **Đến**: Khách sạn ABC\n⏰ **Thời gian**: 45 phút\n💰 **Chi phí**: 250,000 VNĐ\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📋 **TRẠNG THÁI**\n\n💳 **Thanh toán**: Chưa hoàn tất\n⭐ **Đánh giá**: Chưa đánh giá\n🎯 **Điểm tích lũy**: +25 điểm\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 **Bạn có muốn thanh toán và đánh giá ngay không?**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
      ]);
      setQuickSuggestions([
        { label: "💳 Thanh toán ngay", intent: "payment" },
        { label: "⭐ Đánh giá tài xế", intent: "rate_driver" },
        { label: "📱 Chia sẻ chuyến đi", intent: "share_trip" },
        { label: "📋 Xem chi tiết", intent: "trip_details" },
        { label: "🚗 Đặt xe tiếp", intent: "book_next_trip" },
      ]);
    } else if (intent === "payment") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "�� **THANH TOÁN CHUYẾN ĐI**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💰 **CHI TIẾT HÓA ĐƠN**\n\n📊 **Tổng tiền**: 250,000 VNĐ\n• Cước phí: 200,000 VNĐ\n• Phí cầu đường: 30,000 VNĐ\n• Phí dịch vụ: 20,000 VNĐ\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💳 **PHƯƠNG THỨC THANH TOÁN**\n\n📱 **Ví điện tử**\n• MoMo\n• ZaloPay\n• ViettelPay\n\n💳 **Thẻ ngân hàng**\n• Thẻ tín dụng\n• Thẻ ghi nợ\n• Thẻ ATM nội địa\n\n💵 **Khác**\n• Tiền mặt\n• Chuyển khoản\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🎁 **ƯU ĐÃI**\n• Giảm 10% cho lần thanh toán đầu tiên!\n• Tích lũy điểm thưởng\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
      ]);
      setQuickSuggestions([
        { label: "💳 Thanh toán bằng MoMo", intent: "pay_momo" },
        { label: "💳 Thanh toán bằng thẻ", intent: "pay_card" },
        { label: "💵 Thanh toán tiền mặt", intent: "pay_cash" },
        { label: "🏦 Chuyển khoản", intent: "pay_transfer" },
        { label: "🎁 Áp dụng mã giảm giá", intent: "apply_coupon" },
      ]);
    } else if (intent === "share_trip") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "📱 **CHIA SẺ CHUYẾN ĐI**\n\n🎉 **Chuyến đi tuyệt vời của bạn**:\n🚗 Xe: Toyota Vios\n👨‍💼 Tài xế: Anh Nguyễn Văn A ⭐⭐⭐⭐⭐\n📍 Từ: Sân bay Tân Sơn Nhất\n🎯 Đến: Khách sạn ABC\n⏰ Thời gian: 45 phút\n💰 Chi phí: 250,000 VNĐ\n\n💬 **Nhận xét**: \"Tài xế rất thân thiện và lái xe an toàn!\"\n\nChia sẻ với bạn bè để nhận ưu đãi cho chuyến đi tiếp theo!" },
      ]);
      setQuickSuggestions([
        { label: "📱 Chia sẻ Facebook", intent: "share_facebook" },
        { label: "📱 Chia sẻ Instagram", intent: "share_instagram" },
        { label: "📱 Chia sẻ Zalo", intent: "share_zalo" },
        { label: "📱 Sao chép link", intent: "copy_link" },
        { label: "📱 Chia sẻ WhatsApp", intent: "share_whatsapp" },
      ]);
    } else if (intent === "trip_history") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "📋 **LỊCH SỬ CHUYẾN ĐI**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🗓️ **HÔM NAY**\n\n⏰ **14:30** - Sân bay → Khách sạn\n💰 **250,000 VNĐ** ⭐⭐⭐⭐⭐\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🗓️ **TUẦN NÀY**\n\n📅 **12/01** - Khách sạn → Trung tâm\n💰 **150,000 VNĐ** ⭐⭐⭐⭐\n\n📅 **10/01** - Sân bay → Khách sạn\n💰 **250,000 VNĐ** ⭐⭐⭐⭐⭐\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📊 **THỐNG KÊ THÁNG**\n\n🚗 **Tổng chuyến đi**: 8 chuyến\n💰 **Tổng chi tiêu**: 1,850,000 VNĐ\n🎯 **Điểm tích lũy**: 185 điểm\n📈 **Trung bình**: 231,250 VNĐ/chuyến\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 **Bạn có muốn xem chi tiết chuyến đi nào không?**\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
      ]);
      setQuickSuggestions([
        { label: "📊 Xem báo cáo chi tiết", intent: "view_report" },
        { label: "🎁 Đổi điểm thưởng", intent: "redeem_points" },
        { label: "📱 Xuất hóa đơn", intent: "export_invoice" },
        { label: "🔄 Đặt lại chuyến đi", intent: "repeat_trip" },
        { label: "📞 Liên hệ hỗ trợ", intent: "contact_support" },
      ]);
    } else if (intent === "pay_momo" || intent === "pay_card" || intent === "pay_cash" || intent === "pay_transfer") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "✅ **THANH TOÁN THÀNH CÔNG!**\n\n�� **Phương thức**: " + (intent === "pay_momo" ? "MoMo" : intent === "pay_card" ? "Thẻ tín dụng" : intent === "pay_cash" ? "Tiền mặt" : "Chuyển khoản") + "\n💰 **Số tiền**: 225,000 VNĐ (đã giảm 10%)\n🎁 **Tiết kiệm**: 25,000 VNĐ\n📧 **Hóa đơn**: Đã gửi qua email\n\n🎯 **Điểm tích lũy**: +23 điểm\n\nBây giờ bạn có muốn đánh giá tài xế không?" },
      ]);
      setQuickSuggestions([
        { label: "⭐ Đánh giá ngay", intent: "rate_driver" },
        { label: "📱 Chia sẻ chuyến đi", intent: "share_trip" },
        { label: "🚗 Đặt xe tiếp", intent: "book_next_trip" },
        { label: "📋 Xem lịch sử", intent: "trip_history" },
        { label: "🎁 Đổi điểm thưởng", intent: "redeem_points" },
      ]);
    } else if (intent === "rate_5_star" || intent === "rate_4_star" || intent === "rate_3_star" || intent === "rate_2_star" || intent === "rate_1_star") {
      const stars = intent === "rate_5_star" ? 5 : intent === "rate_4_star" ? 4 : intent === "rate_3_star" ? 3 : intent === "rate_2_star" ? 2 : 1;
      const feedback = stars >= 4 ? "Cảm ơn bạn đã đánh giá tích cực!" : "Cảm ơn phản hồi của bạn, chúng tôi sẽ cải thiện!";
      
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "⭐ **ĐÁNH GIÁ THÀNH CÔNG!**\n\n👨‍💼 **Tài xế**: Anh Nguyễn Văn A\n⭐ **Đánh giá**: " + "⭐".repeat(stars) + "\n🎯 **Điểm thưởng**: +" + (stars * 5) + " điểm\n\n💬 **Phản hồi**: " + feedback + "\n\n🎁 **Ưu đãi**: Nhận 20% giảm giá cho chuyến đi tiếp theo!\n\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi! 🚗✨" },
      ]);
      setQuickSuggestions([
        { label: "🚗 Đặt xe tiếp", intent: "book_next_trip" },
        { label: "📱 Chia sẻ trải nghiệm", intent: "share_trip" },
        { label: "🎁 Sử dụng ưu đãi", intent: "use_discount" },
        { label: "📋 Xem lịch sử", intent: "trip_history" },
        { label: "⭐ Đánh giá ứng dụng", intent: "rate_app" },
      ]);
    } else if (intent === "confirm_rent") {
      handleConfirmRent();
    } else if (intent === "select_rental_date") {
      handleSelectRentalDate();
    } else if (intent === "select_location") {
      handleSelectLocation();
    } else if (intent === "confirm_time") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "✅ **Đã xác nhận thời gian thuê xe!**\n\n📅 **Thời gian đã chọn**:\n• Nhận xe: 21h00 ngày 19/06/2025\n• Trả xe: 22h00 ngày 20/06/2025\n• Tổng thời gian: 2 ngày\n\n💰 **Tổng tiền**: 1,900,000đ\n\nBạn có muốn tiếp tục chọn địa điểm không?" },
      ]);
      setQuickSuggestions([
        { label: "📍 Chọn địa điểm", intent: "select_location" },
        { label: "✅ Hoàn tất thuê xe", intent: "confirm_rent" },
        { label: "💰 Xem chi tiết giá", intent: "view_price_details" },
      ]);
    } else if (intent === "confirm_location") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "✅ **Đã xác nhận địa điểm!**\n\n📍 **Địa điểm đã chọn**:\n• Giao xe: Phú Quốc, Kiên Giang\n• Trả xe: Phú Quốc, Kiên Giang\n• Phí giao xe: Miễn phí\n• Phí trả xe: 30,000đ\n\nBạn có muốn hoàn tất việc thuê xe không?" },
      ]);
      setQuickSuggestions([
        { label: "✅ Hoàn tất thuê xe", intent: "confirm_rent" },
        { label: "📅 Xem lại thời gian", intent: "select_rental_date" },
        { label: "💰 Xem chi tiết giá", intent: "view_price_details" },
      ]);
    } else if (intent === "view_price_details") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "💰 **CHI TIẾT GIÁ THUÊ XE**\n\n📊 **Phân tích giá**:\n• Giá thuê cơ bản: 950,000đ/ngày\n• Số ngày thuê: 2 ngày\n• Tổng cơ bản: 1,900,000đ\n\n💸 **Phí phát sinh**:\n• Phí giao xe: Miễn phí\n• Phí trả xe: 30,000đ\n• Phí bảo hiểm: 50,000đ\n• Phí dịch vụ: 20,000đ\n\n💳 **Tổng thanh toán**: 2,000,000đ\n\n🎁 **Ưu đãi**:\n• Giảm 5% cho khách mới: -100,000đ\n• **Tổng cuối**: 1,900,000đ" },
      ]);
      setQuickSuggestions([
        { label: "✅ Xác nhận giá", intent: "confirm_rent" },
        { label: "📅 Thay đổi thời gian", intent: "select_rental_date" },
        { label: "📍 Thay đổi địa điểm", intent: "select_location" },
      ]);
    } else if (intent === "view_order") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "📋 **CHI TIẾT ĐƠN HÀNG #RENT2025001**\n\n🚗 **Thông tin xe**:\n• Toyota Camry 2022\n• 4 chỗ • Số tự động • Xăng\n• ⭐ 4.8 (23 chuyến)\n\n📅 **Thời gian**:\n• Nhận xe: 21h00 T4, 19/06/2025\n• Trả xe: 22h00 T5, 20/06/2025\n\n📍 **Địa điểm**:\n• Giao xe: Phú Quốc, Kiên Giang\n• Trả xe: Phú Quốc, Kiên Giang\n\n💰 **Thanh toán**: 1,900,000đ\n📱 **Trạng thái**: Đã xác nhận\n\nBạn cần hỗ trợ gì thêm không?" },
      ]);
      setQuickSuggestions([
        { label: "📞 Liên hệ hỗ trợ", intent: "contact_support" },
        { label: "🗺️ Xem bản đồ", intent: "view_map" },
        { label: "🚗 Thuê xe khác", intent: "rent_another_car" },
      ]);
    } else if (intent === "rent_another_car") {
      setShowCarList(true);
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "🚗 **DANH SÁCH XE TỰ LÁI**\n\nDưới đây là các xe phù hợp khác. Hãy chọn xe bạn muốn thuê!" },
      ]);
      setQuickSuggestions([]);
    } else if (intent === "contact_support") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "📞 **LIÊN HỆ HỖ TRỢ**\n\n🆘 **Hotline**: 1900-1234\n📧 **Email**: support@aitravel.com\n💬 **Chat**: 24/7\n⏰ **Giờ làm việc**: 8h-22h\n\n📱 **Thông tin đơn hàng**:\n• Mã đơn: #RENT2025001\n• Trạng thái: Đã xác nhận\n\nBạn cần hỗ trợ về vấn đề gì?" },
      ]);
      setQuickSuggestions([
        { label: "❓ Hỏi về đơn hàng", intent: "ask_about_order" },
        { label: "🔄 Hủy đơn hàng", intent: "cancel_order" },
        { label: "📝 Thay đổi thông tin", intent: "modify_order" },
        { label: "💰 Hoàn tiền", intent: "refund_request" },
      ]);
    } else {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "Mình chưa rõ ý bạn, bạn muốn đặt xe, thuê xe hay hỏi gì về chuyến đi?" },
      ]);
      setQuickSuggestions(QUICK_SUGGESTIONS);
    }
  };

  // Xử lý chọn quick suggestion
  const handleSuggestion = (suggestion: { label: string; intent: string }) => {
    handleSend(suggestion.label);
  };

  // Xử lý xác nhận booking
  const handleBookingConfirm = (data: any) => {
    setShowBooking(false);
    setBookingData(data);
    setShowDetailBooking(true);
    setMessages((prev: any[]) => [
      ...prev,
      { type: "ai", text: "Dưới đây là thông tin chi tiết đặt xe của bạn, vui lòng xác nhận lại." },
    ]);
    setQuickSuggestions([]);
  };

  // Xử lý xác nhận detail booking
  const handleDetailBookingConfirm = () => {
    setShowDetailBooking(false);
    setMessages((prev: any[]) => [
      ...prev,
      { type: "ai", text: "🎉 Đặt xe thành công! Chúc bạn có chuyến đi vui vẻ!" },
    ]);
    
    // Hiển thị các gợi ý tiếp theo sau khi đặt xe
    setTimeout(() => {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "Bạn có muốn mình gợi ý thêm gì cho chuyến đi không? 😊" },
      ]);
      setQuickSuggestions([
        { label: "📱 Theo dõi chuyến đi", intent: "track_trip" },
        { label: "🌤️ Xem thời tiết điểm đến", intent: "weather_destination" },
        { label: "🍽️ Gợi ý nhà hàng gần đó", intent: "suggest_nearby_food" },
        { label: "🏨 Đặt khách sạn", intent: "book_hotel" },
        { label: "🗺️ Xem lịch trình gợi ý", intent: "suggest_itinerary" },
      ]);
    }, 1000);
  };

  // Xử lý chọn xe tự lái
  const handleRentCar = (car: any) => {
    setSelectedCarDetail(car);
  };

  // Xử lý chọn xe trong modal chi tiết
  const handleSelectCar = (car: any) => {
    setSelectedCarDetail(null);
    setShowCarList(false);
    setSelectedCar(car); // Lưu thông tin xe đã chọn
    
    // Hiển thị RentalDetailsModal thay vì gửi tin nhắn
    setShowRentalDetails(true);
  };

  // Xử lý xác nhận thuê xe
  const handleConfirmRent = () => {
    setShowRentalDetails(true);
  };

  // Xử lý hoàn tất thuê xe từ modal
  const handleRentalComplete = () => {
    setShowRentalDetails(false);
    setMessages((prev: any[]) => [
      ...prev,
      { type: "ai", text: `🎉 **THUÊ XE THÀNH CÔNG!**\n\n✅ **Thông tin đơn hàng**:\n• Mã đơn: #RENT2025001\n• Xe: ${selectedCar.name}\n• Trạng thái: Đã xác nhận\n• Thời gian: 21h00 T4, 19/06/2025\n• Địa điểm: ${selectedCar.location}\n\n💰 **Tổng tiền**: ${(selectedCar.price * 2).toLocaleString()}đ\n\n📱 **Bạn sẽ nhận được**:\n• Email xác nhận\n• SMS thông báo\n• Liên hệ chủ xe\n\nBạn có muốn mình hỗ trợ thêm gì không?` },
    ]);
    
    setQuickSuggestions([
      { label: "🗺️ Xem bản đồ", intent: "view_map" },
      { label: "📞 Liên hệ hỗ trợ", intent: "contact_support" },
      { label: "📋 Xem đơn hàng", intent: "view_order" },
      { label: "🚗 Thuê xe khác", intent: "rent_another_car" },
    ]);
  };

  // Xử lý chỉnh sửa thuê xe từ modal
  const handleRentalModify = () => {
    setShowRentalDetails(false);
    setMessages((prev: any[]) => [
      ...prev,
      { type: "ai", text: "📝 **CHỈNH SỬA THÔNG TIN THUÊ XE**\n\nBạn muốn chỉnh sửa thông tin gì?\n\n• 📅 Thời gian thuê xe\n• 📍 Địa điểm giao nhận\n• 🚗 Chọn xe khác\n• 💰 Thay đổi gói dịch vụ" },
    ]);
    
    setQuickSuggestions([
      { label: "📅 Thay đổi thời gian", intent: "select_rental_date" },
      { label: "📍 Thay đổi địa điểm", intent: "select_location" },
      { label: "🚗 Chọn xe khác", intent: "rent_car" },
      { label: "💰 Xem chi tiết giá", intent: "view_price_details" },
    ]);
  };

  // Xử lý chọn ngày thuê
  const handleSelectRentalDate = () => {
    setMessages((prev: any[]) => [
      ...prev,
      { type: "ai", text: "📅 **CHỌN NGÀY THUÊ XE**\n\n📅 **Ngày hiện tại**: 18/06/2025\n📅 **Ngày thuê**: 19/06/2025\n📅 **Ngày trả**: 20/06/2025\n\n⏰ **Thời gian**:\n• Nhận xe: 21h00 ngày 19/06\n• Trả xe: 22h00 ngày 20/06\n\n💰 **Tổng tiền**: 1,900,000đ (2 ngày)\n\nBạn có muốn điều chỉnh thời gian không?" },
    ]);
    
    setQuickSuggestions([
      { label: "✅ Xác nhận thời gian", intent: "confirm_time" },
      { label: "📅 Thay đổi ngày", intent: "change_date" },
      { label: "⏰ Thay đổi giờ", intent: "change_time" },
      { label: "💰 Xem chi tiết giá", intent: "view_price_details" },
    ]);
  };

  // Xử lý chọn địa điểm
  const handleSelectLocation = () => {
    setMessages((prev: any[]) => [
      ...prev,
      { type: "ai", text: "📍 **CHỌN ĐỊA ĐIỂM GIAO NHẬN XE**\n\n🎯 **Địa điểm giao xe**:\n• Phú Quốc, Kiên Giang\n• Miễn phí giao xe\n\n🎯 **Địa điểm trả xe**:\n• Phú Quốc, Kiên Giang\n• Phí: 30,000đ\n\n🗺️ **Khoảng cách**: 2km\n⏰ **Thời gian giao**: 15 phút\n\nBạn có muốn thay đổi địa điểm không?" },
    ]);
    
    setQuickSuggestions([
      { label: "✅ Xác nhận địa điểm", intent: "confirm_location" },
      { label: "📍 Thay đổi điểm giao", intent: "change_pickup" },
      { label: "📍 Thay đổi điểm trả", intent: "change_dropoff" },
      { label: "🗺️ Xem bản đồ", intent: "view_map" },
    ]);
  };

  // Render từng message
  const renderMessage = (msg: any, idx: number) => {
    if (msg.type === "ai") {
      return (
        <View key={idx} style={styles.aiMsgRow}>
          <View style={styles.avatarWrap}>
            <Ionicons name="sparkles" size={28} color="#F4C95D" />
          </View>
          <View style={[
            styles.aiMsgBubble,
            msg.isListening && styles.listeningBubble
          ]}>
            <Text style={[
              styles.aiMsgText,
              msg.isListening && styles.listeningText
            ]}>
              {msg.text}
              {msg.isListening && " 🎤"}
            </Text>
          </View>
        </View>
      );
    }
    if (msg.type === "user") {
      return (
        <View key={idx} style={styles.userMsgRow}>
          <View style={styles.userMsgBubble}>
            <Text style={styles.userMsgText}>{msg.text}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <LinearGradient
      colors={["#009CA6", "#FDFDFD"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#F4C95D" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>AI Travel Assistant</Text>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={24} color="#F4C95D" />
            </TouchableOpacity>
          </View>
          {/* Nội dung chat */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16, flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map(renderMessage)}
            {isAITyping && (
              <View style={styles.aiMsgRow}>
                <View style={styles.avatarWrap}>
                  <Ionicons name="sparkles" size={28} color="#F4C95D" />
                </View>
                <View style={styles.aiMsgBubble}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ActivityIndicator size="small" color="#009CA6" style={{ marginRight: 8 }} />
                    <Text style={styles.aiMsgText}>AI đang soạn...</Text>
                  </View>
                </View>
              </View>
            )}
            {/* Hiển thị form booking nếu cần */}
            {showBooking && (
              <View style={{ marginTop: 12 }}>
                <BookingForm onConfirm={handleBookingConfirm} />
              </View>
            )}
            {/* Hiển thị detail booking nếu cần */}
            {showDetailBooking &&
              bookingData &&
              typeof bookingData === 'object' &&
              !Array.isArray(bookingData) &&
              'destination' in bookingData &&
              'pickup' in bookingData &&
              'selectedTime' in bookingData &&
              'selectedCar' in bookingData && (
                <View style={{ marginTop: 12 }}>
                  <DetailBooking
                    destination={bookingData.destination}
                    pickup={bookingData.pickup}
                    selectedTime={bookingData.selectedTime}
                    selectedCar={bookingData.selectedCar}
                    onEdit={() => setShowBooking(true)}
                    onConfirm={handleDetailBookingConfirm}
                  />
                </View>
            )}
            {/* Hiển thị danh sách xe tự lái nếu cần */}
            {showCarList && (
              <View style={{ marginTop: 12 }}>
                <CarRentList onRentCar={handleRentCar} />
              </View>
            )}
            {/* Hiển thị TripInfoCard nếu cần */}
            {showTripInfo && (
              <View style={{ marginTop: 12 }}>
                <TripInfoCard
                  driver={{
                    name: "Nguyễn Văn A",
                    rating: 4.8,
                    reviews: 1234,
                    distance: "Cách 2km",
                    car: "Toyota Vios",
                    plate: "51A-12345",
                    color: "Bạc",
                  }}
                  pickup="Sân bay Tân Sơn Nhất, TPHCM"
                  dropoff="Khách sạn ABC, Quận 1, TPHCM"
                  eta="Đến sau 15 phút"
                  arrival="15:30 PM"
                  payment="**** 4582"
                  price="250,000 VND"
                  isPremium={true}
                />
              </View>
            )}
          </ScrollView>
          {/* Quick Suggestions */}
          {quickSuggestions.length > 0 && (
            <View style={styles.suggestionRow}>
              {quickSuggestions.map((s, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.suggestionBtn}
                  onPress={() => handleSuggestion(s)}
                >
                  <Text style={styles.suggestionText}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* Thanh nhập nội dung */}
          <View style={styles.inputRow}>
            <TouchableOpacity onPress={handleVoiceInput} activeOpacity={0.7}>
              <Ionicons
                name={isRecording ? "mic" : "mic-outline"}
                size={28}
                color={isRecording ? "#F44336" : "#009CA6"}
                style={{ marginHorizontal: 8 }}
              />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Bạn muốn đi đâu, làm gì? Hãy nhập hoặc nói..."
              placeholderTextColor="#009CA6"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
              editable={!isRecording}
            />
            {input.length > 0 && (
              <TouchableOpacity onPress={() => setInput("")} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={22} color="#009CA6" style={{ marginRight: 4 }} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleSend()} disabled={isRecording}>
              <Ionicons name="send" size={24} color="#F4C95D" />
            </TouchableOpacity>
          </View>
          {/* Popup chi tiết xe */}
          {selectedCarDetail && (
            <CarDetailModal
              car={selectedCarDetail}
              onClose={() => setSelectedCarDetail(null)}
              onSelectCar={handleSelectCar}
            />
          )}
          
          {/* Modal chi tiết thuê xe */}
          {showRentalDetails && selectedCar && (
            <RentalDetailsModal
              car={selectedCar}
              onClose={() => setShowRentalDetails(false)}
              onConfirm={handleRentalComplete}
              onModify={handleRentalModify}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.2,
  },
  aiMsgRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E0F7FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 2,
  },
  aiMsgBubble: {
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    padding: 14,
    maxWidth: "85%",
    alignSelf: "flex-start",
    shadowColor: "#009CA6",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  aiMsgText: {
    color: "#222",
    fontSize: 15,
    marginBottom: 2,
    lineHeight: 21,
  },
  userMsgRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  userMsgBubble: {
    backgroundColor: "#009CA6",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  userMsgText: {
    color: "#fff",
    fontSize: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0,
    padding: 10,
    backgroundColor: "#FDFDFD",
    borderRadius: 24,
    margin: 10,
    shadowColor: "#009CA6",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    color: "#009CA6",
    borderWidth: 1.5,
    borderColor: "#009CA6",
    marginHorizontal: 8,
  },
  suggestionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    marginBottom: 2,
    gap: 8,
  },
  suggestionBtn: {
    backgroundColor: "#E0F7FA",
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionText: {
    color: "#009CA6",
    fontWeight: "bold",
    fontSize: 15,
  },
  listeningBubble: {
    backgroundColor: "#E0F7FA",
    borderColor: "#009CA6",
    borderWidth: 1,
    shadowColor: "#009CA6",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  listeningText: {
    color: "#009CA6",
    fontWeight: "bold",
  },
});
