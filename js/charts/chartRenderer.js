// js/charts/chartRenderer.js

export function renderChart(canvasId, chartData) {

    const ctx = document.getElementById(canvasId);

    if (!ctx) return;

    new Chart(ctx, {
        type: "line",
        data: {
            labels: chartData.labels,
            datasets: chartData.datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
