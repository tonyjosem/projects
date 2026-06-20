document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("add-fund-modal");
  const trigger = document.getElementById("add-fund-trigger");
  const closeBtn = document.getElementById("close-add-fund");

  if (modal && trigger) {
    trigger.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  }

  if (modal && closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }

  const canvas = document.getElementById("fundChart");
  if (canvas && window.fundChartData) {
    const data = window.fundChartData;
    if (window.fundChartInstance) {
      window.fundChartInstance.destroy();
    }

    window.fundChartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Principal",
            data: data.principal,
            borderColor: "#185f9d",
            backgroundColor: "rgba(24, 95, 157, 0.14)",
            fill: true,
            tension: 0.25,
          },
          {
            label: "Current Value",
            data: data.currentValue,
            borderColor: "#0f9d6e",
            backgroundColor: "rgba(15, 157, 110, 0.12)",
            fill: true,
            tension: 0.25,
          },
          {
            label: "Gains",
            data: data.gains,
            borderColor: "#d67c17",
            backgroundColor: "rgba(214, 124, 23, 0.12)",
            fill: true,
            tension: 0.25,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
    });
  }
});
