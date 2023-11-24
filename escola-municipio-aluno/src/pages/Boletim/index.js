import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Materia } from '../../Componentes';

export default function Boletim() {
  return ( 
    <ScrollView style={{backgroundColor:'#ffffff'}}>
      <View style={styles.container}>
        <Materia color='#f0eded' /> 
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    padding: 40,
    justifyContent:'center',
  },
});
