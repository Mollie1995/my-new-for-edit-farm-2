// Get all necessary elements for the slider from the DOM
const slides = document.querySelectorAll('.slider-slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentSlide = 0; // Keep track of the currently active slide
let slideInterval; // Variable to hold the auto-play interval

// Function to show a specific slide
function showSlide(index) {
    // Ensure index is within bounds for cyclic navigation
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }

    // Remove 'active' class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add 'active' class to the current slide and its corresponding dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index; // Update the current slide index
}

// Function to go to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Cycle through slides
    showSlide(currentSlide);
}

// Function to go to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Cycle backward
    showSlide(currentSlide);
}

// Function to start auto-playing the slider
function startAutoPlay() {
    // Clear any existing interval to prevent multiple intervals running
    clearInterval(slideInterval); 
    // Set a new interval to change slides every 5 seconds (5000 milliseconds)
    slideInterval = setInterval(nextSlide, 5000); 
}

// Event Listeners for Slider Navigation Buttons
if (prevButton) { // Check if button exists before adding listener
    prevButton.addEventListener('click', () => {
        prevSlide();
        startAutoPlay(); // Restart auto-play after manual navigation
    });
}

if (nextButton) { // Check if button exists before adding listener
    nextButton.addEventListener('click', () => {
        nextSlide();
        startAutoPlay(); // Restart auto-play after manual navigation
    });
}

// Event Listeners for Slider Dots Indicator
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index); // Show the slide corresponding to the clicked dot
        startAutoPlay(); // Restart auto-play after manual navigation
    });
});

// --- Mobile Navigation Functionality ---

const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');
const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

// Toggle mobile menu visibility
if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Toggle mobile dropdown visibility
mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior (e.g., navigating to #)
        const dropdownContent = this.nextElementSibling; // Get the next sibling, which is the dropdown content
        if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
            dropdownContent.classList.toggle('open');
            // Optional: Rotate the SVG icon to indicate open/close state
            const svgIcon = this.querySelector('svg');
            if (svgIcon) {
                svgIcon.style.transform = dropdownContent.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
                svgIcon.style.transition = 'transform 0.3s ease';
            }
        }
    });
});

// --- Sticky Header Functionality ---

const header = document.querySelector('.header');
// Get the header's initial height to determine scroll threshold for shrinking
// This handles cases where header height might vary due to content or responsive design
const headerHeight = header ? header.offsetHeight : 0; 

window.addEventListener('scroll', () => {
    // Check if header exists before manipulating its class
    if (header) { 
        if (window.scrollY > headerHeight) { // If scrolled past the initial header height
            header.classList.add('sticky-shrink'); // Add class to shrink/style header
        } else {
            header.classList.remove('sticky-shrink'); // Remove class when scrolled back up
        }
    }
});

// --- Click-to-Reveal Content (Accordion/Toggle) Functionality ---

