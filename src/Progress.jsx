import React from "react";

const Progress = ({ index, numQuestion }) => {
  return (
    <header className="progress">
      <p>
        Question <strong>{index}</strong> / {numQuestion}
      </p>
    </header>
  );
};

export default Progress;
