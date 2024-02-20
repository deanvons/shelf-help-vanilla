export function paginate(books, pages) {
  const paginatedArray = [];
  const booksPerPage = books.length / pages;

  let counter = 0;
  let tempArray = [];
  for (const book of books) {
    if (counter === 0) {
      tempArray = [];
    }
    if (counter === 0 || counter === 1) {
      tempArray.push(book);
      counter++;
    }
    if (counter === booksPerPage) {
      counter = 0;
      paginatedArray.push(tempArray);
    }
  }
  return paginatedArray;
}

export function paginateAlt(items, itemsPerPage) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    const start = i * itemsPerPage;
    const end = start + itemsPerPage;
    pages.push(items.slice(start, end));
  }

  return pages;
}