// Select all elements that will act as clickable headers/buttons to reveal content
// Make sure to add 'accordion-header' class to your HTML buttons/divs
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling; // Assumes content is the immediate next sibling
        const icon = header.querySelector('.icon'); // Assumes an icon element exists within the header

        // Toggle the 'active' class on the header and the content
        header.classList.toggle('active');
        content.classList.toggle('active');

        // Accessibility: Update ARIA attributes
        const isExpanded = header.classList.contains('active');
        header.setAttribute('aria-expanded', isExpanded);
        content.toggleAttribute('hidden', !isExpanded); // Use 'hidden' attribute for true hiding

        // Smooth transition for height:
        // If content is active (being opened), set its max-height to its scrollHeight
        // If it's not active (being closed), set max-height back to 0
        if (isExpanded) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = "0";
        }

        // Optional: Rotate the icon for visual feedback (e.g., plus to minus)
        if (icon) {
            icon.style.transform = isExpanded ? 'rotate(45deg)' : 'rotate(0deg)';
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // --- Loading Screen Logic (Existing, but including for context) ---
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.style.overflow = ''; // Re-enable scrolling after loading
            }, 500); // Fade out after 0.5 seconds
        });
        // Optional: Disable scrolling during loading
        document.body.style.overflow = 'hidden';
    }


    // --- Mobile Menu Toggle Logic (Existing, but including for context) ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active'); // Add class to toggle bars to X
        });

        // Close dropdowns when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Handle mobile dropdown toggles
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only prevent default if it's a mobile view or if you want to initially show dropdown on click
            // For now, let's assume it should always toggle on click
            e.preventDefault();
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
                dropdownContent.classList.toggle('show');
            }
        });
    });

    // --- Slider Logic (Existing, but including for context) ---
    const slides = document.querySelectorAll('.slider-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (prevButton && nextButton) { // Check if slider elements exist
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                currentSlide = parseInt(this.dataset.slide);
                showSlide(currentSlide);
            });
        });

        // Auto-advance slider
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }


    // --- NEW: Generic Modal Functionality ---
    const allLearnMoreButtons = document.querySelectorAll('.learn-more-button');
    const allModals = document.querySelectorAll('.modal');
    const allCloseButtons = document.querySelectorAll('.close-button');

    // Function to open a modal
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.classList.add('active'); // Add 'active' class to show modal
            document.body.style.overflow = 'hidden'; // Prevent body scrolling
        }
    }

    // Function to close a modal
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('active'); // Remove 'active' class to hide modal
            document.body.style.overflow = ''; // Re-enable body scrolling
        }
    }

    // Event listeners for ALL "Learn More" buttons
    allLearnMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Stop the default link behavior
            const modalTargetId = this.dataset.modalTarget; // Get the target modal ID
            if (modalTargetId) {
                const targetModal = document.querySelector(modalTargetId);
                openModal(targetModal);
            }
        });
    });

    // Event listeners for ALL close buttons inside modals
    allCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalElement = this.closest('.modal'); // Find the closest parent with class 'modal'
            closeModal(modalElement);
        });
    });

    // Close modal when clicking outside the modal content area
    allModals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            // Check if the click target is the modal overlay itself (not content inside)
            if (event.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal when the Escape key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            allModals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });

}); // End of DOMContentLoaded



//Contact us page js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');

    // Function to display an error message
    function showError(element, message) {
        let errorSpan = element.nextElementSibling; // Check if an error message already exists
        if (!errorSpan || !errorSpan.classList.contains('error-message')) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-message');
            errorSpan.style.color = 'red'; // Basic styling for visibility
            errorSpan.style.fontSize = '0.85em';
            errorSpan.style.marginTop = '5px';
            errorSpan.style.display = 'block';
            element.parentNode.insertBefore(errorSpan, element.nextSibling); // Insert after the element
        }
        errorSpan.textContent = message;
        element.classList.add('is-invalid'); // Add class for styling invalid fields
    }

    // Function to clear an error message
    function clearError(element) {
        const errorSpan = element.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.remove();
        }
        element.classList.remove('is-invalid'); // Remove invalid styling
    }

    // Validation function for individual fields
    function validateField(field) {
        clearError(field); // Clear any existing error first

        if (field.hasAttribute('required') && field.value.trim() === '') {
            showError(field, 'This field is required.');
            return false;
        }

        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                showError(field, 'Please enter a valid email address.');
                return false;
            }
        }
        return true;
    }

    // Add real-time validation on input/change
    nameInput.addEventListener('input', () => validateField(nameInput));
    emailInput.addEventListener('input', () => validateField(emailInput));
    subjectInput.addEventListener('input', () => validateField(subjectInput));
    messageTextarea.addEventListener('input', () => validateField(messageTextarea));


    // Form submission validation
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        let formIsValid = true;

        // Validate all fields
        const fieldsToValidate = [nameInput, emailInput, subjectInput, messageTextarea];
        fieldsToValidate.forEach(field => {
            if (!validateField(field)) {
                formIsValid = false;
            }
        });

        if (formIsValid) {
            // If all validations pass, you can submit the form
            // For demonstration, we'll just log to console and show an alert
            console.log('Form submitted successfully!');
            alert('Message Sent! Thank you for contacting us.');

            // In a real application, you would send the data to a server here:
            // contactForm.submit(); // Uncomment this line to allow actual submission
            // Or use fetch() API for AJAX submission
            contactForm.reset(); // Clear the form after successful submission
            // Remove any red borders that might remain after reset if no errors
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        } else {
            alert('Please correct the errors in the form.');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const downloadQrButton = document.getElementById('downloadQrButton');
    const qrCodeImage = document.querySelector('.qr-code');

    if (downloadQrButton && qrCodeImage) {
        downloadQrButton.addEventListener('click', function() {
            const imageUrl = qrCodeImage.src;
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'nature_bounty_qr_code.webp'; // Desired file name for download
            document.body.appendChild(link); // Append to body (required for Firefox)
            link.click(); // Programmatically click the link to trigger download
            document.body.removeChild(link); // Clean up the element
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // --- Loading Screen JS (Add this at the very beginning of your Java.js) ---
    const loadingScreen = document.getElementById('loading-screen');

    // Wait for all assets (images, etc.) to load, then hide the loading screen
    window.addEventListener('load', function() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    });

    // Fallback in case 'load' event doesn't fire quickly or for very simple pages
    // You can adjust the timeout or remove it if 'load' is sufficient
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
        }
    }, 2000); // Hide after 2 seconds even if 'load' event is delayed


    // --- Your existing JavaScript code for mobile menu, form validation, QR download, etc. goes here ---
    // ... (All the other JS you have in NewMe/Java.js) ...

});



