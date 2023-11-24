import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Btn_Chat({size,  focused}) {
  return (
    <View style={[styles.container, {backgroundColor: focused ? '#3086ff':'#ffffff'}]}>
      <Ionicons name='md-chatbox-ellipses' size={size} color={focused ? '#ffffff' : '#3086ff'}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        width:60,
        height:60,
        borderRadius:30,
        borderWidth: 4,
        borderColor: '#121212',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 20,
    }
})