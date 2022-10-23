import React from 'react'
import { questionsGet, addQuestion, answerQuestion } from "../actions/questions";
import { _saveQuestion } from "../_DATA";
import { useState } from 'react';
import { connect } from "react-redux";

function NewQuestion({auth, addQuestion}) {
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    const handleOptionOneChange = (e) => {
        setOptionOne(e.target.value);
    }

    const handleOptionTwoChange = (e) => {
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
        setOptionOne('');
        setOptionTwo('');
    }
  return (
    <div>
        <h2 className="text-center">Would you rather?</h2>
        <input className="form-control" value={optionOne} required type="text" placeholder='option 1' onChange={handleOptionOneChange}/>
        <input className="form-control" value={optionTwo} required type="text" placeholder='option 2' onChange={handleOptionTwoChange}/>
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