import { useState } from 'react'
import { StatusBar, StyleSheet, Text, View, FlatList, Pressable, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import questions from './questions.json'

const AnsweredQuestions = function () {
  this.answered = []

  this.add = (questionKey, answerKey) => {
    this.answered.push({questionKey: questionKey, answerKey: answerKey})
  }

  this.isAnswered = (questionKey) => {
    for (let i in this.answered) {
      console.log('|_ question ' + questionKey + ' ?........')
      if (parseInt(this.answered[i].questionKey) === parseInt(questionKey)) {
        console.log('|_ question ' + questionKey + ' is answered')
        return true
      }
    }
    return false
  }
}
const answeredQuestions = new AnsweredQuestions();

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
  )
}

const Question = function({question, selectedAnswer, onSelect, onNext}) {
  return (
    <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.defaultText}>{question.text}</Text>
        </View>
        <View style={styles.answersContainer}>
          <Text style={[styles.defaultText, {marginBottom: 20}]}>Select one answer</Text>
          <FlatList
            style={styles.answers}
            data={question.answers}
            renderItem={({item}) => <Answer
              title={item.text}
              correct={question.correctAnswer === question.answers.indexOf(item)}
              answerGiven={selectedAnswer !== null}
              selected={selectedAnswer === question.answers.indexOf(item)}
              onPress={() => {onSelect(question.answers.indexOf(item))}} />}
            />
        </View>
        <View style={styles.navContainer}>
          {selectedAnswer !== null && <Pressable 
            style={[styles.defaultPressable, styles.navButton]} 
            onPress={onNext}>
              <Text style={[styles.navButtonText, styles.defaultText]}>Next</Text>
          </Pressable>}
        </View>
      </View>
  )
}

// 1. Move the <View> from App into it's own component
// 2. Remove the [selectedAnswer, setSelectedAnswer] state and use a prop instead based on the overall progress of answers (new parent object)

export default function App() {
  const [question, setQuestion] = useState(questions[0])
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const setNextQuestion = () => {
    console.log('setting next question')

    for (let i in questions) {
      console.log('question ' + i + ' ?...')
      if (!answeredQuestions.isAnswered(i)) {
        console.log('setting question ' + i)
        setSelectedAnswer(null)
        setQuestion(questions[i])
        break;
      } else {
        console.log('not setting question ' + i + ' already answered')
      }
    }
  }

  return (
    <>
      <Question
        question={question}
        selectedAnswer={selectedAnswer}
        onSelect={(answerKey) => {
          console.log('selected answer ' + answerKey)
          if (selectedAnswer === null) {
            console.log('not already selected, setting selected answer ' + answerKey)
            setSelectedAnswer(answerKey)
            answeredQuestions.add(questions.indexOf(question), answerKey)
          }
        }}
        onNext={setNextQuestion}
      />
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
