import { Search } from "../_components/search/Search";

type Props = {};

export default function page(props: Props) {

  // const updateQueryParam = (key: string, value: string) => {
  //   const currentParams = new URLSearchParams(searchParams.toString());
  //   currentParams.set(key, value);
  //   router.replace(`?${currentParams.toString()}`, { scroll: false });
  // };

  

  return (
    <Search />
  );
}
