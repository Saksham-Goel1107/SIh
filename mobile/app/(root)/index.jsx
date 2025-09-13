import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { SignOutButton } from "@/components/SignOutButton";
import { styles } from "../../assets/styles/home.styles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

// Mock data for medicines
const mockMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 45,
    category: "Pain Relief",
    brand: "Crocin",
    inStock: true,
    rating: 4.5,
    image: "💊",
    description: "Effective pain relief and fever reducer",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    price: 120,
    category: "Antibiotic",
    brand: "Novamox",
    inStock: true,
    rating: 4.3,
    image: "💉",
    description: "Broad spectrum antibiotic",
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    price: 35,
    category: "Antihistamine",
    brand: "Zyrtec",
    inStock: false,
    rating: 4.7,
    image: "🧴",
    description: "Allergy relief medication",
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    price: 85,
    category: "Antacid",
    brand: "Prilosec",
    inStock: true,
    rating: 4.4,
    image: "💊",
    description: "Acid reflux and heartburn relief",
  },
  {
    id: 5,
    name: "Vitamin D3 60000 IU",
    price: 180,
    category: "Vitamins",
    brand: "HealthVit",
    inStock: true,
    rating: 4.6,
    image: "🧴",
    description: "Bone health supplement",
  },
  {
    id: 6,
    name: "Aspirin 75mg",
    price: 25,
    category: "Cardio",
    brand: "Ecosprin",
    inStock: true,
    rating: 4.2,
    image: "💊",
    description: "Heart health and blood thinner",
  },
];

// Mock data for Janseva Kendra news
const mockNews = [
  {
    id: 1,
    title: "New Health Insurance Scheme Launched",
    summary:
      "Government announces comprehensive health coverage for rural areas",
    date: "2025-09-11",
    category: "Health Policy",
    priority: "high",
    content:
      "The government has launched a new health insurance scheme providing coverage up to ₹5 lakhs for families in rural areas. This initiative aims to make healthcare more accessible and affordable.",
    author: "Ministry of Health",
  },
  {
    id: 2,
    title: "Free Vaccination Drive This Weekend",
    summary: "COVID-19 booster shots available at all primary health centers",
    date: "2025-09-10",
    category: "Vaccination",
    priority: "medium",
    content:
      "All citizens above 60 years can get free COVID-19 booster shots at nearby health centers. No prior appointment required.",
    author: "District Health Officer",
  },
  {
    id: 3,
    title: "Mobile Medical Unit Schedule",
    summary: "Weekly schedule for mobile medical units in remote villages",
    date: "2025-09-09",
    category: "Mobile Health",
    priority: "medium",
    content:
      "Mobile medical units will visit remote villages every Tuesday and Friday. Services include basic checkups, medicine distribution, and health awareness programs.",
    author: "Rural Health Mission",
  },
  {
    id: 4,
    title: "Digital Health Records Now Available",
    summary: "Access your medical history online through new portal",
    date: "2025-09-08",
    category: "Digital Health",
    priority: "low",
    content:
      "Patients can now access their complete medical history through the new digital health portal. Registration is free and secure.",
    author: "Health Tech Division",
  },
  {
    id: 5,
    title: "Emergency Contact Numbers Updated",
    summary: "New helpline numbers for medical emergencies",
    date: "2025-09-07",
    category: "Emergency",
    priority: "high",
    content:
      "Updated emergency contact numbers: Ambulance - 108, Medical Helpline - 104, COVID Helpline - 1075. Available 24/7.",
    author: "Emergency Services",
  },
];

const categories = [
  "All",
  "Pain Relief",
  "Antibiotic",
  "Vitamins",
  "Cardio",
  "Antacid",
];

