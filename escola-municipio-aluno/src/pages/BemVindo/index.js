import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import logo from '../../assets/logo.png'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

export default function BemVindo() {
  const navigation = useNavigation();
  return (
    <View style={styles.conteiner}>

      <View style={styles.conteinerLogo}>

        <Animatable.Image delay={100} animation='flipInY' source={logo} style={{width:'60%'}} resizeMode='contain' />

      </View>

      <Animatable.View delay={700} animation='fadeInUp' style={styles.conteinerForm}>

        <Text style={styles.title}>Conecte-se com o futuro acadêmico do seu filho: Acompanhe, Cuide e os Inspirem!</Text>
        <Text style={styles.text}>Faça o login para começar</Text>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btn_text}>Fazer Login</Text>
        </TouchableOpacity>

      </Animatable.View>

    </View>
  );
}
const styles = StyleSheet.create({
  conteiner:{

    flex:1,
    backgroundColor: '#3086ff',

  },
  conteinerLogo:{

    flex:2,
    backgroundColor: '#3086ff',
    justifyContent: 'center',
    alignItems: 'center',

  },
  conteinerForm:{

    flex:1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: 40,
    paddingEnd: 20,
  },
  title:{

    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    letterSpacing: 1,

  },
  text:{

    color: '#a1a1a1',

  },
  btn:{

    position: 'absolute',
    backgroundColor: '#121212',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '13%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  btn_text:{

    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',

  }
})