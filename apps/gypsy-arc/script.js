/* ==========================================================================
   GYPSYARC - Core Application & Architectural Engine Logic (v2.6)
   Developed by MG Creations | The Gypsy Cartel (www.thegypsycartel.com)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize All Core Modules
    initToolNavigation();
    initModals();
    initUserProfileDropdown();
    initLanguageSwitcher();
    initUnitConverter();
    initMaterialEstimator();
    initVastuScoreEngine();
    initFloorPlanOverlay();
    initProjectActions();
    initKeyboardShortcuts();

    console.log("GYPSYARC v2.6 System Initialized. Ready for Geospatial & CAD Operations.");
});

/* ==========================================================================
   1. UI NAVIGATION & SIDEBAR PANEL SWITCHING
   ========================================================================== */
function initToolNavigation() {
    const toolButtons = document.querySelectorAll('.sidebar-left .tool-btn');
    const analysisSections = document.querySelectorAll('.analysis-section');
    const collapseBtn = document.querySelector('.sidebar-right .btn-icon-small');
    const rightSidebar = document.querySelector('.sidebar-right');

    toolButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');

            if (targetId) {
                // Update active button state
                toolButtons.forEach(b => {
                    b.classList.remove('active');
                    b.removeAttribute('aria-current');
                });
                this.classList.add('active');
                this.setAttribute('aria-current', 'page');

                // Hide all analysis sections
                analysisSections.forEach(section => {
                    section.style.display = 'none';
                });

                // Show targeted section
                const targetSection = document.getElementById(targetId + '-content');
                if (targetSection) {
                    targetSection.style.display = 'block';
                }

                // Ensure right sidebar is expanded if user selects a tool
                if (rightSidebar && rightSidebar.classList.contains('collapsed')) {
                    rightSidebar.classList.remove('collapsed');
                    rightSidebar.style.display = 'flex';
                }
            }
        });
    });

    // Right Sidebar Collapse/Expand Toggle
    if (collapseBtn && rightSidebar) {
        collapseBtn.addEventListener('click', () => {
            rightSidebar.classList.toggle('collapsed');
            const icon = collapseBtn.querySelector('i');
            if (rightSidebar.classList.contains('collapsed')) {
                rightSidebar.style.width = '48px';
                rightSidebar.style.minWidth = '48px';
                const scrollArea = rightSidebar.querySelector('.panel-scroll-area');
                const headerTitle = rightSidebar.querySelector('.panel-header h3');
                if (scrollArea) scrollArea.style.display = 'none';
                if (headerTitle) headerTitle.style.display = 'none';
                if (icon) icon.className = 'fa-solid fa-angle-left';
            } else {
                rightSidebar.style.width = '';
                rightSidebar.style.minWidth = '';
                const scrollArea = rightSidebar.querySelector('.panel-scroll-area');
                const headerTitle = rightSidebar.querySelector('.panel-header h3');
                if (scrollArea) scrollArea.style.display = 'block';
                if (headerTitle) headerTitle.style.display = 'block';
                if (icon) icon.className = 'fa-solid fa-angle-right';
            }
        });
    }

    // Set default active panel on load
    const defaultActiveBtn = document.querySelector('.sidebar-left .tool-btn.active');
    if (defaultActiveBtn && defaultActiveBtn.getAttribute('data-target')) {
        defaultActiveBtn.click();
    } else {
        const mapPanel = document.getElementById('panel-map-content');
        if (mapPanel) mapPanel.style.display = 'block';
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
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Close active modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            overlays.forEach(overlay => overlay.classList.remove('active'));
        }
    });

    // Expose globally for inline HTML onclick handlers
    window.openModal = openModal;
    window.closeModal = closeModal;
}

/* ==========================================================================
   3. USER PROFILE DROPDOWN (CLICK TOGGLE FIX)
   ========================================================================== */
