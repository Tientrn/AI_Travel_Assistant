import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BookingForm from "../components/bookingform";
import CarDetailModal from "../components/CarDetailModal";
import CarRentList from "../components/CarRentList";
import DetailBooking from "../components/Detailbooking";

type BookingDetailData = {
  destination: string;
  pickup: string;
  selectedTime: string;
  selectedCar: string;
};

export default function HomeScreen() {
  const [input, setInput] = useState("");
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<
    "datxe" | "thuexe" | null
  >(null);
  const [showBooking, setShowBooking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedCarDetail, setSelectedCarDetail] = useState<any | null>(null);
  const [pendingCar, setPendingCar] = useState<any | null>(null); // thêm state này

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleRentCar = (car: any) => {
    setSelectedCarDetail(car);
  };
  // Xử lý xác nhận booking
  const handleBookingConfirm = (data: BookingDetailData) => {
    setShowBooking(false);
    setMessages((prev) => {
      // Nếu message cuối cùng là booking_detail thì cập nhật lại, không thêm mới
      if (prev.length > 0 && prev[prev.length - 1].type === "booking_detail") {
        return [...prev.slice(0, -1), { type: "booking_detail", data }];
      }
      // Nếu message cuối là system và trước đó là booking_detail, thì cập nhật booking_detail
      if (
        prev.length > 1 &&
        prev[prev.length - 1].type === "system" &&
        prev[prev.length - 2].type === "booking_detail"
      ) {
        return [
          ...prev.slice(0, -2),
          {
            type: "system",
            text: "Dưới đây là thông tin chi tiết đặt xe của bạn, vui lòng xác nhận lại.",
          },
          { type: "booking_detail", data },
        ];
      }
      // Ngược lại, thêm mới như cũ
      return [
        ...prev,
        {
          type: "system",
          text: "Dưới đây là thông tin chi tiết đặt xe của bạn, vui lòng xác nhận lại.",
        },
        { type: "booking_detail", data },
      ];
    });
  };

  // Xử lý gửi tin nhắn user
  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages((prev) => [...prev, { type: "user", text: input.trim() }]);
      setInput("");
    }
  };

  // Xử lý chọn xe
  const handleSelectCar = (car: any) => {
    setSelectedCarDetail(null); // đóng modal chi tiết xe
    setPendingCar(car); // lưu xe đang chọn
    setMessages((prev) => [
      ...prev,
      {
        type: "car_confirm",
        car,
      },
    ]);
  };

  // Xử lý xác nhận chọn xe
  const handleConfirmCar = () => {
    setPendingCar(null);
    router.push("/screens/CarRentalScreen");
  };

  // Xử lý huỷ chọn xe
  const handleCancelCar = () => {
    setPendingCar(null);
    setMessages((prev) => [
      ...prev,
      {
        type: "system",
        text: "Bạn đã huỷ chọn xe.",
      },
    ]);
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
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
          style={{ flex: 1 }}
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
          >
            {/* Tin nhắn AI đầu tiên */}
            <View style={styles.aiMsgRow}>
              <View style={styles.aiMsgBubble}>
                <Text style={styles.aiMsgText}>
                  Chào bạn! <Text>😊</Text> Mình thấy bạn đang có mặt tại Phú
                  Quốc , thật tuyệt vời! 🎉{"\n"}
                  Bạn đang muốn đặt xe có tài xế để thoải mái khám phá các điểm
                  đến, hay muốn thuê xe tự lái để chủ động vi vu theo cách riêng
                  của mình? 🚗
                </Text>
                <View style={styles.aiBtnRow}>
                  <TouchableOpacity
                    style={[
                      styles.aiBtn,
                      selectedOption === "datxe"
                        ? styles.aiBtnSelected
                        : styles.aiBtnUnselected,
                    ]}
                    onPress={() => {
                      setSelectedOption("datxe");
                      setMessages((prev) => [
                        ...prev,
                        { type: "user", text: "Đặt xe" },
                      ]);
                      setShowBooking(true);
                    }}
                  >
                    <Text
                      style={[
                        styles.aiBtnText,
                        selectedOption === "datxe"
                          ? styles.aiBtnTextSelected
                          : styles.aiBtnTextUnselected,
                      ]}
                    >
                      Đặt xe
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.aiBtn,
                      selectedOption === "thuexe"
                        ? styles.aiBtnSelected
                        : styles.aiBtnUnselected,
                    ]}
                    onPress={() => setSelectedOption("thuexe")}
                  >
                    <Text
                      style={[
                        styles.aiBtnText,
                        selectedOption === "thuexe"
                          ? styles.aiBtnTextSelected
                          : styles.aiBtnTextUnselected,
                      ]}
                    >
                      Thuê xe
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Render CarRentList nếu chọn Thuê xe */}
            {selectedOption === "thuexe" && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#009CA6",
                      borderRadius: 12,
                      paddingVertical: 12,
                      paddingHorizontal: 24,
                      alignSelf: "flex-end",
                      maxWidth: "80%",
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 15 }}>
                      Tôi đang ở Phú Quốc
                    </Text>
                  </View>
                </View>
                <CarRentList onRentCar={handleRentCar} />
              </>
            )}
            {/* Render các message trong chatbox */}
            {messages.map((msg, idx) => {
              if (msg.type === "system") {
                return (
                  <View
                    key={idx}
                    style={[styles.systemMsg, { marginBottom: 16 }]}
                  >
                    <Text style={styles.systemMsgText}>{msg.text}</Text>
                  </View>
                );
              }
              if (msg.type === "booking_detail") {
                return (
                  <View key={idx} style={{ marginBottom: 16 }}>
                    <DetailBooking
                      {...msg.data}
                      onEdit={() => setShowBooking(true)}
                      onConfirm={() => router.push("/screens/ChatwithDriver")}
                    />
                  </View>
                );
              }
              if (msg.type === "user") {
                return (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginBottom: 16,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#009CA6",
                        borderRadius: 12,
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        alignSelf: "flex-end",
                        maxWidth: "80%",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 15 }}>
                        {msg.text}
                      </Text>
                    </View>
                  </View>
                );
              }
              if (msg.type === "car_status") {
                return (
                  <View
                    key={idx}
                    style={{
                      marginBottom: 16,
                      borderRadius: 16,
                      backgroundColor: "#fff",
                      overflow: "hidden",
                      shadowColor: "#009CA6",
                      shadowOpacity: 0.08,
                      shadowRadius: 12,
                      elevation: 3,
                    }}
                  >
                    {/* Bản đồ tĩnh */}
                    <View
                      style={{
                        height: 160,
                        backgroundColor: "#e0f7fa",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "#e0f7fa",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#009CA6", fontWeight: "bold" }}>
                          [Bản đồ tĩnh]
                        </Text>
                      </View>
                      <View
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "60%",
                          marginLeft: -24,
                        }}
                      >
                        <Ionicons name="car" size={48} color="#F4C95D" />
                      </View>
                    </View>
                    {/* Thông tin tài xế */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 12,
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        margin: 12,
                        marginBottom: 0,
                        shadowColor: "#009CA6",
                        shadowOpacity: 0.06,
                        shadowRadius: 6,
                        elevation: 1,
                      }}
                    >
                      <View
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 24,
                          overflow: "hidden",
                          marginRight: 12,
                          backgroundColor: "#eee",
                        }}
                      >
                        <Ionicons
                          name="person"
                          size={40}
                          color="#009CA6"
                          style={{ alignSelf: "center", marginTop: 4 }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "#222",
                            fontSize: 15,
                          }}
                        >
                          {msg.driver?.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 2,
                          }}
                        >
                          <Ionicons name="star" size={14} color="#F4C95D" />
                          <Text
                            style={{
                              color: "#009CA6",
                              fontSize: 13,
                              marginLeft: 4,
                            }}
                          >
                            {msg.driver?.rating}
                          </Text>
                          <Text
                            style={{
                              color: "#b0b0b0",
                              fontSize: 13,
                              marginLeft: 6,
                            }}
                          >
                            ({msg.driver?.reviews} đánh giá)
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#009CA6",
                            fontSize: 13,
                            marginTop: 2,
                          }}
                        >
                          Còn {msg.driver?.distance} mét.
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#e0f7fa",
                          borderRadius: 20,
                          padding: 8,
                          marginLeft: 8,
                        }}
                      >
                        <Ionicons name="call" size={22} color="#009CA6" />
                      </TouchableOpacity>
                    </View>
                    {/* Trạng thái xe và các nút hành động */}
                    <View style={{ padding: 12, paddingTop: 8 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Ionicons
                          name="car"
                          size={18}
                          color="#009CA6"
                          style={{ marginRight: 8 }}
                        />
                        <View
                          style={{
                            flex: 1,
                            height: 6,
                            backgroundColor: "#009CA6",
                            borderRadius: 3,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          backgroundColor: "#f2f2f2",
                          borderRadius: 8,
                          padding: 10,
                          marginBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#F44336",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Xe của bạn đang trên đường đến!
                        </Text>
                        <Text
                          style={{ color: "#222", fontSize: 14, marginTop: 2 }}
                        >
                          ⏱️ Thời gian đến dự kiến: {msg.eta} phút.{"\n"}Trong
                          lúc chờ đợi, bạn có thể:
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", gap: 10 }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#009CA6",
                            borderRadius: 8,
                            paddingVertical: 10,
                            paddingHorizontal: 18,
                            marginRight: 8,
                          }}
                        >
                          <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Thời tiết hôm nay
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#F4C95D",
                            borderRadius: 8,
                            paddingVertical: 10,
                            paddingHorizontal: 18,
                          }}
                        >
                          <Text
                            style={{ color: "#009CA6", fontWeight: "bold" }}
                          >
                            Liên hệ tài xế
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }
              if (msg.type === "car_confirm") {
                return (
                  <View key={idx} style={[styles.systemMsg, { marginBottom: 16 }]}>
                    <Text style={styles.systemMsgText}>
                      Bạn đã chọn xe <Text style={{ fontWeight: "bold", color: "#009CA6" }}>{msg.car?.name}</Text>.{"\n"}
                      Xác nhận đặt xe này?
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 10, gap: 12 }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#4CAF50",
                          borderRadius: 8,
                          paddingVertical: 10,
                          paddingHorizontal: 18,
                          marginRight: 8,
                        }}
                        onPress={handleConfirmCar}
                      >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Xác nhận</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#F44336",
                          borderRadius: 8,
                          paddingVertical: 10,
                          paddingHorizontal: 18,
                        }}
                        onPress={handleCancelCar}
                      >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Huỷ</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
              return null;
            })}
          </ScrollView>
          {/* Thanh nhập nội dung */}
          <View style={styles.inputRow}>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons
                name="happy-outline"
                size={24}
                color="#009CA6"
                style={{ marginHorizontal: 8 }}
              />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Ask anything..."
              placeholderTextColor="#009CA6"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            {input.length > 0 && (
              <TouchableOpacity
                onPress={() => setInput("")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close-circle"
                  size={22}
                  color="#009CA6"
                  style={{ marginRight: 4 }}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => inputRef.current?.focus()}>
              <Ionicons
                name="mic-outline"
                size={24}
                color="#009CA6"
                style={{ marginHorizontal: 8 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSend}>
              <Ionicons name="send" size={24} color="#F4C95D" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {/* Popup BookingForm */}
        {showBooking && (
          <View style={styles.popupOverlay}>
            <TouchableOpacity
              style={styles.popupBg}
              activeOpacity={1}
              onPress={() => setShowBooking(false)}
            />
            <View style={styles.popupContent}>
              <BookingForm onConfirm={handleBookingConfirm} />
            </View>
          </View>
        )}
        {/* Popup chi tiết xe */}
        {selectedCarDetail && (
          <CarDetailModal
            car={selectedCarDetail}
            onClose={() => setSelectedCarDetail(null)}
            onSelectCar={handleSelectCar} // truyền prop này
          />
        )}
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
  },
  aiMsgBubble: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 12,
    maxWidth: "90%",
    alignSelf: "flex-start",
    shadowColor: "#009CA6",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  aiMsgText: {
    color: "#222",
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 21,
  },
  aiBtnRow: {
    flexDirection: "row",
    gap: 8,
  },
  aiBtn: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginRight: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  aiBtnSelected: {
    backgroundColor: "#009CA6",
    borderColor: "#009CA6",
    shadowColor: "#009CA6",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  aiBtnUnselected: {
    backgroundColor: "#f9f9f9",
    borderColor: "#b2dfdb",
    shadowColor: "transparent",
  },
  aiBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  aiBtnTextSelected: {
    color: "#fff",
  },
  aiBtnTextUnselected: {
    color: "#009CA6",
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
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.18)",
    zIndex: 100,
  },
  popupBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  popupContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 0,
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 2,
    elevation: 2,
  },
  systemMsg: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
    maxWidth: "90%",
  },
  systemMsgText: {
    color: "#222",
    fontSize: 15,
  },
});
