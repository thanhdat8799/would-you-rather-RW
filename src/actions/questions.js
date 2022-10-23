export const QUESTION_ADD = 'QUESTION_ADD'
export const QUESTION_GET = 'QUESTION_GET'
export const QUESTION_ANSWER = 'QUESTION_ANSWER'

export function questionsGet(questions) {
    return {
        type: QUESTION_GET,
        questions: questions
    }
}

export function addQuestion(question) {
    return {
        type: QUESTION_ADD,
        question: question
    }
}

export function answerQuestion({ questionID, answer, userID }) {
    return {
        type: QUESTION_ANSWER,
        questionID: questionID,
        answer: answer,
        userID: userID,
    }
}