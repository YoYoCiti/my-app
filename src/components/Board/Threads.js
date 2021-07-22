import React from "react";
import Thread from "./Thread";
import enStrings from "react-timeago/lib/language-strings/en-short";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

function Threads(props) {
  const formatter = buildFormatter(enStrings);
  const { threads, isVerified, newThreadUser, styles } = props;

  if (!threads.length) {
    return <p>No threads here yet</p>;
  }

  return (
    <>
      <div>
        {threads.map((thread) => {
          return (
            <Thread
              thread={thread}
              formatter={formatter}
              key={thread.id}
              isVerified={isVerified}
              newThreadUser={newThreadUser}
              // styles={styles}
            />
          );
        })}
      </div>
    </>
  );
}

export default Threads;
