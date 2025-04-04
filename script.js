document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery img');
    let lightbox = null; // To hold the lightbox element

    // Function to create and show the lightbox
    const showLightbox = (src) => {
        // Prevent creating multiple lightboxes
        if (lightbox) return;

        // Create lightbox elements
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.classList.add('lightbox-overlay');

        const lightboxContent = document.createElement('div');
        lightboxContent.classList.add('lightbox-content');

        const img = document.createElement('img');
        img.src = src;
        img.classList.add('lightbox-image');

        const closeButton = document.createElement('button');
        closeButton.classList.add('lightbox-close');
        closeButton.innerHTML = '&times;'; // 'X' symbol

        // Append elements
        lightboxContent.appendChild(img);
        lightboxContent.appendChild(closeButton);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);

        // Add active class to show it (styling will handle visibility)
        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });


        // Add event listeners for closing
        closeButton.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            // Close if clicking on the overlay background, not the content/image
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        if (!lightbox) return;

        lightbox.classList.remove('active');
        // Remove the element after the transition ends (optional, depends on CSS)
        // For simplicity now, we'll remove immediately or rely on display:none
        // A better approach uses transitionend event
        setTimeout(() => {
             if (lightbox && document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
            lightbox = null; // Reset lightbox variable
        }, 300); // Match CSS transition duration if any
    };

    // Add click listeners to gallery images
    galleryImages.forEach(image => {
        image.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            showLightbox(image.src);
        });
    });

    // Optional: Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox) {
            closeLightbox();
        }
    });
});
