import React from 'react'
import { connect } from "react-redux";
import { questionsGet, addQuestion, answerQuestion } from "../actions/questions";
import {useEffect, useState } from 'react';

function LeaderBoard({users}) {

  return (
    <div className="leader-board"> 
    
        <h2 >Leader board</h2>
        <hr className='mb-5'/>
        {Object.values(users).sort((user2, user1) => {
            console.log(user1)
            return (user1.questions.length + Object.keys(user1.answers).length) 
            - (user2.questions.length + Object.keys(user2.answers).length)
        })
        .map(user => (
            <div className='user'>
                <h4>{user.name}</h4>
                <div className="text-center"><img width={50} height={50} src={user.avatarURL} alt="avatar" /></div>
                <div className="">Answer:{Object.keys(user.answers).length}</div>
                <div className="">Question: {user.questions.length}</div>
                <div className="">Total: {user.questions.length + Object.keys(user.answers).length}</div>
                <hr />
            </div>
        ))}
    </div>


  )
}

const mapStateToProps = ({auth, questions, users}) => {
    return {
        questions,
        auth,
        users
    };
};

export default connect(mapStateToProps, { questionsGet, addQuestion, answerQuestion })(LeaderBoard)