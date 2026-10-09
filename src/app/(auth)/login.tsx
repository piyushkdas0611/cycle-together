
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert("Missing information", "Enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      router.replace("/");
    } catch (error: any) {
      const messages: Record<string, string> = {
        "auth/invalid-credential":
          "Incorrect email or password.",
        "auth/user-not-found":
          "No account found. Please sign up first.",
        "auth/wrong-password":
          "Incorrect email or password.",
        "auth/invalid-email":
          "Please enter a valid email address.",
        "auth/too-many-requests":
          "Too many attempts. Please try again later.",
        "auth/network-request-failed":
          "Network error. Check your connection.",
      };

      Alert.alert(
        "Login failed",
        messages[error.code] ?? "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CycleTogether</Text>
      <Text style={styles.heading}>Welcome back</Text>
      <Text style={styles.subtitle}>
        Log in to continue.
      </Text>

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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Pressable
        style={[styles.button, loading && styles.disabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </Pressable>

      <View style={styles.footer}>
        <Text>New to CycleTogether? </Text>
        <Link href="/(auth)/signup" style={styles.link}>
          Create account
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
