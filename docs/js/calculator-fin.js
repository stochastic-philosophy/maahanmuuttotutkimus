// NPV Calculator for Immigration Investment Analysis
class NPVCalculator {
    constructor() {
        this.parameters = {
            multiplier: 3.4,
            employment: 60,
            salary: 2800,
            discount: 3,
            period: 20
        };
        
        this.scenarios = {
            pessimistic: { multiplier: 2.5, employment: 50, salary: 2400, discount: 4 },
            realistic: { multiplier: 3.4, employment: 60, salary: 2800, discount: 3 },
            optimistic: { multiplier: 4.3, employment: 70, salary: 3200, discount: 2 },
            original: { multiplier: 1.25, employment: 45, salary: 2600, discount: 3 }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAllValues();
        this.calculateAndDisplay();
        this.updateScenarioComparison();
        this.initializeCharts();
    }

    setupEventListeners() {
        // Range inputs
        ['multiplier', 'employment', 'salary', 'discount', 'period'].forEach(param => {
            const slider = document.getElementById(param);
            if (slider) {
                slider.addEventListener('input', (e) => {
                    this.parameters[param] = parseFloat(e.target.value);
                    this.updateDisplay(param);
                    this.calculateAndDisplay();
                    this.updateCharts();
                });
            }
        });
    }

    updateDisplay(param) {
        const valueDisplay = document.getElementById(`${param}-value`);
        if (valueDisplay) {
            let value = this.parameters[param];
            if (param === 'employment') {
                valueDisplay.textContent = Math.round(value);
            } else if (param === 'salary') {
                valueDisplay.textContent = Math.round(value);
            } else if (param === 'period') {
                valueDisplay.textContent = Math.round(value);
                document.getElementById('result-period').textContent = Math.round(value);
            } else {
                valueDisplay.textContent = value.toFixed(1);
            }
        }
    }

    updateAllValues() {
        Object.keys(this.parameters).forEach(param => {
            this.updateDisplay(param);
            const slider = document.getElementById(param);
            if (slider) {
                slider.value = this.parameters[param];
            }
        });
    }

    // Core NPV calculation
    calculateNPV() {
        const { multiplier, employment, salary, discount, period } = this.parameters;
        const employmentRate = employment / 100;
        const discountRate = discount / 100;
        
        let totalNPV = 0;
        let paybackYear = 0;
        let cumulativeCashFlow = 0;
        const yearlyData = [];

        for (let year = 1; year <= period; year++) {
            // Employment progression model
            let yearlyEmployment;
            if (year <= 2) yearlyEmployment = 0.15;
            else if (year <= 5) yearlyEmployment = Math.min(employmentRate * 0.67, 0.45);
            else if (year <= 10) yearlyEmployment = employmentRate;
            else yearlyEmployment = Math.min(employmentRate * 1.08, 0.8);

            // Calculate revenues
            const annualGrossIncome = salary * 12 * yearlyEmployment;
            const directTaxes = annualGrossIncome * 0.31; // Effective tax rate
            const consumptionTaxes = annualGrossIncome * 0.69 * 0.24; // After tax income * VAT
            const indirectTaxes = directTaxes * (multiplier - 1) * 0.4; // Multiplier effect
            const totalRevenues = directTaxes + consumptionTaxes + indirectTaxes;

            // Calculate costs (decreasing over time)
            let costs;
            if (year <= 2) costs = 15000;
            else if (year <= 5) costs = 12000 * (1 - yearlyEmployment * 0.3);
            else if (year <= 10) costs = 8000 * (1 - yearlyEmployment * 0.5);
            else costs = 6000 * (1 - yearlyEmployment * 0.6);

            const netCashFlow = totalRevenues - costs;
            const discountedCashFlow = netCashFlow / Math.pow(1 + discountRate, year);
            
            totalNPV += discountedCashFlow;
            cumulativeCashFlow += netCashFlow;
            
            if (cumulativeCashFlow > 0 && paybackYear === 0) {
                paybackYear = year;
            }

            yearlyData.push({
                year,
                employment: yearlyEmployment,
                revenues: totalRevenues,
                costs,
                netCashFlow,
                discountedCashFlow,
                cumulativeNPV: totalNPV
            });
        }

        return {
            npv: totalNPV,
            paybackPeriod: paybackYear,
            averageAnnualCashFlow: yearlyData.reduce((sum, d) => sum + d.netCashFlow, 0) / period,
            roi: totalNPV / (yearlyData.slice(0, 3).reduce((sum, d) => sum + d.costs, 0)),
            yearlyData
        };
    }

    calculateAndDisplay() {
        const results = this.calculateNPV();
        
        // Update result displays
        document.getElementById('result-npv').textContent = `${Math.round(results.npv).toLocaleString('fi-FI')}€`;
        document.getElementById('result-npv').className = results.npv > 0 ? 'result-value' : 'result-value negative';
        
        document.getElementById('result-payback').textContent = results.paybackPeriod > 0 ? 
            `${results.paybackPeriod} vuotta` : 'Ei kannattava';
        
        document.getElementById('result-annual').textContent = `${Math.round(results.averageAnnualCashFlow).toLocaleString('fi-FI')}€`;
        document.getElementById('result-annual').className = results.averageAnnualCashFlow > 0 ? 'result-value' : 'result-value negative';
        
        document.getElementById('result-roi').textContent = results.roi.toFixed(2);

        // Assessment
        let assessment;
        if (results.npv > 150000) assessment = 'Erittäin kannattava';
        else if (results.npv > 50000) assessment = 'Kannattava';
        else if (results.npv > 0) assessment = 'Marginaalisesti kannattava';
        else assessment = 'Kannattamaton';
        
        document.getElementById('result-assessment').textContent = assessment;
        document.getElementById('result-assessment').className = results.npv > 0 ? 'result-value' : 'result-value negative';

        this.lastResults = results;
    }

    updateScenarioComparison() {
        const tbody = document.getElementById('scenario-comparison');
        if (!tbody) return;

        let html = '';
        Object.entries(this.scenarios).forEach(([name, params]) => {
            const tempParams = { ...this.parameters };
            Object.assign(this.parameters, params, { period: 20 });
            
            const results = this.calculateNPV();
            const nameMap = {
                pessimistic: 'Pessimistinen',
                realistic: 'Realistinen', 
                optimistic: 'Optimistinen',
                original: 'Alkuperäinen'
            };

            const rowClass = name === 'realistic' ? 'style="background-color: var(--bg-secondary); font-weight: bold;"' : '';
            html += `
                <tr ${rowClass}>
                    <td>${nameMap[name]}</td>
                    <td>${params.multiplier}</td>
                    <td>${params.employment}%</td>
                    <td style="color: ${results.npv > 0 ? 'var(--success)' : 'var(--danger)'}">${Math.round(results.npv).toLocaleString('fi-FI')}€</td>
                    <td>${results.paybackPeriod > 0 ? results.paybackPeriod + 'v' : 'Ei kannattava'}</td>
                </tr>
            `;
            
            this.parameters = tempParams; // Restore original parameters
        });
        tbody.innerHTML = html;
    }

    setScenario(scenarioName) {
        if (this.scenarios[scenarioName]) {
            Object.assign(this.parameters, this.scenarios[scenarioName]);
            this.updateAllValues();
            this.calculateAndDisplay();
            this.updateCharts();
        }
    }

    setWhatIfScenario(whatIfType) {
        const whatIfScenarios = {
            'better-integration': { employment: 75, multiplier: 3.6 },
            'recession': { employment: 45, salary: 2400, discount: 4 },
            'high-multiplier': { multiplier: 4.3 },
            'inflation': { discount: 5, salary: 2600 }
        };

        if (whatIfScenarios[whatIfType]) {
            Object.assign(this.parameters, whatIfScenarios[whatIfType]);
            this.updateAllValues();
            this.calculateAndDisplay();
            this.updateCharts();
        }
    }

    initializeCharts() {
        this.updateCharts();
        this.updateSensitivityAnalysis();
    }

    updateCharts() {
        this.drawNPVChart();
    }

    drawNPVChart() {
        const canvas = document.getElementById('npvChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const results = this.lastResults || this.calculateNPV();
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const padding = 60;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;
        
        const maxNPV = Math.max(...results.yearlyData.map(d => d.cumulativeNPV)) * 1.1;
        const minNPV = Math.min(...results.yearlyData.map(d => d.cumulativeNPV), 0) * 1.1;
        const maxCashFlow = Math.max(...results.yearlyData.map(d => d.netCashFlow));
        const minCashFlow = Math.min(...results.yearlyData.map(d => d.netCashFlow));
        
        // Draw axes
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Zero lines
        const zeroNPVY = canvas.height - padding - ((0 - minNPV) / (maxNPV - minNPV)) * chartHeight;
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(padding, zeroNPVY);
        ctx.lineTo(canvas.width - padding, zeroNPVY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw cumulative NPV line
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.beginPath();
        results.yearlyData.forEach((data, index) => {
            const x = padding + (data.year / this.parameters.period) * chartWidth;
            const y = canvas.height - padding - ((data.cumulativeNPV - minNPV) / (maxNPV - minNPV)) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw annual cash flow bars
        const barWidth = chartWidth / (this.parameters.period * 1.5);
        ctx.fillStyle = 'rgba(231, 76, 60, 0.6)';
        
        results.yearlyData.forEach((data) => {
            const x = padding + (data.year / this.parameters.period) * chartWidth - barWidth / 2;
            const cashFlowNormalized = (data.netCashFlow - minCashFlow) / (maxCashFlow - minCashFlow);
            const barHeight = cashFlowNormalized * chartHeight * 0.3; // Scale down bars
            const y = canvas.height - padding - barHeight;
            
            ctx.fillRect(x, y, barWidth, barHeight);
        });

        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.fillText('Vuosi', canvas.width - 50, canvas.height - 20);
        ctx.save();
        ctx.translate(20, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('NPV (€)', 0, 0);
        ctx.restore();
        
        // Y-axis labels
        for (let i = 0; i <= 5; i++) {
            const value = minNPV + (maxNPV - minNPV) * (i / 5);
            const y = canvas.height - padding - (i / 5) * chartHeight;
            ctx.fillText(`${Math.round(value / 1000)}k€`, 5, y + 4);
        }
        
        // X-axis labels
        for (let i = 0; i <= 4; i++) {
            const year = (this.parameters.period / 4) * i;
            const x = padding + (i / 4) * chartWidth;
            ctx.fillText(Math.round(year), x - 10, canvas.height - 30);
        }
    }

    updateSensitivityAnalysis() {
        const canvas = document.getElementById('sensitivityChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 60;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;

        // Test multiplier sensitivity
        const baseParams = { ...this.parameters };
        const multipliers = [];
        const npvs = [];
        
        for (let m = 2.0; m <= 5.0; m += 0.2) {
            this.parameters.multiplier = m;
            const result = this.calculateNPV();
            multipliers.push(m);
            npvs.push(result.npv);
        }
        
        this.parameters = baseParams; // Restore

        // Draw chart
        const maxNPV = Math.max(...npvs) * 1.1;
        const minNPV = Math.min(...npvs, 0) * 1.1;

        // Axes
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Data line
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        multipliers.forEach((mult, index) => {
            const x = padding + ((mult - 2.0) / 3.0) * chartWidth;
            const y = canvas.height - padding - ((npvs[index] - minNPV) / (maxNPV - minNPV)) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Mark current value
        const currentX = padding + ((this.parameters.multiplier - 2.0) / 3.0) * chartWidth;
        const currentResult = this.calculateNPV();
        const currentY = canvas.height - padding - ((currentResult.npv - minNPV) / (maxNPV - minNPV)) * chartHeight;
        
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.fillText('Multiplikaattori', canvas.width - 100, canvas.height - 20);
        ctx.save();
        ctx.translate(20, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('NPV (€)', 0, 0);
        ctx.restore();

        // Update sensitivity insights
        this.updateSensitivityInsights();
    }

    updateSensitivityInsights() {
        const insightsDiv = document.getElementById('sensitivity-insights');
        if (!insightsDiv) return;

        const baseResult = this.calculateNPV();
        const baseNPV = baseResult.npv;

        // Test different parameters
        const tempParams = { ...this.parameters };
        
        // Multiplier sensitivity
        this.parameters.multiplier = 2.5;
        const lowMultNPV = this.calculateNPV().npv;
        this.parameters.multiplier = 4.3;
        const highMultNPV = this.calculateNPV().npv;
        
        // Employment sensitivity
        this.parameters = { ...tempParams };
        this.parameters.employment = 45;
        const lowEmpNPV = this.calculateNPV().npv;
        this.parameters.employment = 75;
        const highEmpNPV = this.calculateNPV().npv;
        
        this.parameters = tempParams; // Restore

        const multSensitivity = Math.abs(highMultNPV - lowMultNPV);
        const empSensitivity = Math.abs(highEmpNPV - lowEmpNPV);

        insightsDiv.innerHTML = `
            <div class="methodology-grid">
                <div class="method-card">
                    <h4>📊 Multiplikaattorin herkkyys</h4>
                    <p>NPV vaihteluväli: ${Math.round(multSensitivity / 1000)}k€</p>
                    <p>Kriittinen tekijä: ${multSensitivity > 100000 ? 'Kyllä' : 'Ei'}</p>
                </div>
                <div class="method-card">
                    <h4>👥 Työllisyyden herkkyys</h4>
                    <p>NPV vaihteluväli: ${Math.round(empSensitivity / 1000)}k€</p>
                    <p>Kriittinen tekijä: ${empSensitivity > 80000 ? 'Kyllä' : 'Ei'}</p>
                </div>
            </div>
        `;
    }
}

// Global functions for scenario buttons
function setScenario(scenarioName) {
    if (window.npvCalculator) {
        window.npvCalculator.setScenario(scenarioName);
    }
}

function setWhatIf(whatIfType) {
    if (window.npvCalculator) {
        window.npvCalculator.setWhatIfScenario(whatIfType);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the calculator page
    if (document.getElementById('calculator-results')) {
        window.npvCalculator = new NPVCalculator();
    }
});
