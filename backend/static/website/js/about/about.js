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
      progressLine.style.height = `${pct}%`;
    };

    const adjustTimelineLine = () => {
      const workflowLine = document.querySelector(".workflow-line");
      if (!workflowLine) return;

      if (window.innerWidth <= 991) {
        const firstStep = workflowSteps[0];
        const lastStep = workflowSteps[workflowSteps.length - 1];
        const firstIcon = firstStep.querySelector(".step-icon-box");
        const lastIcon = lastStep.querySelector(".step-icon-box");

        if (firstIcon && lastIcon) {
          const containerRect = workflowContainer.getBoundingClientRect();
          const firstIconRect = firstIcon.getBoundingClientRect();
          const lastIconRect = lastIcon.getBoundingClientRect();

          const firstCenter =
            firstIconRect.top - containerRect.top + firstIconRect.height / 2;
          const lastCenter =
            lastIconRect.top - containerRect.top + lastIconRect.height / 2;

          workflowLine.style.top = `${firstCenter}px`;
          workflowLine.style.height = `${lastCenter - firstCenter}px`;
          workflowLine.style.bottom = "auto";
        }
      } else {
        // Reset to desktop styles
        workflowLine.style.top = "";
        workflowLine.style.height = "";
        workflowLine.style.bottom = "";
      }
    };

    // Set initial default state and adjust line
    updateWorkflow(defaultIndex);
    adjustTimelineLine();

    // Recalculate on window resize
    window.addEventListener("resize", adjustTimelineLine);

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
