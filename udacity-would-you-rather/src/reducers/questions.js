import {QUESTION_ADD,
QUESTION_GET,
QUESTION_ANSWER} from '../actions/questions';

const initState = JSON.parse(localStorage.getItem('questions'));

export default function questions(state = initState, action) {
    switch(action.type) {
        case QUESTION_GET: { 
            localStorage.setItem('questions', JSON.stringify(action.questions));
            return questions;
        }
        case QUESTION_ADD: {
            const questions = {
                ...state,
                [action.question.id]: action.question,
              };
              localStorage.setItem(
                'questions',
                JSON.stringify(questions)
              );
              return questions;
        }
        case QUESTION_ANSWER: {
            const questions = {
                ...state,
                [action.questionID]: {
                  ...state[action.questionID],
                  [action.answer]: {
                    ...state[action.questionID][action.answer],
                    votes: state[action.questionID][action.answer].votes.concat(action.userID)
                  },
                },
              };
              localStorage.setItem(
                'questions',
                JSON.stringify(questions)
              );
              return questions;
        }
        default:
            return state
    }
}