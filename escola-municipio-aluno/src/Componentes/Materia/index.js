import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Notas_Faltas } from '../../Componentes';
import { AntDesign } from '@expo/vector-icons';
import api from '../../Api';
import { useToken } from '../../token';

export default function Materia({ color }) {
  const [statusVisible, setStatusVisible] = useState(false);
  const [materias, setmaterias] = useState([]);
  const { token, id_aluno, setMateria} = useToken();

  const handleButtonClick = (materiaId) => {
    setMateria(materiaId)
    setStatusVisible((prevStatus) => ({
      ...prevStatus,
      [materiaId]: !prevStatus[materiaId],
    }));
  };
  const getmateria= async () => {
    try {
      const response = await api.get('/materias',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        
        const materiaData = response.data
        const filtromateria = materiaData.filter(materias => materias.aluno_id === id_aluno)
        console.log(filtromateria)
        setmaterias(filtromateria)
      }
    } catch (error) {
      console.error('Erro ao buscar materias:', error);
    }
  };

  useEffect(() => {
    getmateria();
  }, []);
  return (
    <View>
      {materias.map((materia) => (
        <View>
         <TouchableOpacity
            style={[styles.btn,{backgroundColor: color,}]}
            onPress={() => handleButtonClick(materia.id)}
          >
            <Text style={styles.btn_text}>{materia.nome}</Text>
            {statusVisible[materia.id] ? (
              <AntDesign name="downcircleo" size={24} color='#212121' />
            ) : (
              <AntDesign name="upcircleo" size={24} color='#212121' />
            )}
          </TouchableOpacity>

          {statusVisible[materia.id] && (
            <Animatable.View
              animation="fadeIn"
              duration={700}
              style={{ opacity: 1, marginTop: -20, marginBottom:20, paddingStart:10, paddingEnd:10, }}
            >
              <Notas_Faltas />
            </Animatable.View>
          )}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 60,
    borderRadius: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#d3d3d3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    
  },
  btn_text: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    letterSpacing: 1,
  },
});
