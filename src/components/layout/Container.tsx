import Header from "./Header";
import FeedbackList from "../feedback/FeedbackList";
import { FeedbackItemObject } from "../../lib/types";

type ContainerProps = {
  feedbackItems: FeedbackItemObject[];
  isLoading: boolean;
  errorMessage: string;
  handleAddToList: (text: string) => void;
};

export default function Container({
  feedbackItems,
  isLoading,
  errorMessage,
  handleAddToList,
}: ContainerProps) {
  return (
    <>
      <main className="container">
        <Header handleAddToList={handleAddToList} />
        <FeedbackList
          feedbackItems={feedbackItems}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </main>
    </>
  );
}
