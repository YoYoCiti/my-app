import { useHistory } from "react-router-dom";
import TimeAgo from "react-timeago";
import styles from "./Board.module.css";

function Comment(props) {
  const { thread, formatter } = props;
  const history = useHistory();

  function handleClick() {
    history.push(`/board/${thread.id}`);
  }

  return (
    <div className={styles.threadBox} key={thread.id} onClick={handleClick}>
      <div className={styles.threadUser}>
        {thread.user}&nbsp;
        <TimeAgo
          date={thread.timeDisplay}
          formatter={formatter}
          minPeriod="MINUTE"
          className={styles.threadTime}
        />{" "}
      </div>
      <div className={styles.threadTitle}>{thread.title}</div>
      <div className={styles.threadText}>{thread.content}</div>
      {/* <div className={styles.threadTime}>{thread.timeDisplay}</div> */}
    </div>
  );
}
export default Comment;
