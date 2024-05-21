import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import HashtagList from "./components/hashtag/HashtagList";
import { useEffect, useState, useMemo } from "react";
import { FeedbackItemObject } from "./lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredFeedbackItems: FeedbackItemObject[] = useMemo(() => {
    return selectedCompany
      ? feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === selectedCompany
        )
      : feedbackItems;
  }, [selectedCompany, feedbackItems]);

  const companyList = feedbackItems
    .map((item) => item.company)
    .filter((company, index, array) => {
      return array.indexOf(company) === index;
    });

  const handleAddToList = (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.startsWith("#"))!
      .slice(1);

    const newItem: FeedbackItemObject = {
      id: new Date().getTime(),
      upvoteCount: 0,
      daysAgo: 0,
      text: text,
      company:
        companyName[0].toUpperCase() + companyName.substring(1).toLowerCase(),
      badgeLetter: companyName[0].toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);

    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleSelectCompany = (company: string) => setSelectedCompany(company);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong!");
      }
      setIsLoading(false);
    };
    fetchFeedback();
  }, []);

  return (
    <div className="app">
      <Footer />

      <Container
        feedbackItems={filteredFeedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />

      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
