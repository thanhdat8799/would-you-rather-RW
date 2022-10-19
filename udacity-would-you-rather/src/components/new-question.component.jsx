import React from 'react'
import { questionsGet, addQuestion, answerQuestion } from "../actions/questions";
import { _saveQuestion } from "../_DATA";
import {useEffect, useState } from 'react';
import { connect } from "react-redux";
import {Tabs, Tab, Button} from 'react-bootstrap';

function NewQuestion({auth, addQuestion}) {
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    const handleOptionOneChange = (e) => {
        console.log(e.target.value);
        setOptionOne(e.target.value);
    }

    const handleOptionTwoChange = (e) => {
        console.log(e.target.value);
        setOptionTwo(e.target.value);
    }

    const handleSubmit = async () => {
        const question = {
            author: auth.id,
            optionOneText: optionOne,
            optionTwoText: optionTwo
        };
        const res = await _saveQuestion(question);
        addQuestion(res);
    }
  return (
    <div>
        <h2 className="text-center">Would you rather?</h2>
        <input className="form-control" required type="text" placeholder='option 1' onChange={handleOptionOneChange}/>
        <input className="form-control" required type="text" placeholder='option 2' onChange={handleOptionTwoChange}/>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={optionOne === '' || optionTwo === ''}>Submit</button>
    </div>
  )
}

const mapStateToProps = ({auth, questions}) => {
    return {
        questions,
        auth
    };
};

export default connect(mapStateToProps, { questionsGet, addQuestion, answerQuestion })(NewQuestion)