function initUserProfileDropdown() {
    const userProfile = document.querySelector('.user-profile');
    const dropdownContent = document.querySelector('.user-dropdown-content');

    if (!userProfile || !dropdownContent) return;

    userProfile.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = dropdownContent.classList.toggle('show');
        userProfile.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Prevent clicks inside the dropdown from closing it immediately unless a link is clicked
    dropdownContent.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            dropdownContent.classList.remove('show');
            userProfile.setAttribute('aria-expanded', 'false');
        } else {
            e.stopPropagation();
        }
    });

    // Close dropdown when clicking anywhere else on the page
    window.addEventListener('click', function () {
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
            userProfile.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ==========================================================================
   4. MULTI-LINGUAL ENGINE (EN, ML, HI, AR, TA, TE, KN)
   ========================================================================== */
function initLanguageSwitcher() {
    const langSelect = document.getElementById('languageSelect');
    if (!langSelect) return;

    const translations = {
        en: {
            dir: 'ltr',
            mapTool: 'Map & Area Analyzer',
            vastuTool: 'Smart Vastu Engine',
            estTool: 'Dynamic Cost Estimator',
            rulesTool: 'Statutory Building Rules',
            convTool: 'Universal Unit Converter',
            sunTool: 'Sun Path & Wind Analysis',
            massTool: 'Basic 3D Extrusion',
            refTool: 'Standards & FAQ Guide',
            analysisHeader: 'Analysis & Live Results',
            saveBtn: 'Save Project',
            exportBtn: 'Export'
        },
        ml: {
            dir: 'ltr',
            mapTool: 'മാപ്പ് & ഏരിയ അളക്കൽ',
            vastuTool: 'വാസ്തു പരിശോധന',
            estTool: 'മെറ്റീരിയൽ എസ്റ്റിമേറ്റർ',
            rulesTool: 'ബിൽഡിംഗ് നിയമങ്ങൾ',
            convTool: 'യൂണിറ്റ് കൺവെർട്ടർ',
            sunTool: 'സൂര്യപ്രകാശം & കാറ്റ്',
            massTool: '3D മോഡൽ വ്യൂ',
            refTool: 'നിയമങ്ങളും വിവരങ്ങളും',
            analysisHeader: 'പരിശോധന ഫലങ്ങൾ',
            saveBtn: 'സേവ് ചെയ്യുക',
            exportBtn: 'എക്സ്പോർട്ട്'
        },
        hi: {
            dir: 'ltr',
            mapTool: 'मैप और प्लॉट एरिया',
            vastuTool: 'स्मार्ट वास्तु इंजन',
            estTool: 'लागत और मटेरियल अनुमानक',
            rulesTool: 'भवन निर्माण नियम',
            convTool: 'यूनिट कन्वर्टर',
            sunTool: 'सूर्य पथ और वायु विश्लेषण',
            massTool: '3D एलिवेशन प्रीव्यू',
            refTool: 'मानक और सहायता गाइड',
            analysisHeader: 'विश्लेषण और परिणाम',
            saveBtn: 'प्रोजेक्ट सेव करें',
            exportBtn: 'एक्सपोर्ट'
        },
        ar: {
            dir: 'rtl',
            mapTool: 'تحليل الخريطة والمساحة',
            vastuTool: 'محرك فاستو الذكي',
            estTool: 'حاسبة تكلفة المواد',
            rulesTool: 'قوانين البناء (الإمارات/الهند)',
            convTool: 'محول الوحدات الهندسية',
            sunTool: 'مسار الشمس والرياح',
            massTool: 'معاينة الكتلة ثلاثية الأبعاد',
            refTool: 'دليل المعايير والأسئلة',
            analysisHeader: 'التحليل والنتائج المباشرة',
            saveBtn: 'حفظ المشروع',
            exportBtn: 'تصدير'
        },
        ta: {
            dir: 'ltr',
            mapTool: 'வரைபடம் & நில அளவீடு',
            vastuTool: 'வாஸ்து சோதனை',
            estTool: 'கட்டுமான செலவு கணிப்பான்',
            rulesTool: 'கட்டிட விதிகள்',
            convTool: 'யூனிட் கன்வெர்ட்டர்',
            sunTool: 'சூரிய பாதை & காற்று',
            massTool: '3D மாதிரி காட்சி',
            refTool: 'விதிகள் வழிகாட்டி',
            analysisHeader: 'பகுப்பாய்வு முடிவுகள்',
            saveBtn: 'சேமி',
            exportBtn: 'ஏற்றுமதி'
        },
        te: {
            dir: 'ltr',
            mapTool: 'మ్యాప్ & ప్లాట్ ఏరియా',
            vastuTool: 'వాస్తు తనిఖీ ఇంజిన్',
            estTool: 'నిర్మాణ వ్యయ అంచనా',
            rulesTool: 'భవన నిర్మాణ నియమాలు',
            convTool: 'యూనిట్ కన్వర్టర్',
            sunTool: 'సూర్య మార్గం & గాలి',
            massTool: '3D నమూనా వీక్షణ',
            refTool: 'ప్రమాణాల గైడ్',
            analysisHeader: 'విశ్లేషణ & ఫలితాలు',
            saveBtn: 'సేవ్ చేయండి',
            exportBtn: 'ఎగుమతి'
        },
        kn: {
            dir: 'ltr',
            mapTool: 'ಮ್ಯಾಪ್ ಮತ್ತು ನಿವೇಶನ ವಿಸ್ತೀರ್ಣ',
            vastuTool: 'ವಾಸ್ತು ಪರಿಶೀಲನೆ',
            estTool: 'ನಿರ್ಮಾಣ ವೆಚ್ಚ ಅಂದಾಜು',
            rulesTool: 'ಕಟ್ಟಡ ನಿಯಮಗಳು',
            convTool: 'ಯೂನಿಟ್ ಕನ್ವರ್ಟರ್',
            sunTool: 'ಸೂರ್ಯನ ಪಥ ಮತ್ತು ಗಾಳಿ',
            massTool: '3D ಮಾದರಿ ವೀಕ್ಷಣೆ',
            refTool: 'ಮಾನದಂಡಗಳ ಕೈಪಿಡಿ',
            analysisHeader: 'ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಫಲಿತಾಂಶಗಳು',
            saveBtn: 'ಉಳಿಸಿ',
            exportBtn: 'ರಫ್ತು'
        }
    };

    langSelect.addEventListener('change', function () {
        const lang = this.value;
        const dict = translations[lang] || translations.en;

        document.documentElement.lang = lang;
        document.documentElement.dir = dict.dir;

        const setSpanText = (btnId, text) => {
            const span = document.querySelector(`#${btnId} span`);
            if (span) span.textContent = text;
        };

        setSpanText('tool-map', dict.mapTool);
        setSpanText('tool-vastu', dict.vastuTool);
        setSpanText('tool-estimator', dict.estTool);
        setSpanText('tool-rules', dict.rulesTool);
        setSpanText('tool-converter', dict.convTool);
        setSpanText('tool-sunpath', dict.sunTool);
        setSpanText('tool-3d-preview', dict.massTool);
        setSpanText('tool-reference', dict.refTool);

        const panelTitle = document.querySelector('.sidebar-right .panel-header h3');
        if (panelTitle) panelTitle.textContent = dict.analysisHeader;
    });
}

/* ==========================================================================
   5. UNIVERSAL ARCHITECTURE UNIT CONVERTER (AREA, LENGTH, VOLUME, WEIGHT)
   ========================================================================== */
function initUnitConverter() {
    const inputVal = document.getElementById('conv-input');
    const outputVal = document.getElementById('conv-output');
    const fromUnit = document.getElementById('conv-from-unit');
    const toUnit = document.getElementById('conv-to-unit');
    const tabButtons = document.querySelectorAll('#converterModal .tab-btn');

    if (!inputVal || !outputVal || !fromUnit || !toUnit) return;

    const unitCategories = {
        area: {
            units: [
                { value: 'cent', label: 'Cent (Kerala Standard)' },
                { value: 'sqft', label: 'Square Feet (Sq.Ft)' },
                { value: 'sqm', label: 'Square Meters (Sq.M)' },
                { value: 'are', label: 'Are (Metric Revenue)' },
                { value: 'acre', label: 'Acre' },
                { value: 'hectare', label: 'Hectare' },
                { value: 'guntha', label: 'Guntha' }
            ],
            rates: {
                sqft: 1,
                sqm: 10.7639104,
                cent: 435.56,
                are: 1076.39104,
                guntha: 1089,
                acre: 43560,
                hectare: 107639.104
            },
            defaultFrom: 'cent',
            defaultTo: 'sqft'
        },
        length: {
            units: [
                { value: 'meter', label: 'Meters (m)' },
                { value: 'feet', label: 'Feet (ft)' },
                { value: 'inch', label: 'Inches (in)' },
                { value: 'cm', label: 'Centimeters (cm)' },
                { value: 'mm', label: 'Millimeters (mm)' },
                { value: 'yard', label: 'Yards (yd)' }
            ],
            rates: {
                mm: 1,
                cm: 10,
                inch: 25.4,
                feet: 304.8,
                yard: 914.4,
                meter: 1000
            },
            defaultFrom: 'meter',
            defaultTo: 'feet'
        },
        volume: {
            units: [
                { value: 'cum', label: 'Cubic Meters (m³)' },
                { value: 'cuft', label: 'Cubic Feet (Cu.Ft / CFT)' },
                { value: 'liter', label: 'Liters (L)' },
                { value: 'brass', label: 'Brass (100 Cu.Ft)' }
            ],
            rates: {
                liter: 1,
                cuft: 28.3168466,
                cum: 1000,
                brass: 2831.68466
            },
            defaultFrom: 'cum',
            defaultTo: 'cuft'
        },
        weight: {
            units: [
                { value: 'ton', label: 'Metric Tons (1000 kg)' },
                { value: 'kg', label: 'Kilograms (kg)' },
                { value: 'bag', label: 'Cement Bags (50 kg)' },
                { value: 'quintal', label: 'Quintal (100 kg)' },
                { value: 'lb', label: 'Pounds (lbs)' }
            ],
            rates: {
                lb: 0.453592,
                kg: 1,
                bag: 50,
                quintal: 100,
                ton: 1000
            },
            defaultFrom: 'ton',
            defaultTo: 'kg'
        }
    };

    let currentCategory = 'area';

    function populateUnitSelects(categoryKey) {
        const cat = unitCategories[categoryKey];
        if (!cat) return;

        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';

        cat.units.forEach(u => {
            const opt1 = document.createElement('option');
            opt1.value = u.value;
            opt1.textContent = u.label;
            if (u.value === cat.defaultFrom) opt1.selected = true;
            fromUnit.appendChild(opt1);

            const opt2 = document.createElement('option');
            opt2.value = u.value;
            opt2.textContent = u.label;
            if (u.value === cat.defaultTo) opt2.selected = true;
            toUnit.appendChild(opt2);
        });

        calculateConversion();
    }

    function calculateConversion() {
        const val = parseFloat(inputVal.value);
        if (isNaN(val)) {
            outputVal.value = '';
            return;
        }

        const rates = unitCategories[currentCategory].rates;
        const fromRate = rates[fromUnit.value] || 1;
        const toRate = rates[toUnit.value] || 1;

        const baseVal = val * fromRate;
        const finalVal = baseVal / toRate;

        outputVal.value = Number.isInteger(finalVal)
            ? finalVal
            : parseFloat(finalVal.toFixed(4));
    }

    // Tab Switching inside Unit Converter Modal
    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            const keys = ['area', 'length', 'volume', 'weight'];
            currentCategory = keys[index] || 'area';
            populateUnitSelects(currentCategory);
        });
    });

    inputVal.addEventListener('input', calculateConversion);
    fromUnit.addEventListener('change', calculateConversion);
    toUnit.addEventListener('change', calculateConversion);

    // Initial calculation
    calculateConversion();
}

