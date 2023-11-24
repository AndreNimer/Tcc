import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../Api';
import { useToken } from '../../token';
import { useNavigation } from '@react-navigation/native';

export default function DescricaoATV() {
  const navigation = useNavigation();
  const [atividade, setatividade] = useState([]);
  const { token, id_atv } = useToken();

  const getatividade = async () => {
    try {
      const response = await api.get('/atividades', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const atividadeData = response.data;
        const filtroatividades = atividadeData.filter(atividade => atividade.id.includes(id_atv))
        
        setatividade(filtroatividades);
      }
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };

  useEffect(() => {
    getatividade();
  }, []);
  return (
    <View style={styles.container}>
      {atividade.map((atividades) => (
        <View>
          <View style={styles.header} >
            <Text style={styles.texto}>Nota: {atividades.nota}</Text>
            <Text style={styles.textoEntrega}>Entrega: {new Date(atividades.date).toLocaleDateString()}</Text>
          </View>
          <View>
            <Text style={styles.texto}>{atividades.informacao}</Text>
          </View>
        </View>
      ))}
      <View>
        <TouchableOpacity style={styles.btn} onPress={() => {navigation.navigate('Atividades')}}>
          <Text style={styles.btn_text}>Voltar</Text>    
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 40,
    justifyContent: 'space-between', 
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    marginBottom: 20,
  },
  textoEntrega: {
    fontSize: 16,
    color: '#bfbfbf',
  },
  btn:{
    backgroundColor: '#3086ff',
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
});
