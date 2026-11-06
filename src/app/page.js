import Banner from "@/components/banner";
import HowBorrowingWorks from "@/components/howBrowingWorks";
import NewArrivalPage from "@/components/new-arrival";
import TopCategories from "@/components/topCategories";

export default function Home() {
  return (
    <div>
      <Banner />
      <NewArrivalPage/>
      <HowBorrowingWorks />
      <TopCategories/>
   </div>
  );
}
