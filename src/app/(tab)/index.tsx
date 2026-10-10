
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../features/auth/AuthContext";
import {
  getUserProfile,
  type UserProfile,
} from "../../features/profile/profileService";

export default function HomeScreen() {
  const { user, loading: authLoading, logout } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    let active = true;

    async function loadProfile() {
      setProfileLoading(true);
      setProfileError(false);

      try {
        const result = await getUserProfile(user.uid);

        if (active) {
          setProfile(result);
        }
      } catch (error) {
        console.error("Profile retrieval failed:", error);

        if (active) {
          setProfileError(true);
        }
      } finally {
        if (active) {
          setProfileLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [user, authLoading]);

  
async function handleLogout() {
  try {
    setLoggingOut(true);
    await logout();
    router.replace("/");
  } catch (error) {
    console.error("Logout failed:", error);
    Alert.alert("Logout failed", "Please try again.");
  } finally {
    setLoggingOut(false);
  }
}


  if (authLoading || profileLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#DB5278" />
        <Text style={styles.muted}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CycleTogether</Text>

      {profileError ? (
        <View style={styles.profileSection}>
          <Text style={styles.subtitle}>
            We couldn't load your profile.
          </Text>
          <Pressable
            onPress={() => {
              setProfileLoading(true);
              setProfileError(false);

              if (user) {
                getUserProfile(user.uid)
                  .then(setProfile)
                  .catch((error) => {
                    console.error(error);
                    setProfileError(true);
                  })
                  .finally(() => setProfileLoading(false));
              }
            }}
          >
            <Text style={styles.link}>Try again</Text>
          </Pressable>
        </View>
      ) : profile ? (
        <View style={styles.profileSection}>
          <Text style={styles.greeting}>
            Welcome, {profile.displayName}!
          </Text>
          <Text style={styles.subtitle}>Your profile</Text>

          <View style={styles.profileCard}>
            <Text style={styles.label}>Full name</Text>
            <Text style={styles.value}>{profile.displayName}</Text>

            <Text style={styles.label}>Email address</Text>
            <Text style={styles.value}>{profile.email}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.profileSection}>
          <Text style={styles.subtitle}>
            No profile found for this account.
          </Text>
          <Text style={styles.muted}>
            Your account exists, but its profile document is missing.
          </Text>
        </View>
      )}

      <Pressable
        style={[styles.logoutButton, loggingOut && styles.disabled]}
        onPress={handleLogout}
        disabled={loggingOut}
      >
        <Text style={styles.logoutText}>
          {loggingOut ? "Logging out..." : "Log out"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFF8FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 28,
  },
  profileSection: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#DB5278",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 20,
    textAlign: "center",
  },
  profileCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0DDE3",
  },
  label: {
    fontSize: 13,
    color: "#888888",
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: "#222222",
    fontWeight: "600",
    marginBottom: 20,
  },
  muted: {
    color: "#777777",
    marginTop: 12,
    textAlign: "center",
  },
  link: {
    color: "#DB5278",
    fontWeight: "600",
    padding: 12,
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: "#DB5278",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.7,
  },
});
