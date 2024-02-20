# Shelf Help

## Overview

Shelf Help is a web-based application designed to offer users a convenient way to explore, filter, and manage a personal collection of books. Leveraging a local JSON server, Shelf Help provides an interactive interface for users to browse books, add them to their collection, and view detailed information about each title. 

## Features

- **Browse Books**: Users can explore a list of books available on the Shelf Help platform.
- **Book Details**: Clicking on a book displays detailed information about the book, including a blurb, author, and cover image.
- **Filter by Author**: Users can filter the list of books based on the author.
- **Pagination**: The book list supports pagination, allowing users to navigate through pages of books.
- **User Collection**: Registered users can add books to their personal collection and view this collection at any time.
- **User Registration and Login**: New users can register, and existing users can log in to access personalized features.

## Technologies Used

- **HTML/CSS**: For structuring and styling the application's interface.
- **Vanilla JavaScript**: For client-side logic, including DOM manipulation and fetch API requests to interact with the JSON server.
- **JSON Server**: Serves as a mock backend to simulate CRUD operations on a database of books and users.

## Setup and Running Locally

### Prerequisites

- Node.js and npm installed on your machine
- JSON Server -> repo link: https://gitlab.com/noroff-accelerate/javascript/projects/shelf-help-json-server.git

### Installation
1. Start JSON Server on port 3000 (if you haven't already).
2. Clone the repository to your local machine.
3. Navigate to the project directory.


### Running the Application

Open the `index.html` file in a browser to view the application. Ensure the JSON server (port 3000) is running in the background to fetch and manage the data.

## Contributing

Contributions to Shelf Help are welcome! Please refer to the project's issues tracker to propose bug fixes or features, or to discuss potential changes.

## License

Specify the license under which your project is released, if applicable.
