const bmForm = document.querySelector(".bookmark_form"),
    nameInput = bmForm.querySelector(".bookmark_input_title"),
    urlInput = bmForm.querySelector(".bookmark_input_url"),
    bmSubmit = bmForm.querySelector(".bookmark_submit_btn"),
    bmListBtn = bmForm.querySelector(".bookmark_list_open");
const bookmarksList = document.querySelector(".bookmarks_list"),
    bmListExit = bookmarksList.querySelector(".bookmarks_list_exit"),
    bmListWrap = bookmarksList.querySelector(".bookmarks_list_wrap"),
    noBookmark = bookmarksList.querySelector(".no-bookmark");
    
const BOOKMARK_LS = "Bookmark";
let bookmarks = [];

function validateForm(sitename, siteurl) {
    if (!sitename || !siteurl) {
        alert("Please fill in the form");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteurl.match(regex)) {
        alert("Please use a valid URL");
        return false;
    }

    return true;
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

function saveBookmark(bookmarks) {
    localStorage.setItem(BOOKMARK_LS, JSON.stringify(bookmarks));
}

function delBookmark(e) {
    const targetLi = e.target.parentNode;
    bmListWrap.removeChild(targetLi);

    // console.log(typeof bookmarks[0].index); >> number
    // console.log(typeof targetLi.id) >> string

    const filteredBookmarks = bookmarks.filter(bookmark => {
        return bookmark.index !== parseInt(targetLi.id);
    })

    bookmarks = filteredBookmarks;
    saveBookmark(bookmarks);
}

function fetchBookmark(sitename, siteurl) {

    if (!validateForm(sitename, siteurl)) {
        return false;
    }

    const li = document.createElement("li");
    const visitBtn = document.createElement("a");
    const delBtn = document.createElement("a");
    const span = document.createElement("span");

    const bmIndex = bookmarks.length + 1;

    noBookmark.classList.add("hidden");

    bmListWrap.appendChild(li);
    li.appendChild(visitBtn);
    li.appendChild(delBtn);
    li.appendChild(span);

    li.id = bmIndex;
    visitBtn.innerHTML = "VISIT"
    visitBtn.classList.add("bm-visitBtn");
    visitBtn.href = `${siteurl}`;
    visitBtn.target = "_blank";
    delBtn.innerHTML = "DELETE";
    delBtn.classList.add("bm-delBtn");
    delBtn.addEventListener("click", delBookmark);
    span.innerHTML = sitename;

    // save bookmark
    const bookmarkObj = {
        index: bmIndex,
        sitename: sitename,
        siteurl: siteurl
    }
    bookmarks.push(bookmarkObj);
    saveBookmark(bookmarks);
}

function submitHandler(e) {
    const sitename = nameInput.value;
    const siteurl = urlInput.value;
    fetchBookmark(sitename, siteurl);

    bmForm.reset();
    e.preventDefault();
}

function loadBookmark() {
    const loadedBookmark = localStorage.getItem(BOOKMARK_LS);
    if (loadedBookmark === null) {
        // Nothing saved
        noBookmark.classList.remove("hidden");
    } else {
        // Fetch Bookmarks
        const parsedBookmark = JSON.parse(loadedBookmark);
        parsedBookmark.forEach(bookmark => {
            fetchBookmark(bookmark.sitename, bookmark.siteurl);
        });
    }
}

function init() {
    loadBookmark();
    bmSubmit.addEventListener("click", submitHandler);
    bmListBtn.addEventListener("click", openBookmarks);
}

init();