import { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, Pressable, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const TEST_ANSWERS = [
  {
    text: 'High-sided vehicles',
    correct: false,
  },
  {
    text: 'Cyclists',
    correct: false,
  },
  {
    text: 'Cars',
    correct: true,
  },
  {
    text: 'Motorcyclists',
    correct: false,
  },
];

const Answer = function ({title, correct, answerGiven, selected, onPress}) {
  let backgroundColor = 'white'
  let answerGivenStyle, selectedStyle
  let icon

  if (answerGiven) {
    backgroundColor = (selected || correct) ? 'white' : '#f8f8f8'

    if (selected) {
      selectedStyle = {
        borderWidth: 2,
        padding: styles.answer.padding - 2,
      }

      if (!correct) {
        icon = 'close'
      }
    }

    if (correct) {
      icon = 'check'
    }
  }

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.answer,
        styles.defaultPressable,
        answerGivenStyle,
        selectedStyle,
        {
          backgroundColor: pressed ? '#f8f8f8' : backgroundColor,
        },
      ]}>
      <Text style={[styles.defaultText, styles.answerText]}>{title}</Text>
      {answerGiven && <AntDesign style={styles.answerIcon} name={icon} size={18} color="black" />}

    </Pressable>
  );
};

export default function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.defaultText}>Which vehicles are least likely to be affected by side wind?</Text>
        </View>
        <View style={styles.answersContainer}>
          <Text style={[styles.defaultText, {marginBottom: 20}]}>Select one answer</Text>
          <FlatList
            style={styles.answers}
            data={TEST_ANSWERS}
            renderItem={({item}) => <Answer
              title={item.text}
              correct={item.correct}
              answerGiven={selectedAnswer !== null}
              selected={selectedAnswer === TEST_ANSWERS.indexOf(item)}
              onPress={() => {setSelectedAnswer(TEST_ANSWERS.indexOf(item))}} />}
            />
        </View>
        <View style={styles.navContainer}>
          <Pressable style={[styles.defaultPressable, styles.navButton]}>
            <Text style={[styles.navButtonText, styles.defaultText]}>Next</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const sectionPadding = 20

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 18,
    fontWeight: '500'
  },
  defaultPressable: {
    borderRadius: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  questionContainer: {
    flex: 1,
    padding: sectionPadding,
  },
  answersContainer: {
    flex: 14,
    backgroundColor: '#f1f0f0',
    padding: sectionPadding,
  },
  answers: {
    flex: 1
  },
  answer: {
      flex: 1,
      flexDirection: 'row',
      padding: 20,
      marginBottom: 10,
      backgroundColor: '#fff'
  },
  answerText: {
    flex: 7,
    justifyContent: 'flex-start',
  },
  answerIcon: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  navContainer: {
    flex: 2,
    backgroundColor: '#f1f0f0',
    padding: sectionPadding,
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    color: '#000',
    backgroundColor: '#f8d447',
    borderRadius: 40,
  },
  navButtonText: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
});
