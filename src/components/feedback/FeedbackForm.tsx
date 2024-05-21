import { useState } from "react";
import { MAX_CHARS } from "../../lib/constants";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const charCount = MAX_CHARS - feedback.length;
  const [showValid, setShowValid] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);

  const onAddToList = useFeedbackItemsStore((state) => state.addItemToList);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    e.target.value.length <= MAX_CHARS && setFeedback(e.target.value);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (feedback.includes("#") && feedback.length > 5) {
      setShowValid(true);
      setTimeout(() => setShowValid(false), 2000);
    } else {
      setShowInvalid(true);
      setTimeout(() => setShowInvalid(false), 2000);
      return;
    }

    onAddToList(feedback);
    setFeedback("");
  };

  return (
    <>
      <form
        className={`form ${showValid ? "form--valid" : ""} ${
          showInvalid ? "form--invalid" : ""
        }`}
      >
        <textarea
          value={feedback}
          id="feedback-textarea"
          spellCheck={false}
          onChange={handleChange}
        />
        <label htmlFor="feedback-textarea"></label>
        <div>
          <p className="u-italic">{charCount}</p>
          <button onClick={handleSubmit}>
            <span>Submit</span>
          </button>
        </div>
      </form>
      <p
        className={`u-italic textarea_feedback
          ${
            showValid ? "textarea_valid" : showInvalid ? "textarea_invalid" : ""
          }
        `}
      >
        {showValid
          ? "Thanks for your feedback!"
          : showInvalid
          ? "Please enter a valid feedback message."
          : "Enter your feedback here, remember to #hashtag the company."}
      </p>
    </>
  );
}
