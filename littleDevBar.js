(function(win, doc) {

  var currentMousePosition = [0, 0];

  function createSpan(littleDevBar, label) {
    var span = doc.createElement('span');
    span.setAttribute('data-label', label);
    littleDevBar.appendChild(span);
    return span;
  }

  function padLeft(number, width) {
    number = number.toString();

    var padding = width - number.length;

    if (padding > 0) {
      return Array(padding + 1).join('&nbsp;') + number;
    }

    return number;
  }

  function formatCoordinates(x, y) {
    return '[' + padLeft(x, 4) + ', ' + padLeft(y, 4) + ']';
  }

  function formatElement(element) {
    var parts = [element.nodeName.toLowerCase()];
    
    var attributes = element.attributes;

    for (var i = 0; i < attributes.length; ++i) {
      parts.push(attributes[i].name + '="' + attributes[i].value + '"');
    }

    return '<' + parts.join(' ') + '>';
  }

  function LittleDevBar() {
    var littleDevBar = doc.createElement('div');
    littleDevBar.className = 'little-dev-bar';
    doc.body.appendChild(littleDevBar);

    var windowSize   = createSpan(littleDevBar, 'Window size');
    var clientPos    = createSpan(littleDevBar, 'Client coordinates');
    var screenPos    = createSpan(littleDevBar, 'Screen coordinates');
    var lastClick    = createSpan(littleDevBar, 'Last click');
    var lastKey      = createSpan(littleDevBar, 'Last key code');
    var hoverElement = createSpan(littleDevBar, 'Element under mouse');

    doc.addEventListener('mousemove', function(e) {
      currentMousePosition = [e.clientX, e.clientY];
      clientPos.innerHTML = formatCoordinates(e.clientX, e.clientY);
      screenPos.innerHTML = formatCoordinates(e.screenX, e.screenY);
    });

    doc.addEventListener('click', function(e) {
      lastClick.innerHTML =
        formatCoordinates(e.clientX, e.clientY) + ' (client), ' +
        formatCoordinates(e.screenX, e.screenY) + ' (screen)';
    });

    doc.addEventListener('keyup', function(e) {
      lastKey.textContent = e.keyCode;
    });

    win.setInterval(function() {
      var elementUnderMouse = doc.elementFromPoint.apply(doc, currentMousePosition);
      hoverElement.textContent = formatElement(elementUnderMouse);

      windowSize.textContent = '' + window.innerWidth + 'w x ' + window.innerHeight + 'h';
    }, 100);
  }

  win.LittleDevBar = LittleDevBar;

}(window, document));
