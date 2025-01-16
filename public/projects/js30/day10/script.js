'use strict';

const checkboxNodes = document.querySelectorAll('.inbox [type="checkbox"]');

let previousCheckboxId = null;

checkboxNodes.forEach((checkboxNode, i) => {
  checkboxNode.addEventListener('click', (evt) => {
    if (
      evt.shiftKey &&
      previousCheckboxId !== i &&
      previousCheckboxId !== null
    ) {
      const firstCheckboxId = Math.min(previousCheckboxId, i);
      const lastCheckboxId = Math.max(previousCheckboxId, i);

      for (
        let checkboxId = firstCheckboxId;
        checkboxId <= lastCheckboxId;
        checkboxId++
      ) {
        checkboxNodes[checkboxId].checked = checkboxNode.checked;
      }
    }

    previousCheckboxId = i;
  });
});
