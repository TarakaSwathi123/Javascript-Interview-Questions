class AsyncTaskQueue {
  constructor(concurrency) {
    /// you need more constructors to store the values in the array and keep track the count 
    this.tasks = [];
    this.concurrency = concurrency;
    this.runningTaskCount = 0;
  }

  queue(task) {
    this.tasks.push(task);
    /// once you push it to ques next call the nextRun method to  push that task to execution task and so this queue method will push into that
    this.nextTask();
  }

  nextTask() {
    if (this.runningTaskCount < this.concurrency && this.tasks.length > 0) {
      ////remove the first task from task , and push it (task) to executionStack
      const task = this.tasks.shift();

      this.runningTaskCount++;
      this.executionStack(task);
    }
  }

  executionStack(task) {
    task()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        this.runningTaskCount--;
        this.nextTask();
      });
  }
}
