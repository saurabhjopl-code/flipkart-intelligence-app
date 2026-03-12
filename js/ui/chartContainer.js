// js/ui/chartContainer.js

import { renderChart } from "../charts/chartRenderer.js";

export function renderChartContainer(title, canvasId, chartData) {

    const section = document.createElement("div");
    section.className = "chart-section";

    const heading = document.createElement("h2");
    heading.innerText = title;

    const canvas = document.createElement("canvas");
    canvas.id = canvasId;

    section.appendChild(heading);
    section.appendChild(canvas);

    setTimeout(() => {
        renderChart(canvasId, chartData);
    }, 0);

    return section;

}
