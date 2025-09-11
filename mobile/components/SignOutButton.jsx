import { useClerk } from '@clerk/clerk-expo'
import { Alert, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors'

export const SignOutButton = ({ variant = 'icon' }) => {
  const { signOut } = useClerk()
  
  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out", 
      "Are you sure you want to sign out of your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Sign Out",
          style: "destructive", 
          onPress: () => signOut() 
        }
      ],
    )
  }

  if (variant === 'full') {
    return (
      <TouchableOpacity 
        style={{
          backgroundColor: '#FF4757',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 16,
          borderRadius: 16,
          shadowColor: '#FF4757',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }} 
        onPress={handleSignOut}
      >
        <Ionicons name="log-out-outline" size={22} color={COLORS.white} />
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: COLORS.white,
          marginLeft: 12,
        }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity 
      style={{
        padding: 10,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }} 
      onPress={handleSignOut}
    >
      <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
    </TouchableOpacity>
  )
}