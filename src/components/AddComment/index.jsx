import React, { useState } from "react";
import axios from '../../axios';

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate, Navigate } from 'react-router-dom';

export const AddComment = ({ postId }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    // С использованием const { data } = await axios.post('/posts/${postId}/comments', fields);
    try {
      const { data } = await axios.post(`/posts/${postId}/comments`, {
        text: comment
      });

      window.location.reload();
    } catch (err) {
      console.warn(err); // Обработка ошибок (можно изменить по своему усмотрению)
      alert("Ошибка при создании статьи")
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={handleCommentChange}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
