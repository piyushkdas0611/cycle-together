
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { createUserProfile } from "../../features/profile/profileService";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Missing information", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Invalid password",
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const normalizedEmail = email.trim().toLowerCase();
      const displayName = name.trim();

      const credential = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );

      await updateProfile(credential.user, {
        displayName,
      });

      // Save the user's basic profile in Firestore.
      await createUserProfile(
        credential.user.uid,
        displayName,
        credential.user.email ?? normalizedEmail
      );

      router.replace("/");
    } catch (error: any) {
      const errorCode = error?.code ?? "unknown";
      const messages: Record<string, string> = {
        "auth/email-already-in-use":
          "An account with this email already exists.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Please choose a stronger password.",
        "auth/network-request-failed":
          "Network error. Please check your connection.",
        "permission-denied":
          "Unable to save your profile. Please check your Firestore security rules.",
      };

      Alert.alert(
        "Sign-up failed",
        messages[errorCode] ??
          `Something went wrong (${errorCode}). Please try again.`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CycleTogether</Text>
      <Text style={styles.heading}>Create your account</Text>
      <Text style={styles.subtitle}>
        Start your journey together.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password (minimum 6 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Pressable
        style={[styles.button, loading && styles.disabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Create account</Text>
        )}
      </Pressable>

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <Link href="/(auth)/login" style={styles.link}>
          Log in
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#DB5278",
    marginBottom: 28,
  },
  heading: {
    fontSize: 25,
    fontWeight: "700",
    color: "#222222",
  },
  subtitle: {
    fontSize: 15,
    color: "#777777",
    marginTop: 8,
    marginBottom: 28,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#DB5278",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  disabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  link: {
    color: "#DB5278",
    fontWeight: "600",
  },
});
