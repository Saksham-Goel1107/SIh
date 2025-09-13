import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
  Platform,
  StatusBar,
} from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { profileStyles } from "../../assets/styles/profile.styles";

export default function Profile() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);
  const [shareData, setShareData] = useState(false);

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!");
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://yourapp.com/privacy");
  };

  const handleTermsOfService = () => {
    Linking.openURL("https://yourapp.com/terms");
  };

  const handleSupport = () => {
    const email = "support@yourapp.com";
    const subject = "Support Request";
    const body = "Hi, I need help with...";
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(url);
  };

  const handleRateApp = () => {
    const storeUrl =
      Platform.OS === "ios"
        ? "https://apps.apple.com/app/idYOUR_APP_ID"
        : "https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME";
    Linking.openURL(storeUrl);
  };

  const ProfileSection = ({ title, children }) => (
    <View style={profileStyles.section}>
      <Text style={profileStyles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const ProfileItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightElement,
    showArrow = false,
  }) => (
    <TouchableOpacity style={profileStyles.item} onPress={onPress}>
      <View style={profileStyles.itemLeft}>
        <View style={profileStyles.itemIcon}>
          <Ionicons name={icon} size={22} color={COLORS.primary} />
        </View>
        <View style={profileStyles.itemText}>
          <Text style={profileStyles.itemTitle}>{title}</Text>
          {subtitle && (
            <Text style={profileStyles.itemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      <View style={profileStyles.itemRight}>
        {rightElement}
        {showArrow && (
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        )}
      </View>
    </TouchableOpacity>
  );

  const getUserInitials = () => {
    const email = user?.emailAddresses[0]?.emailAddress;
    const name = email?.split("@")[0] || "User";
    return name.substring(0, 2).toUpperCase();
  };

  const getJoinDate = () => {
    const date = user?.createdAt ? new Date(user.createdAt) : new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <View style={profileStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView
        style={profileStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header Profile Card */}
        <View style={profileStyles.headerCard}>
          <View style={profileStyles.avatarContainer}>
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={profileStyles.avatar}
                contentFit="cover"
              />
            ) : (
              <View style={profileStyles.avatarPlaceholder}>
                <Text style={profileStyles.avatarText}>
                  {getUserInitials()}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={profileStyles.editAvatarBtn}
              onPress={handleEditProfile}
            >
              <Ionicons name="camera" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={profileStyles.userInfo}>
            <Text style={profileStyles.userName}>
              {user?.firstName ||
                user?.emailAddresses[0]?.emailAddress.split("@")[0] ||
                "User"}
            </Text>
            <Text style={profileStyles.userEmail}>
              {user?.emailAddresses[0]?.emailAddress}
            </Text>
            <Text style={profileStyles.joinDate}>
              Member since {getJoinDate()}
            </Text>
          </View>

          <TouchableOpacity
            style={profileStyles.editBtn}
            onPress={handleEditProfile}
          >
            <Ionicons name="pencil" size={16} color={COLORS.primary} />
            <Text style={profileStyles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <ProfileSection title="Account">
          <ProfileItem
            icon="person-outline"
            title="Personal Information"
            subtitle="Update your personal details"
            onPress={handleEditProfile}
          />
          <ProfileItem
            icon="shield-checkmark-outline"
            title="Security"
            subtitle="Password, 2FA, and more"
            onPress={() =>
              Alert.alert("Security", "Security settings coming soon!")
            }
          />
          <ProfileItem
            icon="card-outline"
            title="Payment Methods"
            subtitle="Manage your payment options"
            onPress={() =>
              Alert.alert("Payment", "Payment methods coming soon!")
            }
          />
        </ProfileSection>

        {/* Preferences Section */}
        <ProfileSection title="Preferences">
          <ProfileItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Receive important updates"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
          />
          <ProfileItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Switch to dark theme"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
          />
          <ProfileItem
            icon="finger-print-outline"
            title="Biometric Login"
            subtitle="Use fingerprint or face ID"
            rightElement={
              <Switch
                value={biometric}
                onValueChange={setBiometric}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
          />
        </ProfileSection>

        {/* Privacy Section */}
        <ProfileSection title="Privacy & Data">
          <ProfileItem
            icon="analytics-outline"
            title="Data Sharing"
            subtitle="Help improve our services"
            rightElement={
              <Switch
                value={shareData}
                onValueChange={setShareData}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
            showArrow={false}
          />
          <ProfileItem
            icon="document-text-outline"
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={handlePrivacyPolicy}
          />
          <ProfileItem
            icon="document-outline"
            title="Terms of Service"
            subtitle="Our terms and conditions"
            onPress={handleTermsOfService}
          />
        </ProfileSection>

        {/* Support Section */}
        <ProfileSection title="Support">
          <ProfileItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="Get answers to common questions"
            onPress={() => Alert.alert("Help", "Help center coming soon!")}
          />
          <ProfileItem
            icon="mail-outline"
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={handleSupport}
          />
          <ProfileItem
            icon="star-outline"
            title="Rate Our App"
            subtitle="Share your feedback"
            onPress={handleRateApp}
          />
          <ProfileItem
            icon="information-circle-outline"
            title="About"
            subtitle="Version 1.0.0"
            onPress={() =>
              Alert.alert(
                "About",
                "Health App v1.0.0\nBuilt with ❤️ for better health",
              )
            }
          />
        </ProfileSection>

        {/* Sign Out Section */}
        <View style={profileStyles.signOutSection}>
          <SignOutButton />
        </View>
      </ScrollView>
    </View>
  );
}