export default function Page() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("pharmacy");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNews, setSelectedNews] = useState(null);

  const filteredMedicines = mockMedicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchText.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderMedicineCard = ({ item }) => (
    <TouchableOpacity
      style={styles.medicineCard}
      onPress={() =>
        Alert.alert(
          item.name,
          `${item.description}\n\nPrice: ₹${item.price}\nBrand: ${item.brand}\nCategory: ${item.category}`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Add to Cart",
              onPress: () =>
                Alert.alert("Added", `${item.name} added to cart!`),
            },
          ],
        )
      }
    >
      <View style={styles.medicineHeader}>
        <Text style={styles.medicineEmoji}>{item.image}</Text>
        <View
          style={[
            styles.stockBadge,
            { backgroundColor: item.inStock ? COLORS.income : COLORS.expense },
          ]}
        >
          <Text style={styles.stockText}>
            {item.inStock ? "In Stock" : "Out of Stock"}
          </Text>
        </View>
      </View>
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text style={styles.medicineBrand}>{item.brand}</Text>
      <Text style={styles.medicineCategory}>{item.category}</Text>
      <View style={styles.medicineFooter}>
        <Text style={styles.medicinePrice}>₹{item.price}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderNewsCard = ({ item }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() => setSelectedNews(item)}
    >
      <View style={styles.newsCardHeader}>
        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor:
                item.priority === "high"
                  ? COLORS.expense
                  : item.priority === "medium"
                    ? "#FF9500"
                    : COLORS.textLight,
            },
          ]}
        >
          <Text style={styles.priorityText}>{item.priority.toUpperCase()}</Text>
        </View>
        <Text style={styles.newsDate}>{item.date}</Text>
      </View>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
      <View style={styles.newsFooter}>
        <Text style={styles.newsCategory}>{item.category}</Text>
        <Text style={styles.newsAuthor}>By {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPharmacyTab = () => (
    <View style={styles.tabContent}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.textLight}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search medicines, brands..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={COLORS.textLight}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter Header */}
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Categories</Text>
        <Text style={styles.filterSubtitle}>
          {filteredMedicines.length} medicine
          {filteredMedicines.length !== 1 ? "s" : ""} found
        </Text>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContentContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
            activeOpacity={0.8}
            delayPressIn={0}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
            {selectedCategory === category && (
              <View style={styles.categoryIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Medicines Grid */}
      {filteredMedicines.length > 0 ? (
        <FlatList
          data={filteredMedicines}
          renderItem={renderMedicineCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.medicinesGrid}
          columnWrapperStyle={styles.medicineRow}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="medical-outline" size={48} color={COLORS.textLight} />
          <Text style={styles.emptyStateTitle}>No medicines found</Text>
          <Text style={styles.emptyStateText}>
            Try adjusting your search or filter criteria
          </Text>
        </View>
      )}
    </View>
  );

  const renderJansevaTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.newsHeaderSection}>
        <Text style={styles.newsHeaderTitle}>Janseva Kendra</Text>
        <Text style={styles.newsHeaderSubtitle}>
          Daily Health Updates & Announcements
        </Text>
      </View>

      <FlatList
        data={mockNews}
        renderItem={renderNewsCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.newsList}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.content, { flex: 1, paddingBottom: 120 }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              contentFit="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.usernameText}>
                {user?.firstName ||
                  user?.emailAddresses[0]?.emailAddress.split("@")[0] ||
                  "User"}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <SignOutButton />
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "pharmacy" && styles.activeTab]}
            onPress={() => setActiveTab("pharmacy")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === "pharmacy" && styles.activeTabIconContainer,
              ]}
            >
              <Ionicons
                name="medical"
                size={20}
                color={
                  activeTab === "pharmacy" ? COLORS.white : COLORS.textLight
                }
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === "pharmacy" && styles.activeTabText,
              ]}
            >
              Pharmacy
            </Text>
            {activeTab === "pharmacy" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "janseva" && styles.activeTab]}
            onPress={() => setActiveTab("janseva")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === "janseva" && styles.activeTabIconContainer,
              ]}
            >
              <Ionicons
                name="newspaper"
                size={20}
                color={
                  activeTab === "janseva" ? COLORS.white : COLORS.textLight
                }
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === "janseva" && styles.activeTabText,
              ]}
            >
              Janseva Kendra
            </Text>
            {activeTab === "janseva" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "pharmacy" ? renderPharmacyTab() : renderJansevaTab()}
      </View>

      {/* News Detail Modal */}
      {selectedNews && (
        <View style={styles.newsModal}>
          <View style={styles.newsModalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedNews(null)}
            >
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>

            <Text style={styles.newsModalTitle}>{selectedNews.title}</Text>
            <Text style={styles.newsModalDate}>{selectedNews.date}</Text>
            <Text style={styles.newsModalText}>{selectedNews.content}</Text>
            <Text style={styles.newsModalAuthor}>- {selectedNews.author}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