document.addEventListener('DOMContentLoaded', function() {
    // --- Loading Screen Logic ---
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            // Give a small delay to ensure content starts loading before hiding
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.style.overflow = ''; // Re-enable scrolling after loading
            }, 500); // Fade out after 0.5 seconds
        });
        // Optional: Disable scrolling during loading to prevent jank
        document.body.style.overflow = 'hidden';
    }


    // --- Mobile Menu Toggle Logic ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active'); // Toggles the hamburger icon to an X
        });

        // Close dropdowns when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            // If nav is open and click is outside nav and toggle
            if (navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                // Close any open mobile dropdowns within the nav too
                document.querySelectorAll('.mobile-dropdown-content.show').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        });
    }

    // Handle mobile dropdown toggles (for "About Us" and "What We Grow")
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior for dropdown toggles
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
                // Close other open mobile dropdowns before opening this one
                document.querySelectorAll('.mobile-dropdown-content.show').forEach(openDropdown => {
                    if (openDropdown !== dropdownContent) {
                        openDropdown.classList.remove('show');
                    }
                });
                dropdownContent.classList.toggle('show');
            }
        });
    });


    // --- Generic Modal Functionality ---
    // This will handle all buttons with 'data-modal-target' and their corresponding modals
    const modalTriggerButtons = document.querySelectorAll('[data-modal-target]');
    const allModals = document.querySelectorAll('.modal'); // Select all modal elements
    const allCloseButtons = document.querySelectorAll('.close-button');

    // Function to open a modal
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.classList.add('active'); // Add 'active' class to show modal and trigger animation
            document.body.style.overflow = 'hidden'; // Prevent body scrolling when modal is open
        }
    }

    // Function to close a modal
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('active'); // Remove 'active' class to hide modal and trigger animation
            document.body.style.overflow = ''; // Re-enable body scrolling
        }
    }

    // Event listeners for all buttons that trigger modals
    modalTriggerButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Stop the default link behavior
            const modalTargetId = this.dataset.modalTarget; // Get the ID of the modal to open
            if (modalTargetId) {
                const targetModal = document.querySelector(modalTargetId);
                openModal(targetModal);
            }
        });
    });

    // Event listeners for all close buttons inside modals
    allCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalElement = this.closest('.modal'); // Find the closest parent modal
            closeModal(modalElement);
        });
    });

    // Close modal when clicking outside the modal content (on the overlay)
    allModals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) { // Check if the click was directly on the modal overlay
                closeModal(this);
            }
        });
    });

    // Close modal when the Escape key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            allModals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal); // Close any active modal
                }
            });
        }
    });

    // --- Placeholder Modal Content for Blog Posts ---
    // Since your "Read More" buttons on the blog page currently link to "#"
    // and don't have unique data-modal-target attributes, we'll create some
    // placeholder modals dynamically for demonstration.
    // In a real scenario, you'd load blog post content dynamically or link to actual post pages.

    const blogPostCards = document.querySelectorAll('.blog-post-card');
    blogPostCards.forEach((card, index) => {
        const readMoreButton = card.querySelector('.learn-more-button');
        const postTitle = card.querySelector('h3').textContent;
        const postMeta = card.querySelector('.post-meta').textContent;
        const postExcerpt = card.querySelector('p:not(.post-meta)').textContent;

        const modalId = `blogPostModal${index}`; // Create unique ID for each modal
        readMoreButton.setAttribute('data-modal-target', `#${modalId}`); // Assign data-modal-target

        // Create the modal HTML
        const modalHTML = `
            <div id="${modalId}" class="modal">
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <h3>${postTitle}</h3>
                    <p class="post-meta">${postMeta}</p>
                    <p>This is the full content for the blog post: "${postTitle}".</p>
                    <p>${postExcerpt} This is expanded content to give a sense of what a full blog post might contain. You can imagine more detailed information about the topic here, including images, lists, and more paragraphs.</p>
                    <p>For a real blog, this content would be loaded from a database or a separate HTML file.</p>
                    <a href="#" class="modal-button">View All Blog Posts</a>
                </div>
            </div>
        `;

        // Append the modal to the body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    });

    // After dynamically creating modals, re-select all modal related elements
    // This is crucial for the event listeners to pick up the new modals
    const newModalButtons = document.querySelectorAll('[data-modal-target]');
    const newModals = document.querySelectorAll('.modal');
    const newCloseButtons = document.querySelectorAll('.close-button');

    // Remove old listeners and add new ones to include dynamically added modals
    // A more robust solution might involve event delegation
    newModalButtons.forEach(button => {
        button.removeEventListener('click', handleModalButtonClick); // Remove old if exists
        button.addEventListener('click', handleModalButtonClick);
    });

    newCloseButtons.forEach(button => {
        button.removeEventListener('click', handleCloseButtonClick); // Remove old if exists
        button.addEventListener('click', handleCloseButtonClick);
    });

    newModals.forEach(modal => {
        modal.removeEventListener('click', handleModalOverlayClick); // Remove old if exists
        modal.addEventListener('click', handleModalOverlayClick);
    });

    // Define handlers for cleaner re-assignment
    function handleModalButtonClick(event) {
        event.preventDefault();
        const modalTargetId = this.dataset.modalTarget;
        if (modalTargetId) {
            const targetModal = document.querySelector(modalTargetId);
            openModal(targetModal);
        }
    }

    function handleCloseButtonClick() {
        const modalElement = this.closest('.modal');
        closeModal(modalElement);
    }

    function handleModalOverlayClick(event) {
        if (event.target === this) {
            closeModal(this);
        }
    }

}); // End of DOMContentLoaded


