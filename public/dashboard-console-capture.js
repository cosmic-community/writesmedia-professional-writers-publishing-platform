(function() {
  // Only run in iframe
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  // Helper to capture and send logs
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (_key, value) => {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {
      // Silent fail - parent may not be accessible
    }
  }
  
  // Override console methods
  console.log = function(...args) {
    originalConsole.log.apply(console, args);
    captureLog('log', args);
  };
  
  console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    captureLog('warn', args);
  };
  
  console.error = function(...args) {
    originalConsole.error.apply(console, args);
    captureLog('error', args);
  };
  
  console.info = function(...args) {
    originalConsole.info.apply(console, args);
    captureLog('info', args);
  };
  
  console.debug = function(...args) {
    originalConsole.debug.apply(console, args);
    captureLog('debug', args);
  };
  
  // Capture unhandled errors
  window.addEventListener('error', function(event) {
    captureLog('error', [event.message, event.filename, event.lineno, event.colno]);
  });
  
  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', ['Unhandled Promise Rejection:', event.reason]);
  });
  
  // Send ready message and initial route
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
      
      // Send initial route data
      sendRouteChange();
    } catch (e) {
      // Silent fail
    }
  }
  
  // Send route change notification
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Monitor route changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    sendRouteChange();
  };
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    sendRouteChange();
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  // Send ready message when loaded
  if (document.readyState === 'complete') {
    sendReady();
  } else {
    window.addEventListener('load', sendReady);
  }
})();