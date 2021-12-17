const logLevels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
  trace: 8,
}

const defaultLevel = logLevels.info;

const logWithLevel = (level, ...messages) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  switch (level) {
    case logLevels.error:
      console.error(...messages);
      break;
    case logLevels.debug:
      console.debug(...messages);
      break;
    case logLevels.info:
    default:
      console.log(...messages);
  }
};

const log = (...messages) => {
  logWithLevel(defaultLevel, ...messages );
};

const logInfo = (...messages) => {
  logWithLevel(logLevels.info, ...messages );
};

const logError = (...messages) => {
  logWithLevel(logLevels.error, ...messages );
};

const logDebug = (...messages) => {
  logWithLevel(logLevels.debug, ...messages);
};

export {logLevels, logWithLevel, log, logInfo, logError, logDebug};
