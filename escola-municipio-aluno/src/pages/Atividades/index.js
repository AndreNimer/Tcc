import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../Api';
import { useToken } from '../../token';

export default function Atividade() {
  const navigation = useNavigation();
  const [atividade, setatividade] = useState([]);
  const [avaliacao, setavaliacao] = useState([]);
  const [polling] = useState(true);
  const { token, id_professor, setAtv } = useToken();
  const intervalo = useRef(null);

  const getatividade = async () => {
    try {
      const response = await api.get('/atividades', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const atividadeData = response.data;
        
        const filtroatividades = atividadeData.filter(atividade => atividade.tipo.includes('atividade') 
        || atividade.professor_id === id_professor)

        const filtroavaliacao = atividadeData.filter(atividade => atividade.tipo.includes('avaliacao') 
        || atividade.professor_id === id_professor)

        setatividade(filtroatividades);
        setavaliacao(filtroavaliacao)
      }
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };

  useEffect(() => {

    getatividade();
    intervalo.current = setInterval(() => {
      if (polling) {
        getatividade();
      }
    }, 5000);
    return () => clearInterval(intervalo.current);

  }, [polling]);

  const handleAtividadeClick = (atividadeId, atividadeTitulo) => {
    setAtv(atividadeId);
    navigation.navigate('DescricaoATV', {
      atividadeName: atividadeTitulo,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.texto}>Atividades</Text>
        {atividade.map((atividades) => (
          <View style={styles.atividadesItem} key={atividades.id}>

            <Text style={styles.tituloText}>{atividades.titulo}</Text>

            <Text>Descrição: {atividades.decricao}</Text>

            <Text style={styles.data}>Data de Entrega: {new Date(atividades.date).toLocaleDateString()}</Text>

            <TouchableOpacity style={styles.btn} onPress={() => handleAtividadeClick(atividades.id, atividades.titulo)}>

              <Text style={styles.btn_text}>Ver Atividade</Text>

            </TouchableOpacity>

          </View>
        ))}
        <Text style={styles.texto}>Atividades Avaliativas</Text>
        {avaliacao.map((avaliacoes) => (
          <View style={styles.atividadesItem} key={avaliacoes.id}>

            <Text style={styles.tituloText}>{avaliacoes.titulo}</Text>

            <Text>Descrição: {avaliacoes.decricao}</Text>

            <Text style={styles.data}>Data de Entrega: {new Date(avaliacoes.date).toLocaleDateString()}</Text>

            <TouchableOpacity style={styles.btn} onPress={() => handleAtividadeClick(avaliacoes.id, avaliacoes.titulo)}>

              <Text style={styles.btn_text}>Ver Avaliação</Text>

            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom:130,
    justifyContent: 'center',
  },
  atividadesItem: {
    flexDirection: 'column',
    backgroundColor: '#f0eded',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#d3d3d3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    padding: 20,
  },
  tituloText:{
    fontWeight: '500',
    fontSize: 16,
    letterSpacing:1,
    textAlign:'center',
    marginBottom: 10,
  },
  texto: {
    fontSize: 20,
    color: '#bfbfbf',
    borderBottomWidth: 2,
    borderBottomColor: '#bfbfbf',
    marginBottom: 20,
  },
  btn:{
    marginTop:10,
    backgroundColor: '#3086ff',
    borderRadius: 50,
    width: 200,
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  btn_text:{

    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold'

  },
  data:{
    marginTop: 10,
    color: '#a1a1a1',
  }
})
