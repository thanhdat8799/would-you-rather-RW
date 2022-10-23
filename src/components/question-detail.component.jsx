import React from 'react';
import { questionsGet, addQuestion, answerQuestion } from "../actions/questions";
import {useEffect, useState } from 'react';
import { connect } from "react-redux";
import {useParams, } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import PageNotFound from './page-not-found.component';
import { _getQuestions, _saveQuestionAnswer } from '../_DATA'


function QuestionDetail({auth, questions, questionsGet, users, answerQuestion}) {
    
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            const questions = await _getQuestions();
            questionsGet(questions);
        }
        console.log(questions)
        if(questions === null)
           fetchData()
        
    })
    const question = questions ? questions[params.id] : null;
    console.log(question)
    const [isQuestionAnswered, setIsQuestionAnswer] = useState(question?.optionOne.votes.includes(auth.id)
    || question?.optionTwo.votes.includes(auth.id));
    if(!question) {
            return (<PageNotFound/>)
    }

    const handleAnswerQuestion  = async (question, option) => {
        console.log({questionID: question?.id, answer: option, userID: auth?.id});
        const res = await answerQuestion({questionID: question.id, answer: option, userID: auth.id})
        await _saveQuestionAnswer({ authedUser: auth.id, qid: question.id, answer: option })
        setIsQuestionAnswer(res ? true : false)
    }


    

    const voteSummary = (option) => {
        const numOfVotes = question[option].votes.length;
        const totalVotes = question['optionOne'].votes.length + question['optionTwo'].votes.length
        const percent = Math.floor((numOfVotes / totalVotes)*100);
        const summary = `(${percent}%) ${numOfVotes} votes out of ${totalVotes}`
        return summary
    }

    if(!question) {
                return (<PageNotFound/>)
    } else {
        return (
            <div>
                <Row>
                    <Col sm={5}>
                        <img width={50} height={50} src={users[question.author].avatarURL} alt="" />
                        <h3>Asked by {users[question.author].name}</h3>
                    </Col>
                    <Col sm={7}>
                        <h3>Would you rather?</h3>
                        <div className="option-one">
                            <button disabled={isQuestionAnswered} onClick={() => handleAnswerQuestion(question, 'optionOne')} className='btn btn-primary'>{question.optionOne.text} {question.optionOne.votes.includes(auth.id)? '(my answer)': ''}</button>
                            {isQuestionAnswered ? (
                                <div className="vote-summary">{voteSummary('optionOne')}</div>
                            ) : null}
                        </div>
                        <div className="option-two">
                            <button disabled={isQuestionAnswered} onClick={() => handleAnswerQuestion(question, 'optionTwo')} className='btn btn-primary'>{question.optionTwo.text} {question.optionTwo.votes.includes(auth.id)? '(my answer)': ''}</button> 
                            {isQuestionAnswered ? (
                                <div className="vote-summary">{voteSummary('optionTwo')}</div>
                            ) : null}
                        </div>

                    </Col>
                </Row>
                <hr />
            </div>
    )}
}

const mapStateToProps = ({auth, questions, users}) => {
    return {
        questions,
        auth, 
        users
    };
};


export default connect(mapStateToProps,  { questionsGet, addQuestion, answerQuestion })(QuestionDetail)