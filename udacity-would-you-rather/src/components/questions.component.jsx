import React from 'react'
import { connect } from "react-redux";
import { _getQuestions } from "../_DATA";
import { questionsGet, addQuestion, answerQuestion } from "../actions/questions";
import {useEffect, useState } from 'react';
import {Tabs, Tab, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

function Questions({ questions, auth, questionsGet, addQuestion, answerQuestion }) {

    const history = useHistory();
    if(auth === null) 
   (history.push('/login'))

    useEffect(() => {
        async function fetchData() {
            const questions = await _getQuestions();
            questionsGet(questions);
          }
        if(!questions)
           fetchData()
        // setNewLoad(false)
    })

    const handleAnswerQuestion  = async (question, option) => {
        console.log({questionID: question.id, answer: option, userID: auth.id});
        await answerQuestion({questionID: question.id, answer: option, userID: auth.id})
    }

    console.log(questions)

  return (

    <div>{
        <Tabs
      defaultActiveKey="unanswer-questions"
      id="answer-unanswer-questions"
      className="mb-3"
    >
      <Tab eventKey="unanswer-questions" title="Unanswer Question">
        { (questions && auth) ?
        Object.values(questions).filter(question => {
            return !question.optionOne.votes.includes(auth.id)
            && !question.optionTwo.votes.includes(auth.id)
        }
            ).map(question => (
            <div className="questions">
                <h3>Would you rather?</h3>
                <div className="">
                    <Button variant='success' size='sm' onClick={()=> history.push(`/questions/${question.id}`)}>Details</Button>
                </div>
                <div className="mb-2 mt-2">
                    <button onClick={() => handleAnswerQuestion(question, 'optionOne')} className='btn btn-primary'>{question.optionOne.text} {question.optionOne.votes.includes(auth.id)? '(my answer)': ''}</button>
                </div>
                <div className="">
                    <button onClick={() => handleAnswerQuestion(question, 'optionTwo')} className='btn btn-primary'>{question.optionTwo.text} {question.optionTwo.votes.includes(auth.id)? '(my answer)': ''}</button>
                </div>
                <hr />
            </div>
        )): null}
      </Tab>
      <Tab eventKey="answered-questions" title="Answered Questions">
      { (questions && auth) &&
        Object.values(questions).filter(question => {
            return question.optionOne.votes.includes(auth.id)
            || question.optionTwo.votes.includes(auth.id)
        }
            ).map(question => (
            <div className="questions">
                <h3>Would you rather?</h3>
                <div className="">
                    <Button variant='success' size='sm' onClick={()=> history.push(`/questions/${question.id}`)}>Details</Button>
                </div>
                <div className="mt-2 mb-2">
                    <button disabled onClick={() => handleAnswerQuestion(question, 'optionOne')} className='btn btn-primary'>{question.optionOne.text} {question.optionOne.votes.includes(auth.id)? '(my answer)': ''}</button>
                </div>
                <div className="">
                    <button disabled onClick={() => handleAnswerQuestion(question, 'optionTwo')} className='btn btn-primary'>{question.optionTwo.text} {question.optionTwo.votes.includes(auth.id)? '(my answer)': ''}</button>
                </div>
                <hr />
            </div>
        ))}
      </Tab>
    </Tabs>
       
        }</div>
  )
}

const mapStateToProps = ({auth, questions}) => {
    return {
        questions,
        auth
    };
};

export default connect(mapStateToProps, { questionsGet, addQuestion, answerQuestion })(Questions)