/* ==========================================================================
   6. SMART MATERIAL & TURNKEY COST ESTIMATOR
   ========================================================================== */
function initMaterialEstimator() {
    const areaInput = document.getElementById('est-area-input');
    const storiesSelect = document.getElementById('est-stories');
    const qualitySelect = document.getElementById('est-quality');
    const foundationSelect = document.getElementById('est-foundation');
    const currencySelect = document.getElementById('default-currency-select');

    window.calculateEstimate = function () {
        if (!areaInput || !storiesSelect || !qualitySelect) return;

        const baseArea = parseFloat(areaInput.value);
        if (isNaN(baseArea) || baseArea <= 0) {
            alert("Please enter a valid Plinth Area (Sq.Ft)");
            return;
        }

        const stories = parseInt(storiesSelect.value) || 1;
        const quality = qualitySelect.value || 'std';
        const foundation = foundationSelect ? foundationSelect.value : 'column';
        const currency = currencySelect ? currencySelect.value : 'INR';

        // Total Built-up Area across all floors
        const totalBuiltArea = baseArea * stories;

        // Standard Civil Engineering Multipliers per Sq.Ft
        let cementMultiplier = 0.40;    // Bags per Sq.Ft
        let steelMultiplier = 3.00;     // Kg per Sq.Ft
        let sandMultiplier = 1.80;      // Cu.Ft per Sq.Ft
        let aggregateMultiplier = 1.35; // Cu.Ft per Sq.Ft
        let bricksMultiplier = 14.0;    // Units per Sq.Ft
        let costPerSqFt = 2150;         // Base Turnkey Rate in INR

        // Finish Quality Adjustments
        if (quality === 'eco') {
            costPerSqFt = 1850;
            steelMultiplier = 2.75;
            cementMultiplier = 0.38;
        } else if (quality === 'prm') {
            costPerSqFt = 2650;
            steelMultiplier = 3.50;
            cementMultiplier = 0.42;
        } else if (quality === 'lux') {
            costPerSqFt = 3400;
            steelMultiplier = 4.10;
            cementMultiplier = 0.45;
        }

        // Foundation Structure Adjustments
        if (foundation === 'pile') {
            steelMultiplier += 0.65;
            cementMultiplier += 0.06;
            costPerSqFt += 220;
        } else if (foundation === 'rubble' && stories === 1) {
            steelMultiplier -= 0.20;
            costPerSqFt -= 60;
        }

        // Multi-Story Structural Adjustments
        if (stories > 1) {
            steelMultiplier *= (1 + ((stories - 1) * 0.08));
            cementMultiplier *= (1 + ((stories - 1) * 0.03));
        }

        // Compute Quantities
        const totalCement = Math.round(totalBuiltArea * cementMultiplier);
        const totalSteelKg = totalBuiltArea * steelMultiplier;
        const totalSteelTons = (totalSteelKg / 1000).toFixed(2);
        const totalSand = Math.round(totalBuiltArea * sandMultiplier);
        const totalAggregate = Math.round(totalBuiltArea * aggregateMultiplier);
        const totalBricks = Math.round(totalBuiltArea * bricksMultiplier);

        // Compute Individual Material Costs (INR Baseline)
        const cementCostINR = totalCement * 420;
        const steelCostINR = parseFloat(totalSteelTons) * 70000;
        const sandCostINR = totalSand * 60;
        const aggregateCostINR = totalAggregate * 55;
        const bricksCostINR = totalBricks * 9;
        const totalTurnkeyCostINR = Math.round(totalBuiltArea * costPerSqFt);

        // Currency Formatting Helper
        function formatMoney(amountINR) {
            if (currency === 'AED') {
                const aed = Math.round(amountINR * 0.044);
                return `AED ${aed.toLocaleString('en-US')}`;
            } else if (currency === 'USD') {
                const usd = Math.round(amountINR * 0.012);
                return `$${usd.toLocaleString('en-US')}`;
            }
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(amountINR);
        }

        // Update DOM Quantities
        updateElementText('qty-cement', `${totalCement.toLocaleString('en-IN')} Bags`);
        updateElementText('qty-steel', `${totalSteelTons} Tons`);
        updateElementText('qty-sand', `${totalSand.toLocaleString('en-IN')} Cu.Ft`);
        updateElementText('qty-aggregate', `${totalAggregate.toLocaleString('en-IN')} Cu.Ft`);
        updateElementText('qty-bricks', `${totalBricks.toLocaleString('en-IN')} Nos`);

        // Update DOM Material Costs
        updateElementText('cost-cement', formatMoney(cementCostINR));
        updateElementText('cost-steel', formatMoney(steelCostINR));
        updateElementText('cost-sand', formatMoney(sandCostINR));
        updateElementText('cost-aggregate', formatMoney(aggregateCostINR));
        updateElementText('cost-bricks', formatMoney(bricksCostINR));
        updateElementText('total-project-cost', formatMoney(totalTurnkeyCostINR));

        // Sync Quick Summary Card at bottom of Right Sidebar
        updateElementText('val-cement', `${totalCement} Bags`);
        updateElementText('val-steel', `${totalSteelTons} Tons`);
        updateElementText('val-sand', `${totalSand.toLocaleString('en-IN')} Cu.Ft`);
    };

    // Auto-recalculate when dropdowns or inputs change
    [areaInput, storiesSelect, qualitySelect, foundationSelect, currencySelect].forEach(el => {
        if (el) {
            el.addEventListener('change', () => window.calculateEstimate());
        }
    });
}

