import { useState, useRef, useEffect } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Redirect, useRouter, Tabs } from 'expo-router'
import SafeScreen from '@/components/SafeScreen'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors'
import { View, TouchableOpacity, Modal, Text, Animated, TextInput, ScrollView } from 'react-native'

function TabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <View style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 4,
        borderColor: COLORS.white,
      }}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

function ActionModal({ visible, onClose, onSelectIncome, onSelectExpense }) {
  const slideAnim = useRef(new Animated.Value(300)).current

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [visible,slideAnim])

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            padding: 20,
            paddingBottom: 40,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View style={{
            width: 40,
            height: 4,
            backgroundColor: COLORS.border,
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: 20,
          }} />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.income,
              padding: 18,
              borderRadius: 15,
              marginBottom: 15,
            }}
            onPress={onSelectIncome}
          >
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}>
              <Ionicons name="videocam" size={20} color={COLORS.white} />
            </View>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: COLORS.white,
            }}>Video Call with Doctor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.expense,
              padding: 18,
              borderRadius: 15,
            }}
            onPress={onSelectExpense}
          >
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}>
              <Ionicons name="chatbubble-ellipses" size={20} color={COLORS.white} />
            </View>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: COLORS.white,
            }}>Ai ChatBot</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

function ChatBotModal({ visible, onClose }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your AI health assistant. How can I help you today?', isBot: true }
  ])
  const slideAnim = useRef(new Animated.Value(400)).current

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
  }, [visible, slideAnim])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = { id: Date.now(), text: message, isBot: false }
    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simulate AI response
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: 'Thank you for your message. I\'m here to help with health-related questions and provide general guidance.', 
        isBot: true 
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
      }}>
        <Animated.View
          style={{
            height: '80%',
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Chat Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
          }}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: COLORS.text,
              marginLeft: 15,
            }}>AI Health Assistant</Text>
          </View>

          {/* Messages */}
          <ScrollView style={{ flex: 1, padding: 20 }}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={{
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  backgroundColor: msg.isBot ? COLORS.border : COLORS.primary,
                  padding: 12,
                  borderRadius: 15,
                  marginBottom: 10,
                  maxWidth: '80%',
                }}
              >
                <Text style={{
                  color: msg.isBot ? COLORS.text : COLORS.white,
                  fontSize: 14,
                }}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Input */}
          <View style={{
            flexDirection: 'row',
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
            alignItems: 'center',
          }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: COLORS.border,
                borderRadius: 20,
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginRight: 10,
                maxHeight: 100,
              }}
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleSendMessage}
            >
              <Ionicons name="send" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default function Layout() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  const [chatBotVisible, setChatBotVisible] = useState(false)
  
  if (!isSignedIn) {
    return <Redirect href={'/(auth)/sign-in'} />
  }

  const handleVideoCallPress = () => {
    router.push('/(root)/videoCall')
  }

  const handleSelectVideoCall = () => {
    setModalVisible(false)
    router.push('/(root)/videoCall')
  }

  const handleSelectChatBot = () => {
    setModalVisible(false)
    router.push('/(root)/aiChat')
  }
  
  return (
    <SafeScreen>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textLight,
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 15,
            right: 15,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            height: 75,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 10,
            borderTopWidth: 0,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarShowLabel: false,
          tabBarItemStyle: {
            paddingVertical: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: focused ? `${COLORS.primary}15` : 'transparent',
              }}>
                <Ionicons 
                  name={focused ? "home" : "home-outline"} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="videoCall"
          options={{
            tabBarIcon: () => (
              <Ionicons name="videocam" size={28} color={COLORS.white} />
            ),
            tabBarButton: (props) => (
              <TabBarButton {...props} onPress={handleVideoCallPress} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: focused ? `${COLORS.primary}15` : 'transparent',
              }}>
                <Ionicons 
                  name={focused ? "person" : "person-outline"} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="aiChat"
          options={{
            href: null,
          }}
        />
      </Tabs>
      
      {/* Floating ChatBot Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 130,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: COLORS.expense,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 8,
        }}
        onPress={() => setChatBotVisible(true)}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color={COLORS.white} />
      </TouchableOpacity>

      <ActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectIncome={handleSelectVideoCall}
        onSelectExpense={handleSelectChatBot}
      />
      
      <ChatBotModal
        visible={chatBotVisible}
        onClose={() => setChatBotVisible(false)}
      />
    </SafeScreen>
  )
}