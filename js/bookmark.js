const bmForm = document.querySelector(".bookmark_form"),
    nameInput = bmForm.querySelector(".bookmark_input_title"),
    urlInput = bmForm.querySelector(".bookmark_input_url"),
    bmSubmit = bmForm.querySelector(".bookmark_submit_btn"),
    bmListBtn = bmForm.querySelector(".bookmark_list_open");
const bmSuccessMsg = document.querySelector(".bookmark_success_msg"),
    bmMsgExit = bmSuccessMsg.querySelector(".success_msg_exit");
const bookmarksList = document.querySelector(".bookmarks_list"),
    bmListExit = bookmarksList.querySelector(".bookmarks_list_exit"),
    bmListWrap = bookmarksList.querySelector(".bookmarks_list_wrap");

const BOOKMARK_LS = "Bookmarks"
let bookmarks = []

function hideMsg(e) {
    bmSuccessMsg.classList.add("hidden");
    e.preventDefault();
}

function saveBookmark(bookmark) {

    // important!!!
    // get current data from localStorage & send new data to localStorage
    const loadedBookmark = localStorage.getItem(BOOKMARK_LS);
    if (loadedBookmark === null) {
        bookmarks.push(bookmark);
        localStorage.setItem(BOOKMARK_LS, JSON.stringify(bookmarks));
    } else {
        bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_LS));
        bookmarks.push(bookmark);
        localStorage.setItem(BOOKMARK_LS, JSON.stringify(bookmarks));
    }

    // msgBox of successful saving
    bmSuccessMsg.classList.remove("hidden");
    bmMsgExit.addEventListener("click", hideMsg);

    loadBookmark();
}

function submitHandler(e) {
    const siteName = nameInput.value;
    const siteUrl = urlInput.value;

    // important!!!
    // bookmarks list setting
    const loadedBookmark = localStorage.getItem(BOOKMARK_LS);
    if (loadedBookmark === null) {
        bookmarks = bookmarks;
    } else {
        bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_LS));
    }

    bookmark = {
        index : bookmarks.length + 1,
        sitename : siteName,
        siteurl : siteUrl
    }
    saveBookmark(bookmark);

    bmForm.reset();
    e.preventDefault();
}

function hideBookmarks(e) {
    bookmarksList.classList.add("hidden");
    e.preventDefault();
}

function openBookmarks(e) {
    bookmarksList.classList.remove("hidden");
    bmListExit.addEventListener("click", hideBookmarks);
    e.preventDefault();
}

function delBookmark(e) {
    const targetList = e.target.parentNode;
    const parsedBookmark = JSON.parse(localStorage.getItem(BOOKMARK_LS));
    // console.log(typeof targetList.id); >> string
    // console.log(typeof parsedBookmark[0].index); >> number

    const filteredBookmark = parsedBookmark.filter(bookmark => {
        return bookmark.index !== parseInt(targetList.id);
    })

    console.log(filteredBookmark)
    
    bookmarks = filteredBookmark;
    console.log(bookmarks)
    localStorage.setItem(BOOKMARK_LS, JSON.stringify(bookmarks));
    loadBookmark();
    // console.log(bookmarks);
}

function fetchBookmark(loadedBookmark) {

    const parsedBookmark = JSON.parse(loadedBookmark);

    for (let i = 0; i < parsedBookmark.length; i++) {
        const bookmarkLi = document.createElement("li");
        const nameSpan = document.createElement("span");
        const delBtn = document.createElement("a");
        const visitBtn = document.createElement("a");
        const listIndex = parsedBookmark[i].index;

        bmListWrap.appendChild(bookmarkLi);
        bookmarkLi.appendChild(visitBtn);
        bookmarkLi.appendChild(delBtn);
        bookmarkLi.appendChild(nameSpan);

        bookmarkLi.id = listIndex;
        nameSpan.innerHTML = parsedBookmark[i].sitename;
        visitBtn.innerHTML = "VISIT";
        visitBtn.classList.add("bm-visitBtn");
        visitBtn.href = `${parsedBookmark[i].siteurl}`;
        delBtn.innerHTML = "DELETE";
        delBtn.classList.add("bm-delBtn");
        delBtn.addEventListener("click", delBookmark);
    }
}

function loadBookmark() {
    const loadedBookmark = localStorage.getItem(BOOKMARK_LS);
    if (loadedBookmark === null) {
        bmListWrap.innerHTML = `<div class="no-bookmark">Nothing saved <i class="far fa-frown"></i><div>`;
    } else {
        bmListWrap.innerHTML = "";
        fetchBookmark(loadedBookmark);
    }
}

function init() {
    loadBookmark();
    bmSubmit.addEventListener("click", submitHandler);
    bmListBtn.addEventListener("click", openBookmarks);
}

init();