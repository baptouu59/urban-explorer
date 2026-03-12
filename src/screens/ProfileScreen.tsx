import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar } from "react-native"
import { useState, useEffect } from "react"
import * as ImagePicker from 'expo-image-picker'
import { Colors, Spacing, Radius, Shadows } from "../constants/Theme"

export default function ProfileScreen() {
    const [avatar, setAvatar] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert("Permission requise", "L'accès à la caméra est nécessaire pour prendre un selfie.")
            }
        })()
    }, [])

    const takeSelfie = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        })

        if (!result.canceled) {
            setAvatar(result.assets[0].uri)
        }
    }

    const MenuItem = ({ icon, title, subtitle, isLast = false }: any) => (
        <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}>
            <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>{icon}</Text>
            </View>
            <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{title}</Text>
                {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
            </View>
            <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerBackground} />
                    <TouchableOpacity style={styles.avatarContainer} onPress={takeSelfie}>
                        <Image
                            source={{ uri: avatar || "https://avatar.iran.liara.run/public" }}
                            style={styles.avatar}
                        />
                        <View style={styles.cameraBadge}>
                            <Text style={styles.cameraEmoji}>📷</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.name}>Utilisateur Explorateur</Text>
                    <Text style={styles.email}>explorer@example.com</Text>
                    
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Visites</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>5</Text>
                            <Text style={styles.statLabel}>Favoris</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Activité</Text>
                    <View style={styles.menuCard}>
                        <MenuItem icon="🗓️" title="Mes visites planifiées" subtitle="3 rendez-vous à venir" />
                        <MenuItem icon="📍" title="Lieux visités" subtitle="Consulter mon historique" />
                        <MenuItem icon="⭐" title="Favoris" isLast={true} />
                    </View>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Paramètres</Text>
                    <View style={styles.menuCard}>
                        <MenuItem icon="👤" title="Modifier le profil" />
                        <MenuItem icon="🔔" title="Notifications" />
                        <MenuItem icon="🔒" title="Sécurité" isLast={true} />
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Déconnexion</Text>
                </TouchableOpacity>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: Spacing.lg,
        backgroundColor: Colors.white,
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 150,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: Radius.round,
        borderBottomRightRadius: Radius.round,
        transform: [{ scaleX: 1.5 }],
    },
    avatarContainer: {
        ...Shadows.lg,
        padding: 4,
        backgroundColor: Colors.white,
        borderRadius: Radius.round,
        marginBottom: Spacing.md,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: Colors.accent,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.white,
    },
    cameraEmoji: {
        fontSize: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.text,
    },
    email: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginTop: 4,
        marginBottom: Spacing.lg,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        borderRadius: Radius.xl,
        ...Shadows.md,
        width: '80%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: Colors.border,
    },
    menuSection: {
        marginTop: Spacing.lg,
        paddingHorizontal: Spacing.md,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: Spacing.sm,
        paddingLeft: 4,
    },
    menuCard: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        ...Shadows.sm,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: Radius.md,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    menuIcon: {
        fontSize: 20,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    menuSubtitle: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    menuArrow: {
        fontSize: 18,
        color: Colors.border,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: Spacing.xl,
        marginHorizontal: Spacing.md,
        padding: Spacing.md,
        borderRadius: Radius.lg,
        backgroundColor: Colors.danger + '10',
        alignItems: 'center',
    },
    logoutText: {
        color: Colors.danger,
        fontSize: 16,
        fontWeight: 'bold',
    }
})