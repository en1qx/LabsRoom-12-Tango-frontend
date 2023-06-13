import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();


  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      }).catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, [id]);

  // Получение комментариев
  const [comments, setComments] = React.useState([]);
  const [isCommentsLoading, setCommentsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}/comments`)
      .then((res) => {
        setComments(res.data);
        setCommentsLoading(false);
      }).catch((err) => {
        console.warn(err);
        alert("Ошибка при получении комментариев");
      });
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:4444${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments} isLoading={isCommentsLoading}>
        {/* Block with AddComment with input postId and userId */}
        <AddComment postId={id} userId={data.user._id} />
      </CommentsBlock>
    </>
  );
};
