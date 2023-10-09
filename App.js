import { useState } from 'react'
import { StatusBar, StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import questions from './questions.json'

const questionImages = {
  'q0': require('./assets/questions/q0.gif'),
  'q10': require('./assets/questions/q10.gif'),
  'q11': require('./assets/questions/q11.gif'),
  'q12': require('./assets/questions/q12.gif'),
  'q15': require('./assets/questions/q15.gif'),
  'q17': require('./assets/questions/q17.gif'),
  'q18': require('./assets/questions/q18.gif'),
  'q20': require('./assets/questions/q20.gif'),
  'q21': require('./assets/questions/q21.gif'),
  'q22': require('./assets/questions/q22.gif'),
  'q23': require('./assets/questions/q23.gif'),
  'q24': require('./assets/questions/q24.gif'),
  'q26': require('./assets/questions/q26.gif'),
  'q31': require('./assets/questions/q31.gif'),
  'q36': require('./assets/questions/q36.gif'),
  'q46': require('./assets/questions/q46.gif'),
  'q5': require('./assets/questions/q5.gif'),
  'q8': require('./assets/questions/q8.gif'),
  'q9a0': require('./assets/questions/q9a0.gif'),
  'q9a1': require('./assets/questions/q9a1.gif'),
  'q9a2': require('./assets/questions/q9a2.gif'),
  'q9a3': require('./assets/questions/q9a3.gif'),
}

const AnsweredQuestions = function () {
  this.answered = []

  this.add = (questionKey, answerKey) => {
    this.answered.push({questionKey: questionKey, answerKey: answerKey})
  }

  this.isAnswered = (questionKey) => {
    for (let i in this.answered) {
      if (parseInt(this.answered[i].questionKey) === parseInt(questionKey)) {
        return true
      }
    }
    return false
  }
}
const answeredQuestions = new AnsweredQuestions();

const Answer = function ({answer, correct, answerGiven, selected, onPress}) {
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

  let img = null
  if ('img' in answer) {
    img = questionImages[answer.img]
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
      { img && <Image style={styles.answerImage} source={img} /> }
      { !img && <Text style={[styles.defaultText, styles.answerText]}>{answer.text}</Text> }
      {answerGiven && (selected || correct) && <AntDesign style={[styles.answerIcon, iconStyle]} name={icon} size={14} />}

    </Pressable>
  )
}

const Question = function({question, selectedAnswer, onSelect, onNext}) {
  let img = null
  let textStyle
  if ('img' in question) {
    img = questionImages[question.img]
    textStyle = {flex: 3}
  }

  return (
    <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={[styles.defaultText, styles.questionText, textStyle]}>{question.text}</Text>
          { img && <Image style={styles.questionImage} source={img} />}
        </View>
        <View style={styles.answersContainer}>
          <Text style={[styles.defaultText, {marginBottom: 20}]}>Select one answer</Text>
          <FlatList
            style={styles.answers}
            data={question.answers}
            renderItem={({item}) => <Answer
              answer={item}
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

export default function App() {
  const [question, setQuestion] = useState(questions[0])
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const setNextQuestion = () => {
    for (let i in questions) {
      if (!answeredQuestions.isAnswered(i)) {
        setSelectedAnswer(null)
        setQuestion(questions[i])
        break;
      }
    }
  }

  return (
    <>
      <Question
        question={question}
        selectedAnswer={selectedAnswer}
        onSelect={(answerKey) => {
          if (selectedAnswer === null) {
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
    flex: 2,
    flexDirection: 'row',
    padding: sectionPadding,
  },
  questionText: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  questionImage: {
    justifyContent: 'flex-end',
    flex: 2,
    height: 70,
    resizeMode: 'contain',
  },
  answersContainer: {
    flex: 16,
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
  answerImage: {
    justifyContent: 'flex-start',
    flex: 7,
    height: 40,
    resizeMode: 'contain',
  },
  answerIcon: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,
    width: 24,
    height: 24,
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
