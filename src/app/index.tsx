
import { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../features/auth/AuthContext";

export default function WelcomeScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/(tab)");
    }
  }, [user, loading]);

  const handleGetStarted = () => {
    router.push("/(auth)/signup");
  };

  if (loading || user) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#D9466F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Cycle Together</Text>

        <Text style={styles.title}>
          Understand.
          {"\n"}
          Support.
          {"\n"}
          Connect.
        </Text>

        <Text style={styles.description}>
          A couples-first cycle tracking experience designed to help partners
          understand each other better.
        </Text>

        <Pressable
          style={styles.button}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>

        <Pressable
          style={styles.loginButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.loginText}>
            Already have an account? Log in
          </Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>
        Built for couples, together.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8FA",
    justifyContent: "space-between",
    padding: 24,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#D9466F",
    marginBottom: 32,
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "700",
    color: "#1F1F1F",
    marginBottom: 24,
  },
  description: {
    fontSize: 17,
    lineHeight: 26,
    color: "#6B6B6B",
    maxWidth: 340,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#D9466F",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    paddingVertical: 18,
    alignItems: "center",
  },
  loginText: {
    color: "#D9466F",
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    fontSize: 13,
    color: "#999999",
  },
  loader: {
    flex: 1,
    backgroundColor: "#FFF8FA",
    justifyContent: "center",
    alignItems: "center",
  },
});
