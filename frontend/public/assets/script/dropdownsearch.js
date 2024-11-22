const searchInput = document.querySelector('.search-input');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const items = dropdownMenu.querySelectorAll('.search-item');

        searchInput.addEventListener('input', function() {
            const filter = searchInput.value.toLowerCase();
            let hasResults = false;

            items.forEach(item => {
                const txtValue = item.textContent || item.innerText;
                if (txtValue.toLowerCase().includes(filter)) {
                    item.style.display = ''; // Hiện mục nếu có kết quả
                    hasResults = true;
                } else {
                    item.style.display = 'none'; // Ẩn mục nếu không có kết quả
                }
            });
        });