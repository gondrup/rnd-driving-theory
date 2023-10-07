import { useState } from 'react'
import { StatusBar, StyleSheet, Text, View, FlatList, Pressable, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import questions from './questions.json'

const Answer = function ({title, correct, answerGiven, selected, onPress}) {
  let backgroundColor = 'white'
  let answerGivenStyle, selectedStyle
  let icon, iconStyle = {}

  if (answerGiven) {
    backgroundColor = (selected || correct) ? 'white' : '#f8f8f8'

    if (selected) {
      selectedStyle = {
        borderWidth: 2,
        padding: styles.answer.padding - 2,
      }

      if (!correct) {
        icon = 'close'
        iconStyle.backgroundColor = '#ff716a'
        iconStyle.color = '#fff'
      }
    }

    if (correct) {
      icon = 'check'
      iconStyle.backgroundColor = '#ffcc00'
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
      {answerGiven && (selected || correct) && <AntDesign style={[styles.answerIcon, iconStyle]} name={icon} size={14} />}

    </Pressable>
  );
};

// 1. Move the <View> from App into it's own component
// 2. Remove the [selectedAnswer, setSelectedAnswer] state and use a prop instead based on the overall progress of answers (new parent object)

export default function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.defaultText}>{questions[0].text}</Text>
        </View>
        <View style={styles.answersContainer}>
          <Text style={[styles.defaultText, {marginBottom: 20}]}>Select one answer</Text>
          <FlatList
            style={styles.answers}
            data={questions[0].answers}
            renderItem={({item}) => <Answer
              title={item.text}
              correct={questions[0].correctAnswer === questions[0].answers.indexOf(item)}
              answerGiven={selectedAnswer !== null}
              selected={selectedAnswer === questions[0].answers.indexOf(item)}
              onPress={() => {selectedAnswer === null && setSelectedAnswer(questions[0].answers.indexOf(item))}} />}
            />
        </View>
        <View style={styles.navContainer}>
          {selectedAnswer !== null && <Pressable style={[styles.defaultPressable, styles.navButton]}>
            <Text style={[styles.navButtonText, styles.defaultText]}>Next</Text>
          </Pressable>}
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
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,
    width: 24,
    fontWeight: 800,
    margin: 0,
    backgroundColor: '#f1f0f0',
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
