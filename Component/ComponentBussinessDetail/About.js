import { View, Text } from 'react-native'
import React from 'react'

export default function About({bussiness}) {
  return (
    <View style={{backgroundColor:'white',padding:20,}}>
      <Text style={{fontFamily:'Outfit_700Bold',fontSize:20}}>About</Text>
      <Text style={{fontFamily:'Outfit_400Regular',lineHeight:25}}>{bussiness.about}</Text>
    </View>
  )
}