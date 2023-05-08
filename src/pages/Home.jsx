import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);

const isPostsLoading = posts.status === 'loading';
const isTagsLoading = tags.status === 'loading';

React.useEffect(() => {
  dispatch(fetchPosts());
  dispatch(fetchTags());
}, [dispatch]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
        {isPostsLoading ? (
  [...Array(5)].map((_, index) => <Post key={index} isLoading={true} />)
) : (
  posts.items.map((obj) => (
    <Post
      key={obj._id}
      id={obj._id}
      title={obj.title}
      imageUrl={"https://www.interfax.ru/ftproot/photos/photostory/2022/04/29/week/week7_1100.jpg"}
      user={obj.user}
      createdAt={obj.createdAt}
      viewsCount={obj.viewsCount}
      commentsCount={obj.commentsCount}
      tags={obj.tags}
      isEditable
    />
  ))
)}

        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Артем Сумин',
                  avatarUrl: 'https://sun9-7.userapi.com/impg/6gn4oewMz0etn_hHFYgP3PCRCqY5hHugpkSrtA/SBsReRsgxkY.jpg?size=1620x2160&quality=95&sign=d7d3b94e725e6b527985ae5f1e9f2aaf&type=album',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Карпов Матвей',
                  avatarUrl: 'https://sun9-68.userapi.com/impg/EOGJp_64ZdqBQKP05o07KRIPwuKU8x32aP39ow/VV2e9m84kqw.jpg?size=640x640&quality=95&sign=9910b75d03d3959a2775ccd7f09ba0f8&type=album',
                },
                text: 'Я в телевизоре!',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
