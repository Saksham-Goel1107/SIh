import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { styles } from '../../assets/styles/home.styles'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'

export default function Page() {
    const { user } = useUser()
    const router = useRouter()

    return (
        <View style={styles.container}>
            <View style={[styles.content, { flex: 1 }]}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.headerLogo}
                            contentFit="contain" />
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Welcome,</Text>
                            <Text style={styles.usernameText}>{user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>
                        </View>
                    </View>
                    <View style={styles.headerRight}>            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(root)/create')}>
                        <Ionicons name="add" size={20} color="#FFF" />
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                        <SignOutButton />
                    </View>
                </View>
            </View>
        </View>
    )
}