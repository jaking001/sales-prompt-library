(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initWidget() {
        var container = document.getElementById('sales-prompt-widget');
        if (!container) {
            console.error('Container element with id "sales-prompt-widget" not found');
            return;
        }
        
        // Show loading state
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">Loading Sales Prompt Library...</div>';
        
        // Fetch the content from your GitHub Pages site
        fetch('https://jaking001.github.io/sales-prompt-library/')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(function(html) {
                // Extract the main content (avoid duplicating head elements)
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                
                // Get the body content or specific container
                var mainContent = doc.body.innerHTML;
                container.innerHTML = mainContent;
                
                // Re-execute any scripts that were in the loaded content
                var scripts = container.querySelectorAll('script');
                scripts.forEach(function(script) {
                    if (script.src) {
                        // External script
                        var newScript = document.createElement('script');
                        newScript.src = script.src;
                        newScript.async = true;
                        document.head.appendChild(newScript);
                    } else if (script.textContent) {
                        // Inline script
                        var newScript = document.createElement('script');
                        newScript.textContent = script.textContent;
                        document.head.appendChild(newScript);
                    }
                });
                
                // Re-apply any CSS that might be needed
                var styles = doc.querySelectorAll('style, link[rel="stylesheet"]');
                styles.forEach(function(style) {
                    if (!document.head.contains(style)) {
                        document.head.appendChild(style.cloneNode(true));
                    }
                });
            })
            .catch(function(error) {
                console.error('Error loading widget:', error);
                container.innerHTML = '<div style="text-align: center; padding: 40px; color: #e74c3c; border: 1px solid #e74c3c; border-radius: 8px; background: #fdf2f2;"><h3>Unable to Load Sales Prompt Library</h3><p>Please check your connection and try again.</p><a href="https://jaking001.github.io/sales-prompt-library/" target="_blank" style="color: #3498db; text-decoration: underline;">View Full Library →</a></div>';
            });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
