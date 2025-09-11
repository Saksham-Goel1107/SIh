import { useState } from 'react'
import { Text, TouchableOpacity, View, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors'

export default function VideoCall() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleStartCall = () => {
    setIsConnecting(true)
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false)
      Alert.alert('Video Call', 'Connecting to doctor...', [
        { text: 'OK', onPress: () => router.back() }
      ])
    }, 2000)
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>


      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30
        }}>
          <Ionicons name="videocam" size={50} color={COLORS.white} />
        </View>

        <Text style={{
          fontSize: 24,
          fontWeight: '600',
          color: COLORS.text,
          marginBottom: 10,
          textAlign: 'center'
        }}>Connect with a Doctor</Text>

        <Text style={{
          fontSize: 16,
          color: COLORS.textLight,
          textAlign: 'center',
          marginBottom: 40,
          lineHeight: 22
        }}>Get instant medical consultation through secure video call</Text>

        <TouchableOpacity
          style={{
            backgroundColor: isConnecting ? COLORS.textLight : COLORS.primary,
            paddingHorizontal: 40,
            paddingVertical: 15,
            borderRadius: 25,
            flexDirection: 'row',
            alignItems: 'center'
          }}
          onPress={handleStartCall}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <Ionicons name="hourglass" size={20} color={COLORS.white} />
          ) : (
            <Ionicons name="videocam" size={20} color={COLORS.white} />
          )}
          <Text style={{
            color: COLORS.white,
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 8
          }}>
            {isConnecting ? 'Connecting...' : 'Consult a Doctor'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}