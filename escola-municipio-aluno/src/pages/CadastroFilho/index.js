import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../Api'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { useToken } from '../../token';

export default function CadastroFilho() {
  
  const navigation = useNavigation();
  const { token } = useToken();
  const { id_responsavel} = useToken();
  const [escola, setEscolas] = useState([]);
  const [escolaSelecionada, setEscolaSelecionada] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const getEscola = async () => {
        try {
          const response = await api.get('/escolas',{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            
            const escolaData = response.data
            setEscolas(escolaData)
          }
        } catch (error) {
          console.error('Erro ao buscar alunos:', error);
        }
      };

      getEscola();
    }, [token])
  );

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.nome}</Text>
      </View>
    );
  };

  const [formData, setFormData] = useState({
    nome: '',
    escola_id: '',
    cpf:'',
    responsavel_id:'',
  });
  
  const cadastrar = async () => {
  
    try {
      const response = await api.post('/userAluno', formData, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Resposta do servidor:', response.data);

      navigation.navigate('Alunos');
     
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleInputChange = (fieldName, text) => {
    setFormData({
      ...formData,
      [fieldName]: text,
      responsavel_id: id_responsavel,
    });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Animatable.View delay={500} animation="fadeInLeft" style={styles.containerHeader}>
        <Text style={styles.message}>Cadastre seu filho</Text>
      </Animatable.View>
      <Animatable.View delay={500} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          placeholder="Digite seu nome completo..."
          style={styles.input}
          onChangeText={(text) => handleInputChange('nome', text)}
          value={formData.nome}
        />

        <Text style={styles.title}>CPF</Text>
        <TextInput
          placeholder="Digite seu CPF completo..."
          style={styles.input}
          onChangeText={(text) => handleInputChange('cpf', text)}
          value={formData.cpf}
        />
       <Text style={styles.title}>Escolas</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={escola}
          search
          maxHeight={300}
          labelField="nome" 
          valueField="id"
          placeholder="Selecionar Escola"
          searchPlaceholder="Search..."
          value={escolaSelecionada}
          onChange={(item) => {
            setFormData({
              ...formData,
              escola_id: item.id,
            });
            setEscolaSelecionada(item.id);
          }}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.btn} onPress={cadastrar}>
          <Text style={styles.btn_text}>Cadastrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#3086ff',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '10%',
    paddingEnd: '10%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#121212',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderColor:'#000',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});