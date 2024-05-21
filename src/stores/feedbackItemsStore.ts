import { create } from "zustand";
import { FeedbackItemObject } from "../lib/types";

type Store = {
  feedbackItems: FeedbackItemObject[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;

  addItemToList: (text: string) => void;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => void;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => FeedbackItemObject[];
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",

  addItemToList: (text: string) => {
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

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

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
  },

  selectCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },

  fetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      set(() => ({ feedbackItems: data.feedbacks }));
    } catch (error) {
      set(() => ({ errorMessage: "Something went wrong!" }));
    }
    set(() => ({ isLoading: false }));
  },

  getCompanyList: () => {
    return get()
      .feedbackItems.map((item: FeedbackItemObject) => item.company)
      .filter((company: string, index: number, array: string[]) => {
        return array.indexOf(company) === index;
      });
  },

  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedbackItem: FeedbackItemObject) =>
            feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
}));
