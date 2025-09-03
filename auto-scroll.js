/*
  Step 1: Auto-Scroll Script
  - This script forces all pages of the document to load.
*/
(function() {
    let scrollableElement = null;
    // Find the main scrollable container
    document.querySelectorAll('*').forEach(element => {
        if (element.scrollHeight > element.clientHeight) {
            if (!scrollableElement || element.scrollHeight > scrollableElement.scrollHeight) {
                scrollableElement = element;
            }
        }
    });

    if (scrollableElement) {
        console.log("Starting auto-scroll to load all pages...");
        scrollableElement.scrollTo(0, 0); // Go to the top

        let scrollInterval = setInterval(() => {
            // Check if we have reached the bottom of the document
            if (scrollableElement.scrollTop + scrollableElement.clientHeight >= scrollableElement.scrollHeight) {
                clearInterval(scrollInterval);
                console.log("✅ All pages are loaded.");
                alert("Auto-scroll complete. You can now save the PDF using the Print menu (Ctrl+P).");
            } else {
                // Scroll down by one page
                scrollableElement.scrollBy(0, scrollableElement.clientHeight);
            }
        }, 500);
    } else {
        alert("No scrollable area was found. You can try to save to PDF directly with Ctrl+P.");
    }
})();
