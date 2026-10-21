/* ==========================================================================
   GYPSYARC - Core Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI Components
    initToolNavigation();
    initModals();
    initUnitConverter();
    initMaterialEstimator();
    
    // Placeholder for Google Maps API initialization
    console.log("GYPSYARC System Initialized. Waiting for Maps API...");
});

/* ==========================================================================
   1. UI NAVIGATION & PANEL SWITCHING
   ========================================================================== */
function initToolNavigation() {
    const toolButtons = document.querySelectorAll('.sidebar-left .tool-btn');
    const analysisSections = document.querySelectorAll('.analysis-section');

    toolButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Check if this button is supposed to open a panel (has data-target)
            const targetId = this.getAttribute('data-target');
            
            if (targetId) {
                // Remove active class from all buttons
                toolButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                // Hide all analysis sections
                analysisSections.forEach(section => {
                    section.style.display = 'none';
                });

                // Show the targeted section
                const targetSection = document.getElementById(targetId + '-content');
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
            }
        });
    });

    // Set default active panel on load
    const defaultActiveBtn = document.querySelector('.sidebar-left .tool-btn.active');
    if(defaultActiveBtn && defaultActiveBtn.getAttribute('data-target')) {
        // Trigger a click to set initial state
        defaultActiveBtn.click();
    } else {
        // Fallback default
        document.getElementById('panel-map-content') ? document.getElementById('panel-map-content').style.display = 'block' : null;
    }
}

/* ==========================================================================
   2. MODAL WINDOW MANAGEMENT
   ========================================================================== */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function initModals() {
    // Close modals when clicking outside the modal content
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Expose functions globally for inline onclick handlers in HTML
    window.openModal = openModal;
    window.closeModal = closeModal;
}

/* ==========================================================================
   3. UNIT CONVERTER LOGIC
   ========================================================================== */
function initUnitConverter() {
    const inputVal = document.getElementById('conv-input');
    const outputVal = document.getElementById('conv-output');
    const fromUnit = document.getElementById('conv-from-unit');
    const toUnit = document.getElementById('conv-to-unit');

    if(!inputVal || !outputVal || !fromUnit || !toUnit) return;

    // Conversion Rates relative to 1 Square Foot (Base Unit)
    const areaRates = {
        sqft: 1,
        sqm: 10.7639,
        cent: 435.56,
        acre: 43560,
        hectare: 107639
    };

    function calculateConversion() {
        const val = parseFloat(inputVal.value);
        if (isNaN(val)) {
            outputVal.value = "";
            return;
        }

        const fromRate = areaRates[fromUnit.value];
        const toRate = areaRates[toUnit.value];

        // Convert input to base unit (sqft), then to target unit
        const valInSqFt = val * fromRate;
        const finalVal = valInSqFt / toRate;

        // Format to 2 decimal places if needed
        outputVal.value = finalVal % 1 === 0 ? finalVal : finalVal.toFixed(3);
    }

    // Event Listeners for auto-calculation
    inputVal.addEventListener('input', calculateConversion);
    fromUnit.addEventListener('change', calculateConversion);
    toUnit.addEventListener('change', calculateConversion);
}

/* ==========================================================================
   4. SMART MATERIAL COST ESTIMATOR
   ========================================================================== */
function initMaterialEstimator() {
    // Expose calculation function globally so the HTML button can trigger it
    window.calculateEstimate = function() {
        const areaInput = document.getElementById('est-area-input');
        const storiesSelect = document.getElementById('est-stories');
        const qualitySelect = document.getElementById('est-quality');

        if(!areaInput || !storiesSelect || !qualitySelect) return;

        const baseArea = parseFloat(areaInput.value);
        if (isNaN(baseArea) || baseArea <= 0) {
            alert("Please enter a valid Plinth Area (Sq.Ft)");
            return;
        }

        const stories = parseInt(storiesSelect.value);
        const quality = qualitySelect.value;
        
        // Total built-up area rough approximation (increases with stories)
        const totalBuiltArea = baseArea * stories;

        // Base constants per Sq.Ft (Approximations for Indian Standard Construction)
        let cementMultiplier = 0.4;  // Bags per sq.ft
        let steelMultiplier = 3.0;   // Kg per sq.ft
        let sandMultiplier = 1.8;    // Cu.ft per sq.ft
        let bricksMultiplier = 14;   // Nos per sq.ft
        let costPerSqFt = 2000;      // Base cost in INR

        // Quality multipliers
        if (quality === 'prm') {
            costPerSqFt = 2500;
            steelMultiplier = 3.5; 
        } else if (quality === 'lux') {
            costPerSqFt = 3200;
            steelMultiplier = 4.0;
            cementMultiplier = 0.45;
        }

        // Structural adjustments for multi-story (requires heavier foundation and columns)
        if (stories > 1) {
            steelMultiplier *= (1 + (stories * 0.1));
            cementMultiplier *= (1 + (stories * 0.05));
            costPerSqFt *= 1.05;
        }

        // Perform Calculations
        const totalCement = Math.round(totalBuiltArea * cementMultiplier);
        const totalSteelKg = totalBuiltArea * steelMultiplier;
        const totalSteelTons = (totalSteelKg / 1000).toFixed(2);
        const totalSand = Math.round(totalBuiltArea * sandMultiplier);
        const totalBricks = Math.round(totalBuiltArea * bricksMultiplier);
        const totalCost = Math.round(totalBuiltArea * costPerSqFt);

        // Update UI Elements
        updateElementText('qty-cement', `${totalCement} Bags`);
        updateElementText('qty-steel', `${totalSteelTons} Tons`);
        updateElementText('qty-sand', `${totalSand} Cu.Ft`);
        updateElementText('qty-bricks', `${totalBricks.toLocaleString('en-IN')} Nos`);
        
        // Update Total Cost with Indian Rupee Formatting
        const formattedCost = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(totalCost);
        
        updateElementText('total-project-cost', formattedCost);

        // Update Right Sidebar Summary Card (if visible)
        updateElementText('val-cement', `${totalCement} Bags`);
        updateElementText('val-steel', `${totalSteelTons} Tons`);
        updateElementText('val-sand', `${totalSand} Cu.Ft`);
    };
}

// Utility function to safely update DOM text
function updateElementText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerText = text;
    }
}
