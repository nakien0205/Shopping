document.addEventListener('DOMContentLoaded', function() {
    const recommendBtn = document.getElementById('recommend-btn');
    const productInfo = document.getElementById('product-info');
    const productTitle = document.getElementById('product-title');
    const productPrice = document.getElementById('product-price');
    const productRating = document.getElementById('product-rating');
    const productUrl = document.getElementById('product-url');

    recommendBtn.addEventListener('click', function() {
        // Show loading state
        recommendBtn.textContent = 'Loading...';
        recommendBtn.disabled = true;

        // Fetch recommendation from the API
        fetch('/recommend')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error);
                    return;
                }

                // Display the product information
                productTitle.textContent = data.title;
                productPrice.textContent = data.final_price;
                productRating.textContent = data.rating + '/5';
                productUrl.href = data.url;
                
                // Show the product info div
                productInfo.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch recommendation');
            })
            .finally(() => {
                // Reset button state
                recommendBtn.textContent = 'Get Recommendation';
                recommendBtn.disabled = false;
            });
    });
});