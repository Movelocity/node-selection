const { checkAccessibilityPermissions, getSelection } = require('../..');

const mouseEvents = require('global-mouse-events');

let mouseDownPos = null;

// Track mouse down position
mouseEvents.on("mousedown", event => {
  mouseDownPos = { x: event.x, y: event.y };
  // console.log('Mouse down detected:', mouseDownPos);
});

// Check selection on mouse up if distance > 100px
mouseEvents.on("mouseup", async (event) => {
  if (!mouseDownPos) {
    console.log('Mouse up detected but no previous mouse down position');
    return;
  }

  const distance = Math.sqrt(
    Math.pow(event.x - mouseDownPos.x, 2) +
    Math.pow(event.y - mouseDownPos.y, 2)
  );

  if (distance > 30) {
    console.log(`Distance ${distance} > threshold, get selection...`);
    try {
      const { text, process } = await getSelection();
      console.log('Selection successful:', {
        process,
        // text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        text: text,
        textLength: text.length
      });
    } catch (error) {
      console.error('Failed to get selection:', error.message);
    }
  } else if (distance > 10) {
    console.log(`Distance ${distance} too small`);
  } else {
    // too small to be a selection, don't log
  }

  mouseDownPos = null;
});

// Wrap the initialization code in an async IIFE
(async () => {
  if (!(await checkAccessibilityPermissions({ prompt: true }))) {
    console.error('⚠️ Accessibility permissions not granted');
    console.log('Please grant accessibility permissions and restart this program');
    process.exit(1);
  } else {
    console.log('✅ Accessibility permissions granted');
    console.log('Monitoring for mouse events...');
  }
})();