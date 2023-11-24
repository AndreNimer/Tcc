import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import api from '../../Api';
import { useToken } from '../../token';
export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const [error, setError] = useState('');
  const { setToken, setId } = useToken();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data;
        const access_token = token.access_token;

        const userID = token.userID;

        setToken(access_token);

        setId(userID);

        console.log(access_token)
        console.log( userID)
        
        console.log('Login bem-sucedido');
        navigation.navigate('Alunos');
      }
    } catch (error) {
      console.log('Login falhou',error);
      setError('Email ou senha incorretos');

      setTimeout(() => setError(''), 3000);
    }
  }

  return (
    <View style={styles.conteiner}>
      <Animatable.View delay={500} animation='fadeInLeft' style={styles.conteinerHeader}>
        <Text style={styles.menssage}>Bem-Vindo(a)</Text>
      </Animatable.View>
      <Animatable.View delay={500} animation='fadeInUp' style={styles.conteinerForm}>
        {error ? (
          <TouchableOpacity style={styles.error}>
            <Text style={styles.erro}>{error}</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.title}>Email</Text>
        <TextInput placeholder='Digite seu email...' style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.title}>Senha</Text>
        <TextInput placeholder='Digite sua senha...' style={styles.input} secureTextEntry={true} value={password} onChangeText={setSenha} />

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btn_text}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn_cadastro}>
          <Text style={styles.btn_registro} onPress={() => navigation.navigate('Cadastro')}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
    conteiner:{

        flex: 1,
        backgroundColor: '#3086ff',

    },
    conteinerHeader:{

        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',

    },
    menssage:{

        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',

    },
    conteinerForm:{

        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '10%',
        paddingEnd: '10%',

    },
    title:{

        fontSize: 20,
        marginTop: 28,

    },
    input:{

        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,

    },

    btn:{
        
        backgroundColor: '#121212',
        width: '100%',
        borderRadius: 50,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btn_text:{

        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    btn_cadastro:{

        marginTop: 14,
        alignSelf: 'center',

    },
    btn_registro:{
        color: '#a1a1a1'
    },
    error:{
        borderRadius: 50,
        paddingVertical: 8,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    erro:{
        color: '#ff0000',
        fontSize: 14,
        fontWeight: 'bold',
    },
})