// sort them by price


// cart things


// shop email

document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('b0b_cart')) || [];

    const addToCartButtons = document.querySelectorAll('.btn-push');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalEl = document.getElementById('cart-total');

    // 1. Listen for clicks on "Add to cart" buttons
    addToCartButtons.forEach(button => {
        if (!button.hasAttribute('data-name')) return;

        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            saveAndRenderCart();

            const span = button.querySelector('span');
            const originalText = span.textContent;
            span.textContent = 'Added! ✓';
            setTimeout(() => {
                span.textContent = originalText;
            }, 1000);
        });
    });

    // 2. Update UI and handle localStorage
    function saveAndRenderCart() {
        localStorage.setItem('b0b_cart', JSON.stringify(cart));

        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartCountEl && cartTotalEl) {
            cartCountEl.textContent = totalCount;
            cartTotalEl.textContent = totalPrice;
        }

        // Show or hide both action buttons based on whether items exist
        const hasItems = totalCount > 0;
        if (checkoutBtn) checkoutBtn.style.display = hasItems ? 'inline-block' : 'none';
        if (clearCartBtn) clearCartBtn.style.display = hasItems ? 'inline-block' : 'none';
    }

    // 3. Handle clearing the cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cart = []; // Empty the array
            saveAndRenderCart(); // Refresh UI and storage
        });
    }

    // 4. Handle generating the mailto link when checkout is clicked
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (cart.length === 0) return;

            const emailYour = "your-email@example.com"; // Replace with your actual email
            const subject = encodeURIComponent("New Keyboard Shop Order");
            
            let bodyText = "Hey B0b,\n\nI'd like to order the following items from your shop:\n\n";
            
            cart.forEach(item => {
                bodyText += `- ${item.name} x${item.quantity} ($${item.price * item.quantity})\n`;
            });

            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            bodyText += `\nTotal: $${totalPrice}\n\nThanks!`;

            const mailtoLink = `mailto:${emailYour}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
            
            const tempLink = document.createElement('a');
            tempLink.href = mailtoLink;
            tempLink.target = '_blank';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        });
    }

    // 5. Handle Custom Build Inquiry Email on custom.html
    const customInquiryBtn = document.getElementById('custom-inquiry-btn');
    if (customInquiryBtn) {
        customInquiryBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const emailYour = "your-email@example.com"; // Replace with your actual email
            const subject = encodeURIComponent("Custom Keyboard Build Inquiry");
            
            let bodyText = "Hey B0b,\n\nI'm interested in a custom keyboard build. Here are some details of what I'm looking for:\n\n";
            bodyText += "- Layout / Form factor:\n";
            bodyText += "- Wireless or Wired:\n";
            bodyText += "- Switches / Keycaps preference:\n";
            bodyText += "- Other features (trackball, screen, etc.):\n\n";
            bodyText += "Add links/ photos of inspiration!\n\n";
            bodyText += "Thanks!";

            const mailtoLink = `mailto:${emailYour}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
            
            const tempLink = document.createElement('a');
            tempLink.href = mailtoLink;
            tempLink.target = '_blank';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        });
    }

    // Run on page load
    saveAndRenderCart();
});


// image slider
document.querySelectorAll('.image-slider').forEach(slider => {
        const images = slider.querySelectorAll('.slider-img');
        const nextBtn = slider.querySelector('.next-btn');
        const prevBtn = slider.querySelector('.prev-btn');
        const counter = slider.querySelector('.slide-counter');
        let currentIndex = 0;

        function updateSlider() {
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        });
    });