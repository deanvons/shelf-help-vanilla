// -> 6 books over 3 pages

// could also be named split or partition or pageSeperate whatevs
export function paginateGross(books, pages) {
  const paginatedArray = [];

  // an array of items to split (items)
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
    if (counter === 2) {
      counter = 0;
      paginatedArray.push(tempArray);
    }
  }

  return paginatedArray;

  // return an array of arrays split by number of pages
}

export function paginate(items, itemsPerPage) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    const start = i * itemsPerPage;
    const end = start + itemsPerPage;
    pages.push(items.slice(start, end));
  }

  return pages;
}

// const paginatedBooks = paginate(bookData, 3) // -> [[book1,book2],[book3,book4],[book5,book6]] :)
