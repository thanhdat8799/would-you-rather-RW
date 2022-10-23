import {QUESTION_ADD,
QUESTION_GET,
QUESTION_ANSWER} from '../actions/questions';

const initState = null;

export default function questions(state = initState, action) {
    switch(action.type) {
        case QUESTION_GET: {
          const questions = {
            ...state,
            ...action.questions
          } 
            return questions;
        }
        case QUESTION_ADD: {
          const questions = {
            ...state,
            [action.question.id]: action.question,
          };
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
              return questions;
        }
        default:
            return state
    }
}