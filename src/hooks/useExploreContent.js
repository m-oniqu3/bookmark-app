import useExplore from "./useExplore";

const useExploreContent = () => {
  //custom hook to fetch books
  const romance = useExplore("Romance");
  const spice = useExplore("spice");
  const tiktok = useExplore("Tiktok");
  const easyReads = useExplore("Easy Reads");
  const fiction = useExplore("Fiction");
  const fantasy = useExplore("Fantasy");

  //array with results from useExplore hook
  const contents = [
    { title: "Romance", books: romance, link: "romance" },
    { title: "BookTok Sensations", books: tiktok, link: "booktok" },
    { title: "Add a little bit of Spice", books: spice, link: "spice" },
    { title: "Fantasy", books: fantasy, link: "fantasy" },
    { title: "Fiction", books: fiction, link: "fiction" },
    { title: "Read in a day", books: easyReads, link: "easy-reads" },
  ];
  return contents;
};

export default useExploreContent;
