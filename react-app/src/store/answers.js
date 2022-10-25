/******** Constants ********/
export const GET_USER_ANSWERS = 'answers/load';
export const CREATE_ANSWER = 'answers/create'
export const EDIT_ANSWER = 'answers/update';
export const DELETE_ANSWER = 'answers/remove';

/******** Actions ********/
const getUserAnswers = (answers) => ({
    type: GET_USER_ANSWERS,
    payload: answers
})

const createAnswer = (answer,questionId) => ({
    type: CREATE_ANSWER,
    payload: {
        answer,
        questionId
    }
});

const editAnswer = (answer) => ({
    type: EDIT_ANSWER,
    payload: answer
  });


const deleteAnswer = (id) => ({
    type: DELETE_ANSWER,
    payload: id
});

/******** Thunks ********/

export const fetchGetUserAnswers = () => async (dispatch) => {
    let response;
    response = await fetch('/api/users/answers');

    if(response.ok){
        const answers = await response.json();
        dispatch(getUserAnswers(answers));
    };
 
}

export const fetchCreateAnswer = (answer,questionId) => async (dispatch) => {
    let response;
    response = await fetch(`/api/questions/${questionId}/answers`,
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answer)
      }
    );

    if(response.ok){
        const answer = await response.json();
        dispatch(createAnswer(answer,questionId));
    };
 
}


export const fetchEditAnswer =  (answer,answerId) => async (dispatch) => {
    let response;
    response = await fetch(`/api/answers/${answerId}`,
    {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answer)
      }
    );

    if(response.ok){
        const answer = await response.json();
        dispatch(editAnswer(answer));
    };
}


export const fetchDeleteAnswer =  () => async (dispatch) => {
    let response;
    response = await fetch('/api/users/answers');

    if(response.ok){
        const answer = await response.json();
        dispatch(deleteAnswer(answer.id));
    };
}

/******** Reducer ********/
const initialState = {};

const answersReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type){
        case GET_USER_ANSWERS:
            action.payload.forEach(answer => {
                newState[answer.id] = answer;
            });
            return newState;
        case CREATE_ANSWER:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState;
        case EDIT_ANSWER:
            newState = action.payload
            return newState;
        case DELETE_ANSWER:
            delete newState[action.payload];
            return newState;
        default:
            return newState;
    }
}

export default answersReducer;