const commentsDiv = document.getElementById('comments');
const commentElements = commentsDiv.getElementsByClassName('comment');
const comments = Array.from(commentElements).map(comment => {
    const textElement = comment.querySelector('span');
    const name = textElement.querySelector('b').textContent; // Lấy tên từ thẻ <b>
    const commentText = textElement.textContent.replace(name, '').trim(); // Lấy văn bản bình luận sau tên
    return { name, commentText }; // Trả về một đối tượng với tên và văn bản bình luận
});

const commentsPerPage = 2;
let currentPage = 1;

function displayComments(page) {
    const start = (page - 1) * commentsPerPage;
    const end = start + commentsPerPage;
    const commentsToDisplay = comments.slice(start, end);
    commentsDiv.innerHTML = commentsToDisplay.map(({ name, commentText }) => {
        return `
            <div class="comment commentuser">
                <img src="img/avanta.png" alt="" />
                <div>
                    <span><b>${name}</b>${commentText}</span>
                </div>
            </div>`;
    }).join('');
    document.getElementById('pageInfo').textContent = `Trang ${page} / ${Math.ceil(comments.length / commentsPerPage)}`;
}

function updateButtons() {
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === Math.ceil(comments.length / commentsPerPage);
}

document.getElementById('prevBtn').onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        displayComments(currentPage);
        updateButtons();
    }
};

document.getElementById('nextBtn').onclick = () => {
    if (currentPage < Math.ceil(comments.length / commentsPerPage)) {
        currentPage++;
        displayComments(currentPage);
        updateButtons();
    }
};

// Initialize
displayComments(currentPage);
updateButtons();