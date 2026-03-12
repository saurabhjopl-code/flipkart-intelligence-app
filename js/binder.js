import { renderCardGrid } from "./ui/cardRenderer.js";
import { renderChartContainer } from "./ui/chartContainer.js";
import { renderTable } from "./ui/tableRenderer.js";

import { buildGmvSummary } from "./home/gmvSummaryEngine.js";
import { buildAdsSummary } from "./home/adsSummaryEngine.js";

import { buildGmvSalesNetChart } from "./charts/gmvSalesNetChart.js";
import { buildCdrSpendRevenueChart } from "./charts/cdrSpendRevenueChart.js";

import { buildCampaignRoiReport } from "./reports/cdr/campaignRoiReport.js";
import { buildCampaignSpendTrend } from "./reports/cdr/campaignSpendTrend.js";
import { buildCampaignEfficiencyReport } from "./reports/cdr/campaignEfficiencyReport.js";
import { buildBudgetAllocationReport } from "./reports/cdr/budgetAllocationReport.js";

import { buildSkuRoiReport } from "./reports/cfr/skuRoiReport.js";
import { buildHeroSkuReport } from "./reports/cfr/heroSkuReport.js";
import { buildAdWasteReport } from "./reports/cfr/adWasteReport.js";
import { buildAdDependencyReport } from "./reports/cfr/adDependencyReport.js";

import { buildKeywordRoiReport } from "./reports/ckr/keywordRoiReport.js";
import { buildKeywordEfficiencyReport } from "./reports/ckr/keywordEfficiencyReport.js";
import { buildKeywordOpportunityReport } from "./reports/ckr/keywordOpportunityReport.js";
import { buildNegativeKeywordReport } from "./reports/ckr/negativeKeywordReport.js";

import { buildPlacementRoiReport } from "./reports/ppr/placementRoiReport.js";
import { buildPlacementCtrReport } from "./reports/ppr/placementCtrReport.js";
import { buildPlacementConversionReport } from "./reports/ppr/placementConversionReport.js";

import { buildHeroProductReport } from "./reports/gmv/heroProductReport.js";
import { buildCategoryPerformanceReport } from "./reports/gmv/categoryPerformanceReport.js";
import { buildReturnRiskReport } from "./reports/gmv/returnRiskReport.js";
import { buildGrowthMomentumReport } from "./reports/gmv/growthMomentumReport.js";

import { buildSkuIntelligence } from "./core/skuIntelligenceEngine.js";

let currentPage = "HOME";

export function setPage(page) {
    currentPage = page;
}

export function renderCurrentPage(data) {

    switch(currentPage){

        case "HOME":
            renderHome(data); break;

        case "CDR_ROI":
            renderTablePage(buildCampaignRoiReport(data.CDR)); break;

        case "CDR_SPEND":
            renderTablePage(buildCampaignSpendTrend(data.CDR)); break;

        case "CDR_EFF":
            renderTablePage(buildCampaignEfficiencyReport(data.CDR)); break;

        case "CDR_BUDGET":
            renderTablePage(buildBudgetAllocationReport(data.CDR)); break;

        case "CFR_SKU_ROI":
            renderTablePage(buildSkuRoiReport(buildSkuIntelligence(data))); break;

        case "CFR_HERO":
            renderTablePage(buildHeroSkuReport(buildSkuIntelligence(data))); break;

        case "CFR_WASTE":
            renderTablePage(buildAdWasteReport(buildSkuIntelligence(data))); break;

        case "CFR_DEP":
            renderTablePage(buildAdDependencyReport(buildSkuIntelligence(data))); break;

        case "CKR_ROI":
            renderTablePage(buildKeywordRoiReport(data.CKR)); break;

        case "CKR_EFF":
            renderTablePage(buildKeywordEfficiencyReport(data.CKR)); break;

        case "CKR_OPP":
            renderTablePage(buildKeywordOpportunityReport(data.CKR)); break;

        case "CKR_NEG":
            renderTablePage(buildNegativeKeywordReport(data.CKR)); break;

        case "PPR_ROI":
            renderTablePage(buildPlacementRoiReport(data.PPR)); break;

        case "PPR_CTR":
            renderTablePage(buildPlacementCtrReport(data.PPR)); break;

        case "PPR_CONV":
            renderTablePage(buildPlacementConversionReport(data.PPR)); break;

        case "GMV_HERO":
            renderTablePage(buildHeroProductReport(data.GMV)); break;

        case "GMV_CAT":
            renderTablePage(buildCategoryPerformanceReport(data.GMV)); break;

        case "GMV_RETURN":
            renderTablePage(buildReturnRiskReport(data.GMV)); break;

        case "GMV_GROWTH":
            renderTablePage(buildGrowthMomentumReport(data.GMV)); break;

    }

}

export function renderHome(data){

    const app=document.getElementById("app");
    app.innerHTML="";

    const dashboard=document.createElement("div");

    dashboard.appendChild(renderCardGrid(buildGmvSummary(data.GMV)));

    dashboard.appendChild(
        renderChartContainer(
            "GMV vs Net Sales",
            "gmvChart",
            buildGmvSalesNetChart(data.GMV)
        )
    );

    dashboard.appendChild(renderCardGrid(buildAdsSummary(data.CDR)));

    dashboard.appendChild(
        renderChartContainer(
            "Ad Spend vs Ad Revenue",
            "adsChart",
            buildCdrSpendRevenueChart(data.CDR)
        )
    );

    app.appendChild(dashboard);

}

function renderTablePage(report, title){

    const app=document.getElementById("app");
    app.innerHTML="";

    const h=document.createElement("h2");
    h.innerText=title;
    h.style.margin="10px 0 16px 0";

    app.appendChild(h);

    const table=renderTable(report.columns,report.rows);

    app.appendChild(table);

}
