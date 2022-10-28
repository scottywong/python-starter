import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Answer from '../Answer';
import './AnswerList.css'

function AnswerList({answerList, refreshQuestion}) {

    return (
        <div className="answerList-container">
            
        <div className="answerList-size">
            <h4>{answerList?.length} Answers</h4>
        </div>
        { answerList && 
        answerList.map(answer => {
            return <Answer answer={answer} refreshQuestion={refreshQuestion}> </Answer>
        })} 
        </div>
    )

}

export default AnswerList;
