/**
 * Waves Laundry - About Us Page Interactive Scripts
 * Implements smooth scroll reveals and interactive workflow timeline animations
 */

const revealObserverOptions = {
  root: null,
  rootMargin: '0px -20px -50px -20px', // slight negative bottom margin to trigger shortly after entering viewport
  threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  });
}, revealObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Initialize reveal observer on elements
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // #---------------PROCESS WORKFLOW TIMELINE-----------------#
  const workflowContainer = document.querySelector('.workflow-container');
  const workflowSteps = document.querySelectorAll('.workflow-step');
  const progressLine = document.querySelector('.workflow-line-progress');

  if (workflowContainer && workflowSteps.length > 0 && progressLine) {
    const defaultIndex = 1; // Step 2 (0-indexed) is the default active state

    const updateWorkflow = (index) => {
      workflowSteps.forEach((s, sIdx) => {
        if (sIdx <= index) {
          s.classList.add('active');
          if (sIdx === index) {
            s.classList.add('current');
          } else {
            s.classList.remove('current');
          }
        } else {
          s.classList.remove('active');
          s.classList.remove('current');
        }
      });
      const pct = (index / (workflowSteps.length - 1)) * 100;
      progressLine.style.width = `${pct}%`;
    };

    // Set initial default state
    updateWorkflow(defaultIndex);

    workflowSteps.forEach((step, idx) => {
      // Hover event to preview steps dynamically
      step.addEventListener('mouseenter', () => {
        updateWorkflow(idx);
      });

      // Click event to make the step selection stick
      step.addEventListener('click', () => {
        updateWorkflow(idx);
      });
    });

    // Reset back to default intermediate state (Step 3) when mouse leaves timeline area
    workflowContainer.addEventListener('mouseleave', () => {
      updateWorkflow(defaultIndex);
    });
  }
});
