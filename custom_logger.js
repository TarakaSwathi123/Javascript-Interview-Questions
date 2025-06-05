const Logger = (() => {
  const styles = {
    log: 'color: #00bcd4; font-weight: bold',
    info: 'color: #4caf50; font-weight: bold',
    warn: 'color: #ff9800; font-weight: bold',
    error: 'color: #f44336; font-weight: bold',
    success: 'color: #8bc34a; font-weight: bold',
    timestamp: 'color: gray; font-style: italic',
  };

  let debugMode = true;

  const formatTime = () =>
    new Date().toLocaleTimeString('en-IN', { hour12: false });

  const log = (type, label, ...args) => {
    if (!debugMode) return;
    const time = formatTime();
    const style = styles[type] || styles.log;
    console.log(
      `%c[${type.toUpperCase()}]%c [${label}] %c@${time}`,
      style,
      'color: #3f51b5; font-weight: bold',
      styles.timestamp,
      ...args
    );
  };

  return {
    enable: () => (debugMode = true),
    disable: () => (debugMode = false),
    log: (...args) => log('log', 'General', ...args),
    info: (label, ...args) => log('info', label, ...args),
    warn: (label, ...args) => log('warn', label, ...args),
    error: (label, ...args) => log('error', label, ...args),
    success: (label, ...args) => log('success', label, ...args),
  };
})();


Logger.log('Just a simple message');
Logger.info('AuthModule', 'User logged in');
Logger.warn('API', 'Slow response time');
Logger.error('Database', 'Connection failed!');
Logger.success('Build', 'Deployed successfully 🚀');

// Turn off logging
Logger.disable();
Logger.log('This won’t show');

// Turn it back on
Logger.enable();
Logger.log('Back again!');
