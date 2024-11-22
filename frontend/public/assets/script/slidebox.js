const boxesPerPage = 10; // Số box trên mỗi trang (5 box x 3 dòng)
const boxContainer = document.getElementById('boxContainer');

// Lấy tất cả box
const boxes = boxContainer.getElementsByClassName('box');
const totalBoxes = boxes.length; // Tính toán số lượng box
const totalPages = Math.ceil(totalBoxes / boxesPerPage);
const pagination = document.getElementById('pagination');

// Tạo nút phân trang
for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';
    pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    pageItem.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(i);
    });
    pagination.appendChild(pageItem);
}

function showPage(page) {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.add('hidden');
    }

    const start = (page - 1) * boxesPerPage;
    const end = start + boxesPerPage;

    for (let i = start; i < end && i < boxes.length; i++) {
        boxes[i].classList.remove('hidden');
    }
}

// Hiển thị trang đầu tiên
showPage(1);