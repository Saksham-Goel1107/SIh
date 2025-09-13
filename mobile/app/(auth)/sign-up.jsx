import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { styles } from "@/assets/styles/auth.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [phoneNumber, setphoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [Error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // ✅ Always prefix with +91 if not already
      let normalizedPhone = phoneNumber.trim();
      if (!normalizedPhone.startsWith("+91")) {
        normalizedPhone = `+91${normalizedPhone.replace(/^0+/, "")}`;
      }

      await signUp.create({
        phoneNumber: normalizedPhone,
        password,
      });

      await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
      setPendingVerification(true);
    } catch (err) {
      setError(
        err.errors?.[0]?.message || "An error occurred. Please try again.",
      );
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptPhoneNumberVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your Phone Number</Text>
        {Error && (
          <View style={styles.errorContainer}>
            <Ionicons name="warning-outline" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{Error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          </View>
        )}

        <TextInput
          style={[styles.verificationInput, Error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
          <Text style={styles.buttonText}>Verify Phone Number</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={100}
      enableAutomaticScroll={true}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
          contentFit="contain"
        />
        <Text style={styles.title}>Sign up</Text>
        {Error && (
          <View style={styles.errorContainer}>
            <Ionicons name="warning-outline" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{Error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          style={[styles.input, Error && styles.errorInput]}
          autoCapitalize="none"
          value={phoneNumber}
          placeholder="Enter Phone Number"
          onChangeText={(Phone_Number) => setphoneNumber(Phone_Number)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, Error && styles.errorInput]}
            value={password}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={COLORS.textLight}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, Error && styles.errorInput]}
            value={confirmPassword}
            placeholder="Confirm password"
            secureTextEntry={!showConfirmPassword}
            onChangeText={(password) => setConfirmPassword(password)}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={COLORS.textLight}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>{" "}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
            <Text style={styles.footerLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>View Consent Screen</Text>
          <TouchableOpacity onPress={() => router.replace("/")}>
            <Text style={styles.footerLink}>Click Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
