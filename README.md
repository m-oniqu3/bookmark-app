# Bookmark

## Bookmark | Your Online Bookshelf

Keep track of the books you've read and the books you want to read.
Bookmark is a bookmarking application that allows readers to create an online bookshelf, to help track and organize their books/reads in a central location.

![Screenshot of the home page](/src/images/home_screenshot.png)
![Screenshot of the shelves page](/src/images/shelf_screenshot.png)
![Screenshot of the book details page](/src/images/details_screenshot.png)

## Description

Bookmark is a bookmarking application, made for avid readers, that allows them to create their online bookshelf. The aim of Bookmark is to help readers and other book enthusiasts, track and organize their reads in a central location online. Users can search for authors and their books and add them to their library in the desired catetory : **To Be Read, In Progress, Completed or Did Not Finish**. They can also add books to shelves that they create. For e.g. **Romance, Favourites, Mystery, Spice**.

Bookmark uses Firebase and consumes their Authentication and Database services. This enables users to login with their google account and save and access their data in realtime. Once logged in, users can start adding to their library.

## Motivation

As an avid reader, I found it difficult to keep track of all my books, book recommendations or reading lists, since I just kept a list in my notes app or I scribbled it on whatever I could find nearby. This method was not effective as it was unorganized and unreliable. It became clear to me that I needed an easier, more functional way to organize all my reads, and so I created Bookmark with the aim of solving this problem.

## Tools and Technologies

Bookmark was built using

- React
- React Router, React Router Hash Link
- Redux Toolkit
- RTK Query
- Firebase
- Google Books API
- React Toastify

## Design File

[Figma Design File](https://www.figma.com/file/0eYLSHNLF34xLK4aJSli4M/Bookmarked?node-id=0%3A1)

## Features

Bookmark allows its users to:

- [x] Sign in and sign out
- [x] Search for books
- [x] View books on explore page
- [x] Get information on books
- [x] Add a book to the library
- [x] Move book to a different category in the library
- [x] Remove a book from the library
- [x] Create custom shelves
- [x] Add books to custom shelves
- [x] View books on custom shelves
- [x] Remove books from custom shelves
- [x] Edit custom shelves
- [x] Delete custom shelves
- [x] Save their data

## How to use BookMark

### **Library**

#### Adding a Book to the Library

- Search for a book or an author or visit the explore page.
- From the results, click on the book you want to add to your library, and click on the **Add to Library** button. Choose the desired category for the book. This will add the book to your library.

#### Moving a Book to a Different Category

- Books in the library can only be added to one category: **To Be Read, In Progress, Completed or DNF**. If you want to move a book to a different category, you can click on the **Add to Library** button again and choose the desired category.
- If you want more details about the book, click on the book and then click on the **Details & More** button. This will show you more information about the book.

#### Removing a Book from the Library

- To remove a book from the library, visit any of the categories in the library: **All, To Be Read, In Progress, Completed or DNF**. Hover over the book and click on the **bookmark** icon. This will remove the book from the library. If the book is on a shelf, it will also be removed from the shelf.

### **Shelves**

You can also add a book to a custom shelf. Custom shelves are created by you. They allow you to have more control over your books. You can create a maximum of 15 shelves. Books in the library will be automatically added to the shelves page. Only books that are in the library can be added to a shelf.

#### Creating a Custom Shelf

- First, visit the shelves page. On the shelves page, click on the **Add Icon** and create a new shelf.

#### Adding a Book to a Shelf

- First add the book to your library. Too see all the books available to add to a shelf, click on the **Books** tab.
- To add a book to a shelf, click on the book you want to add to the shelf and choose from the list of shelves you created. This will add the book to the shelf. If a book is already in the shelf, the shelf name will be dark blue.

#### Removing a Book from a Shelf

- To remove a book from a shelf, click on the book you want to remove from the shelf and choose from the list of shelves you created. Shelf names will be dark blue if the book is in the shelf. Click on dark blue shelf names to remove the book from the shelf.

#### Renaming a Shelf

- To rename a shelf, right click on the shelf name and then click on the **Rename Shelf** button. This will open a modal with the current name of the shelf. You can change the name of the shelf. All the books on the old shelf will be moved to the new shelf.

#### Removing a Shelf

- To remove a shelf, right click on the shelf name and then click on the **Remove Shelf** button. This will open a modal with the current shelf. You can delete the shelf. All the books on the shelf will be removed from that shelf.

## Installation

To install and run the project locally, download/clone the repo and run the following commands:

```bash
npm install
npm start
```

This runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
