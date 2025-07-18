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
  const [selectedCarDetail, setSelectedCarDetail] = useState(null);
  const [pendingCar, setPendingCar] = useState(null);
  const [showDetailBooking, setShowDetailBooking] = useState(false);
  const [bookingData, setBookingData] = useState<any | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [quickSuggestions, setQuickSuggestions] = useState(QUICK_SUGGESTIONS);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages, showCarList, showBooking, showDetailBooking]);

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
    const text = await fakeSpeechToText();
    setIsRecording(false);
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
      setQuickSuggestions([]);
    } else if (intent === "rent_car") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "Dưới đây là các xe tự lái phù hợp với bạn. Hãy chọn xe bạn muốn thuê!" },
      ]);
      setShowCarList(true);
      setShowBooking(false);
      setShowDetailBooking(false);
      setQuickSuggestions([]);
    } else if (intent === "weather") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "Thời tiết hôm nay ở Phú Quốc: Nắng đẹp, nhiệt độ 29°C. Bạn muốn đặt xe đi đâu không?" },
      ]);
      setQuickSuggestions(QUICK_SUGGESTIONS);
    } else if (intent === "suggest_food") {
      setMessages((prev: any[]) => [
        ...prev,
        { type: "ai", text: "Gợi ý nhà hàng nổi bật: Nhà hàng Hải Sản Ớt Ngọt, Quán Ra Khơi, Xin Chào... Bạn muốn đặt xe đến đó không?" },
      ]);
      setQuickSuggestions([
        { label: "Đặt xe đến Ớt Ngọt", intent: "book_car" },
        { label: "Đặt xe đến Ra Khơi", intent: "book_car" },
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
      { type: "ai", text: "Bạn đã đặt xe thành công! Chúc bạn có chuyến đi vui vẻ." },
    ]);
    setQuickSuggestions(QUICK_SUGGESTIONS);
  };

  // Xử lý chọn xe tự lái
  const handleRentCar = (car: any) => {
    setSelectedCarDetail(car);
  };
  // Xử lý chọn xe trong modal chi tiết
  const handleSelectCar = (car: any) => {
    setSelectedCarDetail(null);
    setMessages((prev: any[]) => [
      ...prev,
      { type: "ai", text: `Bạn đã chọn xe ${car.name}. Xác nhận thuê xe này?` },
    ]);
    setQuickSuggestions([
      { label: "Xác nhận thuê xe", intent: "confirm_rent" },
      { label: "Chọn xe khác", intent: "rent_car" },
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
          <View style={styles.aiMsgBubble}>
            <Text style={styles.aiMsgText}>{msg.text}</Text>
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
});
