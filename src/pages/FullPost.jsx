import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
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
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Агапочкин Миша",
              avatarUrl: "https://sun3-21.userapi.com/impg/2YGsKlyJHy1DP7_nYcP9qPaiibOwbCEeN3dbWg/xXB280vcd6o.jpg?size=1080x667&quality=96&sign=f95ce2456aca3756155a447f623ecb6a&type=album",
            },
            text: "Это тестовый комментарий #121",
          },
          {
            user: {
              fullName: "Арапов Илюня",
              avatarUrl: "https://sun3-2.userapi.com/impg/By7o7YWoyOOI-uyY9jG5e64HiGj5B11mlmg7ug/c9PvS-gmUDc.jpg?size=1620x2160&quality=96&sign=71bcbcd8011cbb9e1dbb1126450d4502&type=album",
            },
            text:
              "Але",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
