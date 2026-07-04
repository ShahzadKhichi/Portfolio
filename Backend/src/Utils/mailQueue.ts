import { Queue, Worker, Job } from "bullmq";
import Redis from "ioredis";
import dotenv from "dotenv";
import { container } from "../container";
import { TYPES } from "../interfaces/types";
import { IMailSender } from "../interfaces/IMailSender";
import { IMailRepository } from "../interfaces/IMailRepository";

dotenv.config();

const redisUrl = process.env.REDIS_URL;
let mailQueue: Queue | null = null;
let mailWorker: Worker | null = null;

if (redisUrl) {
  try {
    // BullMQ requires maxRetriesPerRequest: null
    const connectionOptions = {
      maxRetriesPerRequest: null,
      tls: redisUrl.startsWith("rediss://") ? { rejectUnauthorized: false } : undefined,
    };

    const redisConnectionForQueue = new Redis(redisUrl, connectionOptions);
    const redisConnectionForWorker = new Redis(redisUrl, connectionOptions);

    mailQueue = new Queue("mailQueue", {
      connection: redisConnectionForQueue as any,
    });

    console.log("BullMQ Mail Queue initialized.");

    // Worker to process mail jobs
    mailWorker = new Worker(
      "mailQueue",
      async (job: Job) => {
        const { email, name, message } = job.data as {
          email: string;
          name: string;
          message: string;
        };

        console.log(`Processing mail job ${job.id} for ${email}`);

        // Resolve mail dependencies from our container
        const mailSender = container.resolve<IMailSender>(TYPES.IMailSender);
        const mailRepository = container.resolve<IMailRepository>(TYPES.IMailRepository);

        // Send mail and save to DB
        await mailSender.sendMail(email, "You have an email from " + email, "message: " + message);
        await mailRepository.createMail(email, name, message);

        console.log(`Mail job ${job.id} processed successfully`);
      },
      {
        connection: redisConnectionForWorker as any,
        concurrency: 2, // process up to 2 jobs concurrently
      }
    );

    mailWorker.on("completed", (job) => {
      console.log(`Job ${job.id} completed successfully`);
    });

    mailWorker.on("failed", (job, err) => {
      console.error(`Job ${job?.id} failed:`, err);
    });

  } catch (error) {
    console.error("Failed to initialize BullMQ:", error);
  }
} else {
  console.warn("REDIS_URL not found. BullMQ queue is disabled. Falling back to synchronous email sending.");
}

export async function addMailJob(email: string, name: string, message: string): Promise<boolean> {
  if (mailQueue) {
    try {
      await mailQueue.add("sendMail", { email, name, message }, {
        attempts: 3, // retry up to 3 times on failure
        backoff: {
          type: "exponential",
          delay: 5000, // wait 5s before first retry
        },
      });
      return true;
    } catch (error) {
      console.error("Failed to add job to BullMQ queue:", error);
    }
  }
  return false;
}
