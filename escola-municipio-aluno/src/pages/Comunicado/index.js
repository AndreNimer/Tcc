import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import api from '../../Api';
import { useToken } from '../../token';

export default function Comunicado() {
  const [comunicado, setComunicado] = useState([]);
  const [polling] = useState(true);
  const { token, id_escola } = useToken();
  const intervalo = useRef(null);

  const getComunicado = async () => {
    try {
      const response = await api.get('/comunicado', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const comunicadoData = response.data;
        const filtrocomunicados = comunicadoData.filter(comunicado => comunicado.escola_id.includes(id_escola))
        setComunicado(filtrocomunicados);
      }
    } catch (error) {
      console.error('Erro ao buscar comunicados:', error);
    }
  };

  useEffect(() => {

    getComunicado();
    intervalo.current = setInterval(() => {
      if (polling) {
        getComunicado();
      }
    }, 5000);
    return () => clearInterval(intervalo.current);

  }, [polling]);

  return (
    <ScrollView style={styles.container}>
      {comunicado.map((comunicados) => (
        <View style={styles.comunicadosItem}>
          <Text style={styles.comunicadostext}><Text style={styles.tituloText}>{comunicados.titulo}:</Text> {comunicados.recado}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  comunicadosItem: {
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
  comunicadostext: {
    color: '#000000',
    fontSize: 16,
    
    letterSpacing: 1,
  },
  tituloText:{
    fontWeight: '500',
  }
});