/* ==========================================================================
   7. SMART VASTU PURUSHA MANDALA SCORE ENGINE
   ========================================================================== */
function initVastuScoreEngine() {
    const vastuSelects = document.querySelectorAll('#panel-vastu-content .status-select');
    const scoreBadge = document.getElementById('vastu-overall-score');

    if (!vastuSelects.length || !scoreBadge) return;

    const scoreWeights = {
        'vastu-kitchen': { se: 100, nw: 75, e: 50, ne: 0, sw: 0 },
        'vastu-masterbed': { sw: 100, s: 80, w: 75, se: 10, ne: 0 },
        'vastu-pooja': { ne: 100, e: 85, n: 85, c: 90, s: 0 },
        'vastu-entrance': { e: 100, n: 100, ne: 90, w: 75, sw: 0 },
        'vastu-staircase': { sw: 100, w: 85, nw: 70, ne: 0, c: 0 },
        'vastu-well': { ne: 100, n: 85, e: 80, sw: 0 },
        'vastu-septic': { nw: 100, w: 75, se: 50, ne: 0, sw: 0 }
    };

    function evaluateVastuCompliance() {
        let totalPoints = 0;
        let count = 0;

        vastuSelects.forEach(sel => {
            const id = sel.id;
            const val = sel.value;
            if (scoreWeights[id] && scoreWeights[id][val] !== undefined) {
                totalPoints += scoreWeights[id][val];
                count++;
            }
        });

        if (count === 0) return;
        const avgScore = Math.round(totalPoints / count);

        let statusLabel = 'Compliant';
        scoreBadge.classList.remove('badge-success', 'badge-warning');

        if (avgScore >= 80) {
            statusLabel = 'Auspicious (Pass)';
            scoreBadge.classList.add('badge-success');
        } else if (avgScore >= 55) {
            statusLabel = 'Moderate';
            scoreBadge.classList.add('badge-warning');
        } else {
            statusLabel = 'Needs Remedy';
            scoreBadge.classList.add('badge-warning');
        }

        scoreBadge.textContent = `Score: ${avgScore}% - ${statusLabel}`;
    }

    vastuSelects.forEach(sel => {
        sel.addEventListener('change', evaluateVastuCompliance);
    });

    evaluateVastuCompliance();
}

