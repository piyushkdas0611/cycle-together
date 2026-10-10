
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../features/auth/AuthContext";
import {
  getUserProfile,
  updateUserDisplayName,
  type UserProfile,
} from "../../features/profile/profileService";

export default function ProfileScreen() {
  const { user, loading: authLoading, logout } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    let active = true;

    async function loadProfile() {
      try {
        const result = await getUserProfile(user.uid);

        if (active) {
          setProfile(result);
          setName(result?.displayName ?? user.displayName ?? "");
        }
      } catch (error) {
        console.error("Profile retrieval failed:", error);
        if (active) {
          Alert.alert("Error", "Unable to load your profile.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [user, authLoading]);

  async function handleSave() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      Alert.alert("Name required", "Please enter your name.");
      return;
    }

    if (!user) return;

    try {
      setSaving(true);

      if (profile) {
        await updateUserDisplayName(user.uid, trimmedName);
      } else {
        Alert.alert(
          "Profile not found",
          "Your profile document is missing. Please contact support."
        );
        return;
      }

      // Keep the Firebase Authentication display name in sync.
      await updateProfile(user, { displayName: trimmedName });

      setProfile({
        ...profile,
        displayName: trimmedName,
      });

      Alert.alert("Success", "Your profile has been updated.");
    } catch (error) {
      console.error("Profile update failed:", error);
      Alert.alert("Update failed", "Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await logout();
      router.replace("/");
    } catch {
      Alert.alert("Logout failed", "Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  if (authLoading || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#DB5278" />
        <Text style={styles.muted}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>My Profile</Text>
        <Text style={styles.subtitle}>
          Manage your CycleTogether account.
        </Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(name.trim() || user?.email || "U")
              .charAt(0)
              .toUpperCase()}
          </Text>
        </View>

        <Text style={styles.displayName}>
          {profile?.displayName || user?.displayName || "Your profile"}
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            autoCapitalize="words"
            maxLength={80}
          />

          <Text style={styles.label}>Email address</Text>
          <Text style={styles.email}>
            {profile?.email ?? user?.email ?? "No email available"}
          </Text>

          <Pressable
            style={[styles.button, saving && styles.disabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Save changes</Text>
            )}
          </Pressable>
        </View>

        <Pressable
          style={[styles.logoutButton, loggingOut && styles.disabled]}
          onPress={handleLogout}
          disabled={loggingOut}
        >
          <Text style={styles.logoutText}>
            {loggingOut ? "Logging out..." : "Log out"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF8FA",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 48,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8FA",
  },
  heading: {
    width: "100%",
    fontSize: 28,
    fontWeight: "700",
    color: "#222222",
  },
  subtitle: {
    width: "100%",
    fontSize: 15,
    color: "#777777",
    marginTop: 8,
    marginBottom: 28,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#FCE7EF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: "700",
    color: "#DB5278",
  },
  displayName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0DDE3",
  },
  label: {
    fontSize: 13,
    color: "#777777",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#222222",
    marginBottom: 20,
  },
  email: {
    fontSize: 15,
    color: "#444444",
    marginBottom: 24,
  },
  button: {
    height: 50,
    backgroundColor: "#DB5278",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  logoutText: {
    color: "#DB5278",
    fontSize: 15,
    fontWeight: "600",
  },
  muted: {
    marginTop: 12,
    color: "#777777",
  },
  disabled: {
    opacity: 0.7,
  },
});
