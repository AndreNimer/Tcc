import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../Api';
import { useToken } from '../../token';

export default function ContactList() {
  const navigation = useNavigation();
  const [contatos, setContatos] = useState([]);
  const { token, id_aluno, setProfessor } = useToken();

  useEffect(() => {
    const getTurma = async () => {
      try {
        const response = await api.get(`/turmas`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          const turmaData = response.data;
          const professorId = turmaData
            .filter(turma => turma.aluno_id.includes(id_aluno))
            .map(turma => turma.professor_id);
            getProfessores(professorId);
          
        }
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    const getProfessores = async (professorId) => {
      try {
        const response = await api.get(`/professor`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          const professorData = response.data;
          const filteredProfessores = professorData.filter(professor =>
            professorId.includes(professor.id)
          );

          setContatos(filteredProfessores);
        }
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    getTurma();
  }, [token, id_aluno]);

  return (
    <View style={styles.container}>
      {contatos.map((contato) => (
        <TouchableOpacity
          key={setProfessor(contato.id)}
          style={styles.contato}
          onPress={() => {
            navigation.navigate('Chat_txt', {
              contatoName: contato.nome,
            });
          }}
        >
          <Text style={styles.contatoItem}>{contato.nome}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  contato: {
    margin: 10,
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: '#f0eded',
    shadowColor: '#d3d3d3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    padding:20,
  },
  contatoItem:{
    color: '#000000',
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
    letterSpacing: 1,
  },
})
