import Image from "next/image";
import Pagination from "./components/Pagination";

export default async function Home({ searchParams }: { searchParams: Promise<{ page: string }> }) {

  return (
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt((await searchParams).page) || 1} />
  );
}
