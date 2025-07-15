import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CarData = {
  id: number;
  name: string;
  image: string;
  location: string;
  distance: string;
  price: number;
  oldPrice: number;
  seats: string;
  transmission: string;
  fuel: string;
  trips: number;
  isFavorite: boolean;
};

type CarRentListProps = {
  onRentCar: (car: CarData) => void; // Callback khi người dùng nhấn 'Thuê xe'
};

const CarRentList: React.FC<CarRentListProps> = ({ onRentCar }) => {
  // Mock Data: Danh sách xe tự lái
  const cars: CarData[] = [
    {
      id: 1,
      name: "Toyota Camry 2022",
      image: "https://car-image-url-example.jpg",
      location: "Huyện Phú Quốc, Kiên Giang",
      distance: "2 km",
      price: 950000,
      oldPrice: 1090000,
      seats: "4 chỗ",
      transmission: "Số tự động",
      fuel: "Xăng",
      trips: 23,
      isFavorite: true,
    },
    {
      id: 2,
      name: "Mazda CX-5 2021",
      image: "https://mazda-car-image-example.jpg",
      location: "Huyện Phú Quốc, Kiên Giang",
      distance: "1.5 km",
      price: 1050000,
      oldPrice: 1200000,
      seats: "5 chỗ",
      transmission: "Số tự động",
      fuel: "Dầu",
      trips: 30,
      isFavorite: false,
    },
    // Mock data xe khác nếu cần
  ];

  const renderCarCard = ({ item }: { item: CarData }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.carName}>{item.name}</Text>
        <View style={styles.carInfoRow}>
          <Text style={styles.carInfo}>{item.transmission}</Text>
          <Text style={styles.carInfo}>• {item.fuel}</Text>
          <Text style={styles.carInfo}>• {item.seats}</Text>
        </View>
        <Text style={styles.location}>
          {item.location} • {item.distance}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price.toLocaleString()}đ/ngày</Text>
          <Text style={styles.oldPrice}>{item.oldPrice.toLocaleString()}đ</Text>
        </View>
        <TouchableOpacity
          style={styles.rentButton}
          onPress={() => onRentCar(item)}
        >
          <Text style={styles.rentButtonText}>Thuê xe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={cars}
      renderItem={renderCarCard}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: "column",
    width: 220,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardContent: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  carInfoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  carInfo: {
    fontSize: 12,
    color: "#009CA6",
  },
  location: {
    fontSize: 12,
    color: "#b0b0b0",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F44336",
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 12,
    color: "#b0b0b0",
    textDecorationLine: "line-through",
  },
  rentButton: {
    backgroundColor: "#009CA6",
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 4,
  },
  rentButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default CarRentList;
