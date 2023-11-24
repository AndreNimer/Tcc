import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import api from '../../Api'
import { useToken } from '../../token';

export default function Chat_txt() {
  const [mensagems, setMensagems] = useState([]);
  const [inputText, setInputText] = useState('');
  const [polling] = useState(true);
  const { token, id_responsavel, id_professor } = useToken();
  const intervalo = useRef(null);

  const getMensagem = async () => {
    try {
      const response = await api.get('/mensagems', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const mensagemData = response.data
        const todasMensagems = mensagemData.filter(
          mensagem => (mensagem.recebe_id === id_responsavel && mensagem.envio_id === id_professor) ||
                      (mensagem.recebe_id === id_professor && mensagem.envio_id === id_responsavel)
        );

        setMensagems(todasMensagems.reverse());
      }
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  useEffect(() => {

    getMensagem();
    intervalo.current = setInterval(() => {
      if (polling) {
        getMensagem();
      }
    }, 5000);
    return () => clearInterval(intervalo.current);

  }, [polling]);

  const [formData, setFormData] = useState({
    mensagem: '',
    envio_id: '',
    recebe_id: '',
  });

  const envio = async () => {
    try {
      const response = await api.post('/chat', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Resposta do servidor:', response.data);
      setInputText('');
      await getMensagem()
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleInputChange = (fieldName, text) => {
    setInputText(text)
    setFormData({
      ...formData,
      [fieldName]: text,
      envio_id: id_responsavel,
      recebe_id: id_professor,
    })
  };

  const renderMessage = ({ item }) => {
    const isMine = item.envio_id === id_responsavel;
    const messageStyle = isMine ? styles.myMessage : styles.otherMessage;

    return (
      <View key={item.id} style={styles.messageContainer}>
        <View style={[styles.card, messageStyle]}>
          <Text style={styles.cardText}>{item.mensagem}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.messageContainer}>
        <FlatList
          data={mensagems}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          inverted={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Digite sua mensagem...'
          style={styles.input}
          multiline={true}
          numberOfLines={1}
          value={inputText}
          onChangeText={(text) => handleInputChange('mensagem', text)}
        />
        <TouchableOpacity style={styles.button} onPress={envio}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3086ff',
    borderWidth: 1,
    borderColor: '#3086ff',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    padding: 10,
    marginRight: 10,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginTop: -5
  },
  input: {
    flex: 1,
    borderColor: '#000000',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderWidth: 2,
    borderRightWidth: 0,
    height: 40,
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 10,
  },
  messageContainer: {
    flex: 10,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  cardText: {
    fontSize: 16,
  },
  myMessage: {
    backgroundColor: '#99b6de',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#e6e6e6',
    alignSelf: 'flex-start',
  },
});