/* ==========================================================================
   8. 2D CAD / IMAGE FLOOR PLAN OVERLAY UPLOADER
   ========================================================================== */
function initFloorPlanOverlay() {
    const uploadInput = document.getElementById('cad-plan-upload');
    const uploadToolbarBtn = document.querySelector('.draw-btn[title="Upload CAD/Image Floor Plan Overlay (O)"]');
    const opacitySlider = document.getElementById('overlay-opacity');
    const scaleSlider = document.getElementById('overlay-scale');
    const mapContainer = document.getElementById('map-canvas-container');

    if (!mapContainer) return;

    let planOverlayImg = null;

    if (uploadToolbarBtn && uploadInput) {
        uploadToolbarBtn.addEventListener('click', () => {
            // Switch to Map & Area panel and trigger file dialog
            const mapToolBtn = document.getElementById('tool-map');
            if (mapToolBtn) mapToolBtn.click();
            uploadInput.click();
        });
    }

    if (uploadInput) {
        uploadInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (evt) {
                if (!planOverlayImg) {
                    planOverlayImg = document.createElement('img');
                    planOverlayImg.id = 'uploaded-floorplan-overlay';
                    planOverlayImg.alt = 'Uploaded 2D Floor Plan Overlay';
                    planOverlayImg.style.position = 'absolute';
                    planOverlayImg.style.top = '50%';
                    planOverlayImg.style.left = '50%';
                    planOverlayImg.style.transform = 'translate(-50%, -50%) scale(1)';
                    planOverlayImg.style.maxWidth = '65%';
                    planOverlayImg.style.maxHeight = '65%';
                    planOverlayImg.style.opacity = '0.75';
                    planOverlayImg.style.pointerEvents = 'none';
                    planOverlayImg.style.zIndex = '5';
                    planOverlayImg.style.border = '2px dashed #FFA500';
                    mapContainer.appendChild(planOverlayImg);
                }
                planOverlayImg.src = evt.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    if (opacitySlider) {
        opacitySlider.addEventListener('input', function () {
            if (planOverlayImg) {
                planOverlayImg.style.opacity = (this.value / 100).toString();
            }
        });
    }

    if (scaleSlider) {
        scaleSlider.addEventListener('input', function () {
            if (planOverlayImg) {
                const scaleFactor = this.value / 100;
                planOverlayImg.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
            }
        });
    }
}

/* ==========================================================================
   9. PROJECT RENAME, TEMPLATES & SAVE ACTIONS
   ========================================================================== */
function initProjectActions() {
    const projectTitle = document.getElementById('active-project-title');
    const saveBtn = document.getElementById('btn-save-project');
    const saveStatus = document.querySelector('.save-status');

    if (projectTitle) {
        projectTitle.style.cursor = 'pointer';
        projectTitle.addEventListener('click', () => {
            const newName = prompt('Enter Architectural Project Name:', projectTitle.textContent);
            if (newName && newName.trim() !== '') {
                projectTitle.textContent = newName.trim();
            }
        });
    }

    if (saveBtn && saveStatus) {
        saveBtn.addEventListener('click', () => {
            saveStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Syncing to cloud...';
            setTimeout(() => {
                saveStatus.innerHTML = '<i class="fa-solid fa-cloud-check"></i> Saved just now';
            }, 600);
        });
    }
}

/* ==========================================================================
   10. KEYBOARD SHORTCUTS (V, P, L, G, U, DEL)
   ========================================================================== */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
        // Ignore shortcuts when typing inside inputs or selects
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

        const key = e.key.toLowerCase();
        if (key === 'v') {
            const btn = document.querySelector('.draw-btn[title="Select Pointer (V)"]');
            if (btn) btn.click();
        } else if (key === 'p') {
            const btn = document.querySelector('.draw-btn[title="Draw Plot Boundary (Polygon)"]');
            if (btn) btn.click();
        } else if (key === 'g') {
            const btn = document.querySelector('.draw-btn[title="Toggle Vastu Compass Grid (G)"]');
            if (btn) btn.click();
        } else if (key === 'u') {
            openModal('converterModal');
        } else if (e.key === 'Delete') {
            const btn = document.querySelector('.draw-btn[title="Clear Map"]');
            if (btn) btn.click();
        }
    });
}

