import React from "react";
import TimeAgo from "react-timeago";
import Box from "../Box";
import enStrings from "react-timeago/lib/language-strings/en-short";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

function Threads(props) {
  const formatter = buildFormatter(enStrings);
  const { threads } = props;

  if (!threads.length) {
    return <p>No threads here yet</p>;
  }

  return (
    <>
      <div>
        {threads.map((thread) => {
          return (
            <Thread thread={thread} formatter={formatter} key={thread.id} />
          );
        })}
      </div>
    </>
  );
}

function Thread(props) {
  const { thread, formatter } = props;
  return (
    <div className="thread-box" key={thread.id}>
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

export default Threads;
