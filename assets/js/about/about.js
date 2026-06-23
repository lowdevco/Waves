/**
 * Waves Laundry - About Us Page Interactive Scripts
 * Implements interactive workflow timeline animations
 */

document.addEventListener("DOMContentLoaded", () => {
  // #---------------PROCESS WORKFLOW TIMELINE-----------------#
  const workflowContainer = document.querySelector(".workflow-container");
  const workflowSteps = document.querySelectorAll(".workflow-step");
  const progressLine = document.querySelector(".workflow-line-progress");

  if (workflowContainer && workflowSteps.length > 0 && progressLine) {
    const defaultIndex = 1; // Step 2 (0-indexed) is the default active state

    const updateWorkflow = (index) => {
      workflowSteps.forEach((s, sIdx) => {
        if (sIdx <= index) {
          s.classList.add("active");
          if (sIdx === index) {
            s.classList.add("current");
          } else {
            s.classList.remove("current");
          }
        } else {
          s.classList.remove("active");
          s.classList.remove("current");
        }
      });
      const pct = (index / (workflowSteps.length - 1)) * 100;
      progressLine.style.width = `${pct}%`;
    };

    // Set initial default state
    updateWorkflow(defaultIndex);

    workflowSteps.forEach((step, idx) => {
      // Hover event to preview steps dynamically
      step.addEventListener("mouseenter", () => {
        updateWorkflow(idx);
      });

      // Click event to make the step selection stick
      step.addEventListener("click", () => {
        updateWorkflow(idx);
      });
    });

    // Reset back to default intermediate state (Step 3) when mouse leaves timeline area
    workflowContainer.addEventListener("mouseleave", () => {
      updateWorkflow(defaultIndex);
    });
  }
});
