import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

export default async function Home() {

  return (
    <LatestIssues />
  );
}