/* ==========================================================================
   11. GOOGLE MAPS & GEOSPATIAL DRAWING ENGINE
   ========================================================================== */
let map = null;
let drawingManager = null;
let currentPlot = null;

function initGoogleMap() {
    const mapContainer = document.getElementById('map-canvas-container');
    if (!mapContainer || typeof google === 'undefined' || !google.maps) {
        console.warn("Google Maps API not detected yet.");
        return;
    }

    // Default Coordinates: Kozhikode / Kerala
    const startLocation = { lat: 11.2588, lng: 75.7804 };

    map = new google.maps.Map(mapContainer, {
        center: startLocation,
        zoom: 19,
        mapTypeId: 'satellite',
        tilt: 0,
        disableDefaultUI: true
    });

    // Update live Lat/Lng coordinates on cursor move
    map.addListener('mousemove', (e) => {
        if (e.latLng) {
            updateElementText('lbl-lat', e.latLng.lat().toFixed(4));
            updateElementText('lbl-lng', e.latLng.lng().toFixed(4));
        }
    });

    // Initialize Drawing Manager
    if (google.maps.drawing) {
        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: false,
            polygonOptions: {
                fillColor: "#FFA500",
                fillOpacity: 0.35,
                strokeWeight: 2,
                strokeColor: "#FFA500",
                editable: true,
                draggable: false,
                zIndex: 1
            },
            rectangleOptions: {
                fillColor: "#FFA500",
                fillOpacity: 0.35,
                strokeWeight: 2,
                strokeColor: "#FFA500",
                editable: true,
                zIndex: 1
            },
            polylineOptions: {
                strokeColor: "#00ADB5",
                strokeWeight: 3,
                editable: true
            }
        });

        drawingManager.setMap(map);

        // Polygon Complete Event
        google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
            if (currentPlot) currentPlot.setMap(null);
            currentPlot = polygon;

            drawingManager.setDrawingMode(null);
            const pointerBtn = document.querySelector('.draw-btn[title="Select Pointer (V)"]');
            if (pointerBtn) setActiveDrawBtn(pointerBtn);

            calculatePlotArea();

            polygon.getPath().addListener('set_at', calculatePlotArea);
            polygon.getPath().addListener('insert_at', calculatePlotArea);
            polygon.getPath().addListener('remove_at', calculatePlotArea);
        });
    }

    setupCustomMapControls();
}

