import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { FeedbackItemObject } from "../../lib/types";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackList() {
  const { filteredFeedbackItems, isLoading, errorMessage } =
    useFeedbackItemsStore((state) => ({
      filteredFeedbackItems: state.getFilteredFeedbackItems(),
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
    }));

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {filteredFeedbackItems.map((feedbackItem: FeedbackItemObject) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
