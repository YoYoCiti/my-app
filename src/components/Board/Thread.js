import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

function Thread(props) {
  const { thread, formatter } = props;
  return (
    <div className="thread-box" key={thread.id}>
      <Link to={`/board/${thread.id}`}> Click me </Link>
      <div>
        <span className="thread-user">{thread.user}&nbsp;</span>
        <TimeAgo
          date={thread.createdAt}
          formatter={formatter}
          minPeriod="MINUTE"
          className="thread-time"
        />
      </div>
      <div className="thread-title">{thread.title}</div>
      <div className="thread-text">{thread.content}</div>
      <div className="thread-time">{thread.createdAt}</div>
    </div>
  );
}

export default Thread;