function setupCustomMapControls() {
    const pointerBtn = document.querySelector('.draw-btn[title="Select Pointer (V)"]');
    const drawPolygonBtn = document.querySelector('.draw-btn[title="Draw Plot Boundary (Polygon)"]');
    const drawRectBtn = document.querySelector('.draw-btn[title="Draw Rectangular Plot (R)"]');
    const drawLineBtn = document.querySelector('.draw-btn[title="Draw Setback Line (L)"]');
    const deleteBtn = document.querySelector('.draw-btn[title="Clear Map"]');

    if (pointerBtn) {
        pointerBtn.addEventListener('click', function () {
            setActiveDrawBtn(this);
            if (drawingManager) drawingManager.setDrawingMode(null);
        });
    }

    if (drawPolygonBtn) {
        drawPolygonBtn.addEventListener('click', function () {
            setActiveDrawBtn(this);
            if (drawingManager && google.maps.drawing) {
                drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
            }
        });
    }

    if (drawRectBtn) {
        drawRectBtn.addEventListener('click', function () {
            setActiveDrawBtn(this);
            if (drawingManager && google.maps.drawing) {
                drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
            }
        });
    }

    if (drawLineBtn) {
        drawLineBtn.addEventListener('click', function () {
            setActiveDrawBtn(this);
            if (drawingManager && google.maps.drawing) {
                drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
            }
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', function () {
            if (currentPlot) {
                currentPlot.setMap(null);
                currentPlot = null;
            }
            updatePlotMetricsUI(0, 0);
        });
    }

    // Map Type Toggle Buttons (Map / Satellite / Hybrid / Terrain)
    const mapTypeBtns = document.querySelectorAll('.map-type-btn');
    mapTypeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            mapTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const mapType = this.getAttribute('data-type');
            if (map && mapType) {
                map.setMapTypeId(mapType);
            }
        });
    });

    // Zoom Controls
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomCurrentBtn = document.getElementById('zoom-current');

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (map) map.setZoom(map.getZoom() + 1);
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (map) map.setZoom(map.getZoom() - 1);
        });
    }

    if (zoomCurrentBtn) {
        zoomCurrentBtn.addEventListener('click', () => {
            if (navigator.geolocation && map) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const userLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    map.setCenter(userLoc);
                    map.setZoom(19);
                    updateElementText('lbl-lat', userLoc.lat.toFixed(4));
                    updateElementText('lbl-lng', userLoc.lng.toFixed(4));
                });
            }
        });
    }
}

