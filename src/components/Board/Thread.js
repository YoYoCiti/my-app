import { useHistory } from "react-router-dom";
import TimeAgo from "react-timeago";
import styles from "./Board.module.css";
import Badge from "react-bootstrap/Badge";

function Thread(props) {
  const { thread, formatter } = props;
  const history = useHistory();

  function handleClick() {
    history.push(`/board/${thread.id}`);
  }

  return (
    <div className={styles.threadBox} key={thread.id} onClick={handleClick}>
      <div className={styles.threadUser}>
        Posted by <span>{thread.user}&nbsp;</span>
        <TimeAgo
          date={thread.timeDisplay}
          formatter={formatter}
          minPeriod="MINUTE"
          // className={styles.threadTime}
        />{" "}
        ago
      </div>
      <div className={styles.threadTitle}>{thread.title}</div>
      <div className={styles.threadText}>{thread.content}</div>
      {/* <div className={styles.threadTime}>{thread.timeDisplay}</div> */}
      <ul className={styles.displayTag}>
        {thread.tags.map((tag, i) => (
          <li>
            <Badge pill variant="info" className="m-auto" key={tag}>
              {tag}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Thread;
