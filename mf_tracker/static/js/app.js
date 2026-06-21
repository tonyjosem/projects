document.addEventListener("DOMContentLoaded", () => {
  const bindModal = (modalId, triggerId, closeId) => {
    const modal = document.getElementById(modalId);
    const trigger = document.getElementById(triggerId);
    const closeBtn = document.getElementById(closeId);

    if (!modal || !trigger) {
      return;
    }

    trigger.addEventListener("click", () => {
      modal.classList.remove("hidden");
      const focusTarget =
        modal.querySelector('input[type="date"]') ||
        modal.querySelector("input, button, select, textarea");
      if (focusTarget) {
        requestAnimationFrame(() => focusTarget.focus());
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    }

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.add("hidden");
        trigger.focus();
      }
    });

    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        modal.classList.add("hidden");
        trigger.focus();
      }
    });
  };

  bindModal("add-fund-modal", "add-fund-trigger", "close-add-fund");
  bindModal("add-entry-modal", "add-entry-trigger", "close-add-entry");

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

  const barCanvas = document.getElementById("fundBarChart");
  if (barCanvas && window.fundChartData) {
    const data = window.fundChartData;
    if (window.fundBarChartInstance) {
      window.fundBarChartInstance.destroy();
    }

    window.fundBarChartInstance = new Chart(barCanvas, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Principal",
            data: data.principal,
            backgroundColor: "rgba(24, 95, 157, 0.74)",
            borderRadius: 6,
          },
          {
            label: "Current Value",
            data: data.currentValue,
            backgroundColor: "rgba(15, 157, 110, 0.74)",
            borderRadius: 6,
          },
          {
            label: "Gains",
            data: data.gains,
            backgroundColor: "rgba(214, 124, 23, 0.74)",
            borderRadius: 6,
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