//Blog page js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });

        // Close nav when a link is clicked (for single-page navigation or after selecting a dropdown item)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuButton.classList.remove('active');
                }
            });
        });
    }

    // Dropdown functionality for mobile
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
                dropdownContent.classList.toggle('show-dropdown');
            }
        });
    });

    // Close mobile dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.mobile-dropdown-content.show-dropdown').forEach(dropdown => {
            if (!dropdown.previousElementSibling.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show-dropdown');
            }
        });
    });

    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            setTimeout(() => {
                loadingScreen.style.display = 'active';
            }, 900); // Allow time for the fade-out transition
        });
    }


    // --- Blog Pagination Logic ---
    const blogPosts = document.querySelectorAll('.blog-post-card');
    const paginationContainer = document.querySelector('.pagination');
    const postsPerPage = 3; // Number of posts to display per page
    let currentPage = 1;

    function displayPage(page) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        blogPosts.forEach((post, index) => {
            if (index >= start && index < end) {
                post.style.display = 'flex'; // Show relevant posts
            } else {
                post.style.display = 'none'; // Hide others
            }
        });

        updatePaginationButtons();
    }

    function setupPagination() {
        if (blogPosts.length === 0) {
            paginationContainer.style.display = 'none'; // Hide pagination if no posts
            return;
        }

        const totalPages = Math.ceil(blogPosts.length / postsPerPage);
        paginationContainer.innerHTML = ''; // Clear existing buttons

        // Add 'Previous' button
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.innerHTML = '&laquo; Previous';
        prevButton.classList.add('prev-button');
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
            }
        });
        paginationContainer.appendChild(prevButton);


        // Add page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('a');
            button.href = '#';
            button.textContent = i;
            button.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayPage(currentPage);
            });
            paginationContainer.appendChild(button);
        }

        // Add 'Next' button
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.innerHTML = 'Next &raquo;';
        nextButton.classList.add('next-button');
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(currentPage);
            }
        });
        paginationContainer.appendChild(nextButton);

        displayPage(currentPage); // Display the first page initially
    }

    function updatePaginationButtons() {
        const buttons = paginationContainer.querySelectorAll('a');
        const totalPages = Math.ceil(blogPosts.length / postsPerPage);

        buttons.forEach(button => {
            button.classList.remove('active');
        });

        // Set active class for the current page number
        const currentPageButton = Array.from(buttons).find(button => parseInt(button.textContent) === currentPage);
        if (currentPageButton) {
            currentPageButton.classList.add('active');
        }

        // Enable/disable Prev/Next buttons
        const prevButton = paginationContainer.querySelector('.prev-button');
        const nextButton = paginationContainer.querySelector('.next-button');

        if (prevButton) {
            if (currentPage === 1) {
                prevButton.classList.add('disabled');
            } else {
                prevButton.classList.remove('disabled');
            }
        }

        if (nextButton) {
            if (currentPage === totalPages) {
                nextButton.classList.add('disabled');
            } else {
                nextButton.classList.remove('disabled');
            }
        }
    }

    setupPagination(); // Initialize pagination on page load

    // Smooth Scrolling for anchor links (if applicable, e.g., for "Read More" that go to article sections)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.header')?.offsetHeight || 0), // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

});


