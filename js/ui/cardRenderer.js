// js/ui/cardRenderer.js

export function renderCardGrid(cards) {

    const grid = document.createElement("div");
    grid.className = "card-grid";

    for (const card of cards) {

        const cardEl = document.createElement("div");
        cardEl.className = "metric-card";

        const title = document.createElement("div");
        title.className = "metric-title";
        title.innerText = card.title;

        const value = document.createElement("div");
        value.className = "metric-value";
        value.innerText = card.value;

        cardEl.appendChild(title);
        cardEl.appendChild(value);

        if (card.units) {

            const units = document.createElement("div");
            units.className = "metric-units";
            units.innerText = `${card.units} units`;

            cardEl.appendChild(units);

        }

        grid.appendChild(cardEl);

    }

    return grid;

}