function setActiveDrawBtn(activeBtn) {
    document.querySelectorAll('.drawing-toolbar .draw-btn').forEach(btn => {
        if (btn.getAttribute('title') !== 'Toggle Vastu Compass Grid (G)') {
            btn.classList.remove('active');
        }
    });
    activeBtn.classList.add('active');
}

function calculatePlotArea() {
    if (!currentPlot || !google.maps.geometry) return;

    const path = currentPlot.getPath();
    const areaSqMeters = google.maps.geometry.spherical.computeArea(path);
    const perimeterMeters = google.maps.geometry.spherical.computeLength(path);

    updatePlotMetricsUI(areaSqMeters, perimeterMeters);
}

function updatePlotMetricsUI(areaSqMeters, perimeterMeters) {
    const areaSqFt = areaSqMeters * 10.7639104;
    const areaCent = areaSqFt / 435.56;
    const areaAres = areaSqMeters / 100;

    // Update Bottom Floating Status Bar
    updateElementText('lbl-area-cent', `${areaCent.toFixed(2)} Cents`);
    updateElementText('lbl-area-sqft', Math.round(areaSqFt).toLocaleString('en-IN'));
    updateElementText('lbl-perimeter', `${perimeterMeters.toFixed(1)} m`);

    // Update Right Sidebar Map & Area Stat Cards
    updateElementText('stat-val-cents', `${areaCent.toFixed(2)} Cents`);
    updateElementText('stat-val-sqft', `${Math.round(areaSqFt).toLocaleString('en-IN')} Sq.Ft`);
    updateElementText('stat-val-sqm', `${areaSqMeters.toFixed(2)} Sq.M`);
    updateElementText('stat-val-ares', `${areaAres.toFixed(2)} Ares`);

    // Sync with Land Partition Calculator Input
    const partInput = document.getElementById('partition-total-cents');
    if (partInput && areaCent > 0) {
        partInput.value = areaCent.toFixed(2);
        partInput.dispatchEvent(new Event('input'));
    }
}

// Expose initGoogleMap globally for Google Maps async callback
window.initGoogleMap = initGoogleMap;

// Utility function to safely update DOM text
function updateElementText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerText = text;
    }
}
