export const getGenreColor = (genre: string) => {
  const colors = {
    SCIENCE: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    FANTASY:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    FICTION:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    NON_FICTION:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  };
  return (
    colors[genre as keyof typeof colors] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  );
};
