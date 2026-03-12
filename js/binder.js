// js/binder.js

import { buildGmvSummary } from "./home/gmvSummaryEngine.js";
import { buildAdsSummary } from "./home/adsSummaryEngine.js";

import { renderCardGrid } from "./ui/cardRenderer.js";
import { renderChartContainer } from "./ui/chartContainer.js";
import { renderTable } from "./ui/tableRenderer.js";

import { buildGmvSalesNetChart } from "./charts/gmvSalesNetChart.js";
import { buildCdrSpendRevenueChart } from "./charts/cdrSpendRevenueChart.js";

import { buildCampaignRoiReport } from "./reports/cdr/campaignRoiReport.js";
import { buildSkuRoiReport } from "./reports/cfr/skuRoiReport.js";

import { buildSkuIntelligence } from "./core/skuIntelligenceEngine.js";

export let currentPage = "HOME";

export function setPage(page) {
    currentPage = page;
}

export function renderCurrentPage(data) {

    if (currentPage === "HOME") renderHome(data);
    if (currentPage === "CDR") renderCampaignReport(data);
    if (currentPage === "SKU_ROI") renderSkuRoiReport(data);

}

export function renderHome(data) {

    currentPage = "HOME";

    const app = document.getElementById("app");

    app.innerHTML = "";

    const dashboard = document.createElement("div");

    const gmvCards = renderCardGrid(buildGmvSummary(data.GMV));
    dashboard.appendChild(gmvCards);

    const gmvChart = renderChartContainer(
        "GMV vs Net Sales",
        "gmvChart",
        buildGmvSalesNetChart(data.GMV)
    );

    dashboard.appendChild(gmvChart);

    const adsCards = renderCardGrid(buildAdsSummary(data.CDR));
    dashboard.appendChild(adsCards);

    const adsChart = renderChartContainer(
        "Daily Ad Spend vs Ad Revenue",
        "adsChart",
        buildCdrSpendRevenueChart(data.CDR)
    );

    dashboard.appendChild(adsChart);

    app.appendChild(dashboard);

}

export function renderCampaignReport(data) {

    currentPage = "CDR";

    const app = document.getElementById("app");

    app.innerHTML = "";

    const report = buildCampaignRoiReport(data.CDR);

    const table = renderTable(report.columns, report.rows);

    app.appendChild(table);

}

export function renderSkuRoiReport(data) {

    currentPage = "SKU_ROI";

    const app = document.getElementById("app");

    app.innerHTML = "";

    const skuIntel = buildSkuIntelligence(data);

    const report = buildSkuRoiReport(skuIntel);

    const table = renderTable(report.columns, report.rows);

    app.appendChild(table);

}
