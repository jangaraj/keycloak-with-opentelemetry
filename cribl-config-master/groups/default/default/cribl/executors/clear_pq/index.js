exports.jobType = 'task-per-node';
exports.name = 'clear_pq';

const fs = require('fs');

let outputId;

const {
  util: { resolveEnvVars },
  internal: { PersistentQueue: { outputPath } },
} = C;

exports.initJob = async (opts) => {
  const { conf } = opts.conf.executor;
  outputId = conf.outputId;
};

exports.jobSeedTask = async () => {
  return {
    task: { 
      outputId
    }
  };
};

exports.initTask = async (opts) => {};

exports.jobOnError = async (job, taskId, error) => {}; 

exports.taskExecute = async (job, opts) => {
  const logger = job.logger();
  logger.info('task opts', { opts });
  const pqPath = outputPath(opts.outputId);
  if(!pqPath) throw { message: 'Misconfigured persstent queue path' };
  const resolvedPqPath = resolveEnvVars(pqPath);
  const workers = await fs.promises.readdir(resolvedPqPath);
  return Promise.all(
    workers.map(async (worker) => {
      return fs.promises.rm(`${resolvedPqPath}/${worker}/${opts.outputId}`, { recursive: true, force: true });
    })
  );
};
