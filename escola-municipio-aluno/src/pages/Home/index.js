import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/pt-br';

export default function Home() {
  const [items, setItems] = useState(generateItems());

  function generateItems() {
    const startDate = '2023-11-20';
    const numWeeks = 4;
    const subjects = [
      ['História', 'Português'],
      ['Matemática', 'Geografia'],
      ['Ciências', 'Educação Física'],
    ];

    const newItems = {};

    for (let i = 0; i < numWeeks * 7; i++) {
      const currentDate = moment(startDate).add(i, 'days');
      const formattedDate = currentDate.format('YYYY-MM-DD');

      if (currentDate.isoWeekday() !== 6 && currentDate.isoWeekday() !== 7) {
        const subjectIndex = i % subjects.length;
        const dailySubjects = subjects[subjectIndex];
        newItems[formattedDate] = [
          { name: `Aula de ${dailySubjects[0]}`, time: '7:30 - 9:30' },
          { name: 'Intervalo', time: '9:30 - 10:00' },
          { name: `Aula de ${dailySubjects[1]}`, time: '10:00 - 12:00' },
        ];
      }
    }

    return newItems;
  }

  useEffect(() => {
    moment.locale('pt-br');
  }, []);

  return (
    <View style={styles.container}>
      <Agenda
        style={styles.comunicado}
        items={items}
        renderItem={(item) => (
          <View style={styles.comunicadoItem}>
            <Text>{item.name}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  comunicado: {

  },
  comunicadoItem: {
    backgroundColor: 'lightblue',
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
});

