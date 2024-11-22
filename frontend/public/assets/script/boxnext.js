document.addEventListener("DOMContentLoaded", function () {
    // Hiển thị mặc định cho nhóm sản phẩm trong boxfullproduct2
    showProducts(document.querySelector('.boxfullproduct2').querySelector('a[data-category="new"]'));
    showProducts(document.querySelectorAll('.boxfullproduct2')[1].querySelector('a[data-category="new1"]'));
    showProducts(document.querySelectorAll('.boxfullproduct2')[2].querySelector('a[data-category="new2"]'));
});

function showProducts(element) {
    const boxProducts = element.closest('.boxfullproduct2').querySelector('.boxproducts'); // Tìm boxproducts cha của phần tử đã nhấn
    const category = element.getAttribute("data-category"); // Lấy danh mục từ thuộc tính data-category
    const boxes = boxProducts.querySelectorAll(".boxcontent"); // Chỉ tìm các boxcontent trong boxproducts hiện tại

    boxes.forEach((box) => {
        box.classList.remove("active"); // Ẩn tất cả các boxcontent
    });

    const selectedBox = boxProducts.querySelector("#box_" + category + "Products");
    if (selectedBox) {
        selectedBox.classList.add("active"); // Hiển thị boxcontent đã chọn
    }

     // Thay đổi màu của liên kết đã chọn
     const links = element.closest('.select').querySelectorAll("a[data-category]"); // Chỉ tìm các liên kết trong phạm vi .select
     links.forEach((link) => {
         link.classList.remove("active-link"); // Loại bỏ lớp active-link từ tất cả các liên kết
     });
     element.classList.add("active-link"); // Thêm lớp active-link cho liên kết đã chọn
}
