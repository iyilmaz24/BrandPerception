import HashtagItem from "./HashtagItem";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function HashtagList() {
  const { companyList, handleSelectCompany } = useFeedbackItemsStore(
    (state) => ({
      companyList: state.getCompanyList(),
      handleSelectCompany: state.selectCompany,
    })
  );

  return (
    <ul className="hashtags">
      <li>
        <button onClick={() => handleSelectCompany("")}>View All</button>
      </li>
      {companyList.map((company: string) => (
        <HashtagItem company={company} onSelectCompany={handleSelectCompany} />
      ))}
    </ul>
  );
}