// js for dropdown 
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Loading Screen Logic ---
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            // Set opacity to 0 and visibility to hidden for smooth fade-out
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            // After the transition, set display to none to remove it from document flow
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Matches the CSS transition duration
        });
    }


    // --- 2. Mobile Navigation Toggle Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active'); // Toggles the 'active' class on the ul.nav-links
            mobileMenuButton.classList.toggle('active'); // Toggles the 'active' class on the hamburger icon
        });

        // Close nav when a main link is clicked (optional, good for single-page sites or after selecting an item)
        // This makes the menu collapse after a user navigates or selects a dropdown item.
        navLinks.querySelectorAll('a').forEach(link => {
            // Check if the link is NOT a mobile dropdown toggle itself
            if (!link.classList.contains('mobile-dropdown-toggle')) {
                link.addEventListener('click', () => {
                    // Only close if the menu is currently active
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuButton.classList.remove('active');
                    }
                    // Also close any open mobile dropdowns
                    document.querySelectorAll('.mobile-dropdown-content.show-dropdown').forEach(dropdown => {
                        dropdown.classList.remove('show-dropdown');
                    });
                });
            }
        });
    }


    // --- 3. Mobile Dropdown Functionality ---
    // Select all links that are designated as mobile dropdown toggles
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior (e.g., navigating to 'about us page.html')

            const dropdownContent = this.nextElementSibling; // Get the next sibling element (the dropdown content div)

            if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
                // Close other open dropdowns in the mobile menu (optional, but good UX)
                document.querySelectorAll('.mobile-dropdown-content.show-dropdown').forEach(openDropdown => {
                    if (openDropdown !== dropdownContent) { // Don't close the one just clicked
                        openDropdown.classList.remove('show-dropdown');
                        openDropdown.previousElementSibling.classList.remove('active'); // Remove active from its toggle
                    }
                });

                dropdownContent.classList.toggle('show-dropdown'); // Toggle the 'show-dropdown' class on the content
                this.classList.toggle('active'); // Toggle 'active' class on the toggle link itself (for arrow rotation)
            }
        });
    });

    // Close mobile dropdowns when clicking outside the menu area
    document.addEventListener('click', function(e) {
        // Check if the click is outside the nav links or not on a dropdown toggle
        if (!navLinks.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            document.querySelectorAll('.mobile-dropdown-content.show-dropdown').forEach(dropdown => {
                dropdown.classList.remove('show-dropdown');
                // Also remove 'active' from its corresponding toggle link
                if (dropdown.previousElementSibling && dropdown.previousElementSibling.classList.contains('mobile-dropdown-toggle')) {
                    dropdown.previousElementSibling.classList.remove('active');
                }
            });
        }
    });


    // --- 4. Blog Pagination Logic (Applied to blog page.html) ---
    // This logic only applies if elements with 'blog-post-card' are present.
    const blogPosts = document.querySelectorAll('.blog-post-card');
    const paginationContainer = document.querySelector('.pagination');

    // Only proceed with pagination if there are blog posts and a pagination container
    if (blogPosts.length > 0 && paginationContainer) {
        const postsPerPage = 3; // Number of posts to display per page
        let currentPage = 1;

        function displayPage(page) {
            const start = (page - 1) * postsPerPage;
            const end = start + postsPerPage;

            blogPosts.forEach((post, index) => {
                if (index >= start && index < end) {
                    post.style.display = 'flex'; // Show relevant posts (using flex because of your CSS)
                } else {
                    post.style.display = 'none'; // Hide others
                }
            });

            updatePaginationButtons(); // Update active state of pagination buttons
        }

        function setupPagination() {
            // Hide pagination if no posts or not enough for multiple pages
            if (blogPosts.length <= postsPerPage) {
                paginationContainer.style.display = 'none';
                return;
            }

            const totalPages = Math.ceil(blogPosts.length / postsPerPage);
            paginationContainer.innerHTML = ''; // Clear existing buttons to regenerate

            // Add 'Previous' button
            const prevButton = document.createElement('a');
            prevButton.href = '#';
            prevButton.innerHTML = '&laquo; Previous';
            prevButton.classList.add('prev-button');
            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    displayPage(currentPage);
                }
            });
            paginationContainer.appendChild(prevButton);

            // Add page number buttons
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('a');
                button.href = '#';
                button.textContent = i;
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentPage = i;
                    displayPage(currentPage);
                });
                paginationContainer.appendChild(button);
            }

            // Add 'Next' button
            const nextButton = document.createElement('a');
            nextButton.href = '#';
            nextButton.innerHTML = 'Next &raquo;';
            nextButton.classList.add('next-button');
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    displayPage(currentPage);
                }
            });
            paginationContainer.appendChild(nextButton);

            displayPage(currentPage); // Display the first page initially
        }

        function updatePaginationButtons() {
            const buttons = paginationContainer.querySelectorAll('a');
            const totalPages = Math.ceil(blogPosts.length / postsPerPage);

            buttons.forEach(button => {
                button.classList.remove('active'); // Remove active from all
            });

            // Set active class for the current page number
            const currentPageButton = Array.from(buttons).find(button => parseInt(button.textContent) === currentPage);
            if (currentPageButton) {
                currentPageButton.classList.add('active');
            }

            // Enable/disable Prev/Next buttons based on current page
            const prevButton = paginationContainer.querySelector('.prev-button');
            const nextButton = paginationContainer.querySelector('.next-button');

            if (prevButton) {
                if (currentPage === 1) {
                    prevButton.classList.add('disabled');
                } else {
                    prevButton.classList.remove('disabled');
                }
            }

            if (nextButton) {
                if (currentPage === totalPages) {
                    nextButton.classList.add('disabled');
                } else {
                    nextButton.classList.remove('disabled');
                }
            }
        }

        setupPagination(); // Initialize blog pagination when the DOM is ready
    }


    // --- 5. Smooth Scrolling for Anchor Links ---
    // (This is a general utility, not specific to any particular page content, but useful)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Get header height to offset scrolling if your header is fixed/sticky
                const headerOffset = document.querySelector('.header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
        });
    });

});



