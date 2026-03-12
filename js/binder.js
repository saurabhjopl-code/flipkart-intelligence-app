// js/binder.js

import { buildGmvSummary } from "./home/gmvSummaryEngine.js";
import { buildAdsSummary } from "./home/adsSummaryEngine.js";

import { renderCardGrid } from "./ui/cardRenderer.js";
import { renderChartContainer } from "./ui/chartContainer.js";

import { buildGmvSalesNetChart } from "./charts/gmvSalesNetChart.js";
import { buildCdrSpendRevenueChart } from "./charts/cdrSpendRevenueChart.js";



export async function renderHome(filteredData) {

    console.log("Rendering Home dashboard...");

    const app = document.getElementById("app");

    if (!app) {
        console.error("App container missing");
        return;
    }

    app.innerHTML = "";



    const dashboard = document.createElement("div");
    dashboard.className = "dashboard-container";



    // GMV SUMMARY
    const gmvSummaryData = buildGmvSummary(filteredData.GMV);

    const gmvSummarySection = document.createElement("div");
    gmvSummarySection.className = "summary-section";

    const gmvTitle = document.createElement("h2");
    gmvTitle.innerText = "GMV Summary";

    gmvSummarySection.appendChild(gmvTitle);

    const gmvCards = renderCardGrid(gmvSummaryData);

    gmvSummarySection.appendChild(gmvCards);

    dashboard.appendChild(gmvSummarySection);



    // GMV CHART

    const gmvChartData = buildGmvSalesNetChart(filteredData.GMV);

    const gmvChartSection = renderChartContainer(
        "GMV vs Net Sales",
        "gmv-chart",
        gmvChartData
    );

    dashboard.appendChild(gmvChartSection);



    // ADS SUMMARY

    const adsSummaryData = buildAdsSummary(filteredData.CDR);

    const adsSummarySection = document.createElement("div");

    adsSummarySection.className = "summary-section";

    const adsTitle = document.createElement("h2");

    adsTitle.innerText = "Ads Summary";

    adsSummarySection.appendChild(adsTitle);

    const adsCards = renderCardGrid(adsSummaryData);

    adsSummarySection.appendChild(adsCards);

    dashboard.appendChild(adsSummarySection);



    // ADS CHART

    const adsChartData = buildCdrSpendRevenueChart(filteredData.CDR);

    const adsChartSection = renderChartContainer(
        "Daily Ad Spend vs Ad Revenue",
        "ads-chart",
        adsChartData
    );

    dashboard.appendChild(adsChartSection);



    app.appendChild(dashboard);

}
