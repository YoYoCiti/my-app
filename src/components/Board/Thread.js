import { useHistory } from "react-router-dom";
import TimeAgo from "react-timeago";
import styles from "./Board.module.css";

function Thread(props) {
  const { thread, formatter } = props;
  const history = useHistory();

  function handleClick() {
    history.push(`/board/${thread.id}`);
  }

  return (
    <div className={styles.threadBox} key={thread.id} onClick={handleClick}>
      <div>
        Posted by <span className={styles.threadUser}>{thread.user}&nbsp;</span>
        <TimeAgo
          date={thread.timeDisplay}
          formatter={formatter}
          minPeriod="MINUTE"
          className={styles.threadTime}
        />{" "}
        ago
      </div>
      <div className={styles.threadTitle}>{thread.title}</div>
      <div className={styles.threadText}>{thread.content}</div>
      {/* <div className={styles.threadTime}>{thread.timeDisplay}</div> */}
      <div>tags: {thread.tags.join(", ")}</div>
    </div>
  );
}
export default Thread;
