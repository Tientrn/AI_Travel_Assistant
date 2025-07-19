import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
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
  rating: number;
  features: string[];
};

type CarRentListProps = {
  onRentCar: (car: CarData) => void;
};

const CarRentList: React.FC<CarRentListProps> = ({ onRentCar }) => {
  // State để quản lý danh sách xe yêu thích
  const [favoriteCars, setFavoriteCars] = useState<Set<number>>(new Set());

  // Mock Data với ảnh thực tế
  const cars: CarData[] = [
    {
      id: 1,
      name: "Toyota Camry 2022",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop",
      location: "Huyện Phú Quốc, Kiên Giang",
      distance: "2 km",
      price: 950000,
      oldPrice: 1090000,
      seats: "4 chỗ",
      transmission: "Số tự động",
      fuel: "Xăng",
      trips: 23,
      isFavorite: true,
      rating: 4.8,
      features: ["AC", "Bluetooth", "Camera lùi"],
    },
    {
      id: 2,
      name: "Mazda CX-5 2021",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop",
      location: "Huyện Phú Quốc, Kiên Giang",
      distance: "1.5 km",
      price: 1050000,
      oldPrice: 1200000,
      seats: "5 chỗ",
      transmission: "Số tự động",
      fuel: "Dầu",
      trips: 30,
      isFavorite: false,
      rating: 4.9,
      features: ["AC", "GPS", "Camera 360"],
    },
    {
      id: 3,
      name: "Honda CR-V 2023",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
      location: "Huyện Phú Quốc, Kiên Giang",
      distance: "3 km",
      price: 1200000,
      oldPrice: 1350000,
      seats: "5 chỗ",
      transmission: "Số tự động",
      fuel: "Xăng",
      trips: 15,
      isFavorite: false,
      rating: 4.7,
      features: ["AC", "Sunroof", "Leather"],
    },
    {
      id: 4,
      name: "Ford Ranger 2022",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      location: "Huyện Phú Quốc, Kiên Giang",
      distance: "4 km",
      price: 850000,
      oldPrice: 980000,
      seats: "5 chỗ",
      transmission: "Số sàn",
      fuel: "Dầu",
      trips: 42,
      isFavorite: true,
      rating: 4.6,
      features: ["AC", "4x4", "Cargo"],
    },
  ];

  // Hàm xử lý toggle yêu thích
  const handleToggleFavorite = (carId: number) => {
    setFavoriteCars(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
      } else {
        newFavorites.add(carId);
      }
      return newFavorites;
    });
  };

  // Kiểm tra xe có được yêu thích không
  const isCarFavorite = (carId: number) => {
    return favoriteCars.has(carId);
  };

  const renderCarCard = ({ item }: { item: CarData }) => (
    <View style={styles.card}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']}
          style={styles.imageOverlay}
        />
        
        {/* Favorite Button */}
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => handleToggleFavorite(item.id)}
        >
          <Ionicons 
            name={isCarFavorite(item.id) ? "heart" : "heart-outline"} 
            size={20} 
            color={isCarFavorite(item.id) ? "#ff4757" : "#fff"} 
          />
        </TouchableOpacity>
        
        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#ffd700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        
        {/* Discount Badge */}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
          </Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.cardContent}>
        {/* Top Content */}
        <View style={styles.topContent}>
          {/* Car Name */}
          <Text style={styles.carName} numberOfLines={1}>{item.name}</Text>
          
          {/* Car Specs */}
          <View style={styles.specsRow}>
            <View style={styles.specItem}>
              <Ionicons name="people" size={14} color="#667eea" />
              <Text style={styles.specText}>{item.seats}</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="settings" size={14} color="#667eea" />
              <Text style={styles.specText}>{item.transmission}</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="water" size={14} color="#667eea" />
              <Text style={styles.specText}>{item.fuel}</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#94a3b8" />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.location} • {item.distance}
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresRow}>
            {item.features.slice(0, 2).map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Content - Price & Button */}
        <View style={styles.bottomContent}>
          {/* Price Section */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
              <Text style={styles.priceUnit}>/ngày</Text>
              <Text style={styles.oldPrice}>{item.oldPrice.toLocaleString()}đ</Text>
            </View>
          </View>
          
          {/* Rent Button - Separate Line */}
          <TouchableOpacity
            style={styles.rentButton}
            onPress={() => onRentCar(item)}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.9)', 'rgba(255,255,255,0.1)', 'rgba(0,0,0,0.8)']}
              style={styles.rentGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="car" size={16} color="#fff" />
              <Text style={styles.rentButtonText}>Thuê ngay</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    borderRadius: 16,
    marginRight: 16,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    width: 260,
    height: 360,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  discountBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  discountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
  },
  bottomContent: {
    marginTop: 12,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  specsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  specText: {
    fontSize: 11,
    color: "#3b82f6",
    marginLeft: 3,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    fontSize: 11,
    color: "#94a3b8",
    marginLeft: 3,
    flex: 1,
  },
  featuresRow: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 4,
  },
  featureTag: {
    backgroundColor: "#dbeafe",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  featureText: {
    fontSize: 9,
    color: "#3b82f6",
    fontWeight: "500",
  },
  priceSection: {
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  priceUnit: {
    fontSize: 11,
    color: "#64748b",
    marginLeft: 2,
  },
  oldPrice: {
    fontSize: 11,
    color: "#94a3b8",
    textDecorationLine: "line-through",
    marginLeft: 6,
  },
  rentButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    minHeight: 44,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  rentGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 12,
    minHeight: 44,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  rentButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default CarRentList;
