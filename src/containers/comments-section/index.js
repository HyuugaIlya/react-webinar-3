import {
  memo,
  useState
} from 'react';
import CommentArea from '../../components/comments';

function CommentsSection({
  count,
  comments,
  commentsActions
}) {
  const [parent, setParent] = useState(null);

  return <>
    <div style={{ 'padding': '40px' }}>
      <h1>{`Комментарии (${count ? count : 0})`}</h1>
      {comments && comments.map(comment => {
        return <div key={comment._id}>
          {comment.text}
          {parent === comment._id
            ? <CommentArea
              commentsActions={commentsActions}
              parent={parent}
              clear={setParent}
            />
            : <button onClick={() => setParent(comment._id)}>
              Ответить
            </button>}
        </div>
      })}
      {!parent && <CommentArea
        commentsActions={commentsActions}
        parent={parent}
        clear={setParent}
      />}
    </div>
  </>
}

export default memo(CommentsSection);
