import { MaterialIcons } from '@expo/vector-icons'; // Thêm dòng này nếu bạn dùng expo
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface RentalDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  editable?: boolean;
  details?: any;
  onSave?: (details: any) => void;
}

const RentalDetailsModal: React.FC<RentalDetailsModalProps> = ({
  visible,
  onClose,
  editable = false,
  details,
  onSave,
}) => {
  const [form, setForm] = React.useState({
    car: details?.car || "Corolla Altis 2018",
    info: details?.info || "4 chỗ • Số tự động • Xăng",
    time: details?.time || "Từ 10:00 20/06/2025 ➝ 10:00 21/06/2025",
    limit: details?.limit || "1 ngày • Giới hạn: 300km/ngày",
    fuel: details?.fuel || "⛽ Nhận & trả xe đầy bình",
    customer: details?.customer || "Nguyen Van A",
    phone: details?.phone || "0912 345 678",
    email: details?.email || "nguyenvana@gmail.com",
    type: details?.type || "Thuê xe tự lái",
    document: details?.document || "CCCD + Bằng lái xe B1 trở lên",
  });

  const [showStartPicker, setShowStartPicker] = React.useState(false);
  const [showEndPicker, setShowEndPicker] = React.useState(false);

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const [editTime, setEditTime] = React.useState(false);

  // Khi lưu, cập nhật lại form.time theo ngày đã chọn
  React.useEffect(() => {
    if (startDate && endDate) {
      const format = (d: Date) =>
        `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
      handleChange(
        "time",
        `Từ ${format(startDate)} ➝ ${format(endDate)}`
      );
    }
    // eslint-disable-next-line
  }, [startDate, endDate]);

  React.useEffect(() => {
    if (details) setForm({ ...form, ...details });
    // eslint-disable-next-line
  }, [details, visible]);

  // Parse form.time khi không chỉnh sửa để lấy ngày bắt đầu/kết thúc
  React.useEffect(() => {
    if (!editable && form.time) {
      const match = form.time.match(/Từ (\d{2}:\d{2} \d{2}\/\d{2}\/\d{4}) ➝ (\d{2}:\d{2} \d{2}\/\d{2}\/\d{4})/);
      if (match) {
        const [start, end] = [match[1], match[2]];
        const parse = (str: string) => {
          const [time, date] = str.split(' ');
          const [hour, minute] = time.split(':').map(Number);
          const [day, month, year] = date.split('/').map(Number);
          return new Date(year, month - 1, day, hour, minute);
        };
        setStartDate(parse(start));
        setEndDate(parse(end));
      }
    }
  }, [form.time, editable]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.background} onPress={onClose} />
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Section: Xe */}
            <Text style={styles.sectionTitle}>🚗 Xe thuê</Text>
            <View style={styles.box}>
              {editable ? (
                <>
                  <TextInput
                    style={styles.primary}
                    value={form.car}
                    onChangeText={(t) => handleChange("car", t)}
                  />
                  <TextInput
                    style={styles.sub}
                    value={form.info}
                    onChangeText={(t) => handleChange("info", t)}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.primary}>{form.car}</Text>
                  <Text style={styles.sub}>{form.info}</Text>
                </>
              )}
            </View>
            {/* Section: Thời gian */}
            <Text style={styles.sectionTitle}>🗓️ Thời gian thuê</Text>
            <View style={styles.box}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.label}>⏱️ Thời gian:</Text>
                {!editable && (
                  <TouchableOpacity onPress={() => setEditTime(true)}>
                    <MaterialIcons name="calendar-today" size={22} color="#009CA6" />
                  </TouchableOpacity>
                )}
              </View>
              {(editable || editTime) ? (
                <>
                  <TouchableOpacity
                    style={[styles.text, { padding: 10, backgroundColor: '#eee', borderRadius: 8, marginBottom: 8 }]}
                    onPress={() => setShowStartPicker(true)}
                  >
                    <Text>
                      {startDate
                        ? `Bắt đầu: ${startDate.toLocaleString()}`
                        : "Chọn ngày bắt đầu"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.text, { padding: 10, backgroundColor: '#eee', borderRadius: 8, marginBottom: 8 }]}
                    onPress={() => setShowEndPicker(true)}
                  >
                    <Text>
                      {endDate
                        ? `Kết thúc: ${endDate.toLocaleString()}`
                        : "Chọn ngày kết thúc"}
                    </Text>
                  </TouchableOpacity>
                  {showStartPicker && (
                    <DateTimePicker
                      value={startDate || new Date()}
                      mode="datetime"
                      display="default"
                      onChange={(_, date) => {
                        setShowStartPicker(false);
                        if (date) setStartDate(date);
                      }}
                    />
                  )}
                  {showEndPicker && (
                    <DateTimePicker
                      value={endDate || new Date()}
                      mode="datetime"
                      display="default"
                      onChange={(_, date) => {
                        setShowEndPicker(false);
                        if (date) setEndDate(date);
                      }}
                    />
                  )}
                  <TextInput
                    style={styles.text}
                    value={form.limit}
                    onChangeText={(t) => handleChange("limit", t)}
                  />
                  <TextInput
                    style={styles.text}
                    value={form.fuel}
                    onChangeText={(t) => handleChange("fuel", t)}
                  />
                  {/* Khi chỉnh sửa xong, có thể thêm nút "Lưu thời gian" nếu muốn */}
                  {!editable && (
                    <TouchableOpacity
                      style={[styles.closeButton, { backgroundColor: "#009CA6", marginTop: 10, marginBottom: 0 }]}
                      onPress={() => {
                        setEditTime(false);
                        // Cập nhật lại form.time
                        if (startDate && endDate) {
                          const format = (d: Date) =>
                            `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
                          handleChange(
                            "time",
                            `Từ ${format(startDate)} ➝ ${format(endDate)}`
                          );
                        }
                      }}
                    >
                      <Text style={styles.closeText}>Lưu thời gian</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <>
                  <Text style={styles.text}>{form.time}</Text>
                  <Text style={styles.text}>{form.limit}</Text>
                  <Text style={styles.text}>{form.fuel}</Text>
                </>
              )}
            </View>

            {/* Section: Chi phí */}
            <Text style={styles.sectionTitle}>💰 Chi phí</Text>
            <View style={styles.box}>
              <View style={styles.row}>
                <Text style={styles.label}>Giá cơ bản (1 ngày)</Text>
                <Text style={styles.text}>844,000đ</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Phí giao xe</Text>
                <Text style={styles.text}>50,000đ</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Bảo hiểm</Text>
                <Text style={styles.text}>30,000đ</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.label, { color: '#4CAF50' }]}>Giảm giá (20%)</Text>
                <Text style={[styles.text, { color: '#4CAF50' }]}>-168,800đ</Text>
              </View>
              <View style={styles.rowTotal}>
                <Text style={styles.totalLabel}>Tổng thanh toán</Text>
                <Text style={styles.totalAmount}>755,200đ</Text>
              </View>
            </View>

            {/* Section: Khách hàng */}
            <Text style={styles.sectionTitle}>👤 Thông tin khách hàng</Text>
            <View style={styles.box}>
              <>
                <Text style={styles.text}>{form.customer}</Text>
                <Text style={styles.text}>📞 {form.phone}</Text>
                <Text style={styles.text}>📧 {form.email}</Text>
                <Text style={styles.text}>🚗 {form.type}</Text>
              </>
            </View>
            {/* Section: Giấy tờ */}
            <Text style={styles.sectionTitle}>📝 Giấy tờ yêu cầu</Text>
            <View style={[styles.box, { backgroundColor: '#FFF7E0' }]}>
              <Text style={[styles.text, { color: '#B45309' }]}>
                {form.document}
              </Text>
            </View>
            {editable ? (
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: "#4CAF50" }]}
                onPress={() => onSave && onSave(form)}
              >
                <Text style={styles.closeText}>Lưu</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>Đóng</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  background: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '92%',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    color: '#009CA6',
  },
  box: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  primary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  sub: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
  },
  label: {
    color: '#555',
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
    paddingTop: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#009CA6',
  },
  closeButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RentalDetailsModal;