document.addEventListener('DOMContentLoaded', function() {
    // --- Keep your existing JavaScript code here ---
    // (e.g., for the loading screen and mobile navigation)

    // Example of your loading screen JS:
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            loadingScreen.style.display = 'none';
        });
    }

    // Example of your mobile navigation JS:
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active'); // Optional: for animating the menu icon
        });

        // Close dropdowns on mobile nav item click if it has a sub-menu
        const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        mobileDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                // Only prevent default if the target is the dropdown toggle itself
                // This stops it from navigating immediately and allows dropdown to open
                if (window.innerWidth <= 768) { // Adjust breakpoint as per your CSS
                    e.preventDefault();
                    const dropdownContent = toggle.nextElementSibling;
                    if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
                        dropdownContent.classList.toggle('active');
                        toggle.classList.toggle('open'); // Optional class for arrow rotation
                    }
                }
            });
        });
    }


    // --- Modal (Pop-up) Logic ---
    const modal = document.getElementById('infoModal');
    const closeButton = document.querySelector('.modal .close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    // Select all buttons that are intended to open the modal.
    // They must have the class 'learn-more-button small' and data attributes.
    const modalTriggerButtons = document.querySelectorAll('.learn-more-button.small');

    modalTriggerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the link from navigating or refreshing the page

            // Get the custom data from the clicked button's data attributes
            const title = this.getAttribute('data-modal-title');
            const message = this.getAttribute('data-modal-message');

            // Populate the modal with the extracted content
            if (modalTitle && modalMessage) {
                modalTitle.textContent = title || 'Information'; // Use button's title or a fallback
                modalMessage.textContent = message || 'More details coming soon!'; // Use button's message or a fallback
            }

            // Show the modal by adding the 'active' class (CSS handles the display and animation)
            modal.classList.add('active');
            // Disable scrolling on the main page while the modal is open for better UX
            document.body.style.overflow = 'hidden';
        });
    });

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('active'); // Hide the modal
        document.body.style.overflow = ''; // Re-enable scrolling on the main page
    }

    // Event listener for the 'X' (close) button inside the modal
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Event listener to close the modal when clicking on the modal's background (outside the content)
    if (modal) {
        modal.addEventListener('click', function(e) {
            // Check if the click event target is exactly the modal overlay itself, not its content
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Event listener to close the modal when the ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});


//register and sign up page
 document.addEventListener('DOMContentLoaded', () => {
            const showSignInBtn = document.getElementById('showSignIn');
            const showSignUpBtn = document.getElementById('showSignUp');
            const signInForm = document.getElementById('signInForm');
            const signUpForm = document.getElementById('signUpForm');

            function showForm(formToShow, formToHide, activeBtn, inactiveBtn) {
                formToHide.classList.add('hidden');
                formToShow.classList.remove('hidden');
                activeBtn.classList.add('active');
                inactiveBtn.classList.remove('active');
                // Optional: Re-trigger animations for the shown form
                formToShow.querySelectorAll('.section-title, .section-description, .form-group, .auth-button, .switch-prompt').forEach(el => {
                    el.style.animation = 'none'; // Clear previous animation
                    void el.offsetWidth; // Trigger reflow
                    if (el.classList.contains('section-title')) el.style.animation = 'fadeInDown 0.8s ease-out forwards';
                    else if (el.classList.contains('section-description')) el.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    else if (el.classList.contains('auth-button')) el.style.animation = 'fadeInScaleUp 1s ease-out forwards';
                    else if (el.classList.contains('switch-prompt')) el.style.animation = 'fadeInBlurUp 0.8s ease-out forwards';
                    else el.style.animation = 'fadeInBlurUp 0.8s ease-out forwards'; // Default for form-groups
                });
            }

            showSignInBtn.addEventListener('click', () => {
                showForm(signInForm, signUpForm, showSignInBtn, showSignUpBtn);
            });

            showSignUpBtn.addEventListener('click', () => {
                showForm(signUpForm, signInForm, showSignUpBtn, showSignInBtn);
            });

            // Handle "Don't have an account?" / "Already have an account?" links
            document.querySelectorAll('.switch-prompt .form-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetFormId = e.target.dataset.target;
                    if (targetFormId === 'signInForm') {
                        showForm(signInForm, signUpForm, showSignInBtn, showSignUpBtn);
                    } else if (targetFormId === 'signUpForm') {
                        showForm(signUpForm, signInForm, showSignUpBtn, showSignInBtn);
                    }
                });
            });

            // Initial animation for the default active form
            signInForm.querySelectorAll('.section-title, .section-description, .form-group, .auth-button, .switch-prompt').forEach(el => {
                let delay = 0.2; // Base delay for the whole card
                if (el.classList.contains('section-title')) delay += 0.2;
                else if (el.classList.contains('section-description')) delay += 0.4;
                else if (el.classList.contains('form-group')) {
                    const index = Array.from(el.parentNode.children).indexOf(el);
                    delay += (index * 0.1) + 0.6; // Stagger form groups
                }
                else if (el.classList.contains('auth-button')) delay += 1.0;
                else if (el.classList.contains('switch-prompt')) delay += 1.2;

                el.style.animationDelay = `${delay}s`;

                if (el.classList.contains('section-title')) el.style.animation = 'fadeInDown 0.8s ease-out forwards';
                else if (el.classList.contains('section-description')) el.style.animation = 'fadeInUp 0.8s ease-out forwards';
                else if (el.classList.contains('auth-button')) el.style.animation = 'fadeInScaleUp 1s ease-out forwards';
                else if (el.classList.contains('switch-prompt')) el.style.animation = 'fadeInBlurUp 0.8s ease-out forwards';
                else el.style.animation = 'fadeInBlurUp 0.8s ease-out forwards';
            });
        });


        //farm-solution-fix-2-main/We are growing page.html
        document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.querySelector('.menu-toggle');
            const mainNav = document.querySelector('.main-nav');

            if (menuToggle && mainNav) {
                menuToggle.addEventListener('click', () => {
                    mainNav.classList.toggle('active');
                    menuToggle.querySelector('i').classList.toggle('fa-bars');
                    menuToggle.querySelector('i').classList.toggle('fa-times');
                });
            }
        });


        // Optional: Ensure the loading screen logic runs after the page loads
        document.addEventListener("DOMContentLoaded", function() {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.visibility = 'hidden';
                }, 500); // Fades out after 0.5 seconds
            }
        });

        document.addEventListener("DOMContentLoaded", function() {
    // --- Loading Screen Logic (if not already in Java.js) ---
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Only run this if the loading screen element exists
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.style.overflow = ''; // Re-enable scrolling after load
            }, 500); // Fades out after 0.5 seconds
        });
        // Optional: Hide loading screen immediately if JS loads late
        // If you want to ensure no scroll during loading, set body overflow hidden in CSS
        // and remove it here after load
        document.body.style.overflow = 'hidden'; // Keep body from scrolling during load
    }

    // --- Mobile Menu Toggle Logic ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileMenuToggle && navLinks) { // Check if elements exist
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active'); // Optional: for animating the burger icon
        });

        // Close dropdowns when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // --- Mobile Dropdown Toggle Logic ---
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(item => {
        item.addEventListener('click', function(event) {
            // Prevent default link behavior if it's a dropdown toggle
            if (window.innerWidth <= 768) { // Adjust breakpoint as needed
                event.preventDefault();
                const dropdownContent = this.nextElementSibling;
                if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
                    dropdownContent.classList.toggle('show');
                }
            }
        });
    });

    // --- Status Popup Logic ---
    const popupOverlay = document.getElementById('status-popup-overlay');
    const popupMessage = document.getElementById('status-popup-message');
    const popupCloseBtn = document.getElementById('status-popup-close-btn');
    const body = document.body;

    function showPopup(message) {
        if (popupOverlay && popupMessage) {
            popupMessage.textContent = message;
            popupOverlay.classList.add('active');
            body.classList.add('no-scroll'); // Prevent scrolling
        }
    }

    function hidePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
            body.classList.remove('no-scroll'); // Re-enable scrolling
        }
    }

    // Event listener for the close button
    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', hidePopup);
    }

    // Event listener for clicking outside the popup box to close it
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(event) {
            // If the click target is the overlay itself, not the content box
            if (event.target === popupOverlay) {
                hidePopup();
            }
        });
    }

    // Attach popup to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.product-card .card-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior (#)
            showPopup("Product added to cart! (Feature coming soon)");
        });
    });

    // Attach popup to Custom Order / Wholesale buttons
    const customOrderBtn = document.querySelector('.custom-order-cta .primary-cta-button');
    const wholesaleInquiryBtn = document.querySelector('.custom-order-cta .secondary-cta-button');

    if (customOrderBtn) {
        customOrderBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            showPopup("Custom order inquiry feature coming soon! Please contact us directly for now.");
        });
    }

    if (wholesaleInquiryBtn) {
        wholesaleInquiryBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            showPopup("Wholesale inquiry feature coming soon! Please contact us directly for now.");
        });
    }
});