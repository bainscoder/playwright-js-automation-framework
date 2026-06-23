import fs from 'fs';
import path from 'path';

const historyPath = path.join(
  process.cwd(),
  'execution-data',
  'execution-history.json'
);

function getHistory() {

  if (
    !fs.existsSync(historyPath)
  ) {
    return [];
  }

  const data =
    fs.readFileSync(
      historyPath,
      'utf-8'
    ).trim();

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

function saveExecutionHistory(
  executionData
) {

  const history =
    getHistory();

  history.push(
    executionData
  );

  // Keep only previous + current run
  const latestTwoRuns =
    history.slice(-2);

  fs.writeFileSync(
    historyPath,
    JSON.stringify(
      latestTwoRuns,
      null,
      2
    )
  );

  console.log(
    'Execution history saved'
  );
}

function compareExecution(
  current
) {

  const history =
    getHistory();

  if (
    history.length === 0
  ) {
    return null;
  }

  // Last run becomes previous run
  const previous =
    history[
      history.length - 1
    ];

  return {

    previous,

    passedDiff:
      current.passed -
      previous.passed,

    failedDiff:
      current.failed -
      previous.failed,

    skippedDiff:
      current.skipped -
      previous.skipped
  };
}

export {
  getHistory,
  saveExecutionHistory,
  compareExecution
};