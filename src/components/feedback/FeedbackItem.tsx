import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedbackItemObject } from "../../lib/types";
import { useState } from "react";

type FeedbackItemProps = {
  feedbackItem: FeedbackItemObject;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.currentTarget.disabled = true;
    setUpvoteCount((prev) => ++prev);
  };

  return (
    <li
      onClick={() => setOpen(!open)}
      key={feedbackItem.id}
      className={`feedback ${open ? "feedback--expand" : ""}`}
    >
      <button onClick={(e) => handleUpvote(e)}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>
        {feedbackItem.daysAgo === 0
          ? "new"
          : `${feedbackItem.daysAgo} days ago`}
      </p>
    </li>
  );
}
