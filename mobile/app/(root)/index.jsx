import { Text, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { styles } from '../../assets/styles/home.styles'
import { Image } from 'expo-image'

export default function Page() {

    return (
        <View style={styles.container}>
            <View style={[styles.content, { flex: 1, paddingBottom: 120 }]}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.headerLogo}
                            contentFit="contain" />
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Welcome</Text>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <SignOutButton />
                    </View>
                </View>
            </View>
        </View>
    )
}