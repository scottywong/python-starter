import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Modal } from '../../../context/Modal';
import { fetchDeleteQuestions } from '../../../store/questions';
import QuestionEditForm from '../QuestionEditForm';
import AnswerCreateForm from '../../Answers/AnswerCreateForm';
import './Question.css';
import QuestionDelete from '../QuestionDelete';

function Question({ question, refreshQuestion }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  const sessionUser = useSelector(state => state.session.user); 
  const isOwner = sessionUser.id === question?.userId;

  return (
    <div className='q-container'>
      <h4>{question?.title}</h4>
      <p>{question?.body}</p>
      <div className='q-actions-container'>
        {isOwner && <button onClick={() => setShowEditModal(true)}>Edit Question</button>}
        {showEditModal && (
          <Modal onClose={() => setShowEditModal(false)}>
            <QuestionEditForm setShowEditModal={setShowEditModal} question={question} refreshQuestion={refreshQuestion}/>
          </Modal>
        )}
        {isOwner && <button onClick={() => setShowDeleteModal(true)}>Delete Question</button> }
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <QuestionDelete setShowDeleteModal={setShowDeleteModal} questionId={question?.id} refreshQuestion={refreshQuestion}/>
          </Modal>
        )}
        <button onClick={() => setShowAnswerModal(true)}>Post Answer</button>
        {showAnswerModal && (
          <Modal onClose={() => setShowAnswerModal(false)}>
            <AnswerCreateForm setShowAnswerModal={setShowAnswerModal} refreshQuestion={refreshQuestion} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Question;
