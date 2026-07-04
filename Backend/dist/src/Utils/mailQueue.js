"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMailJob = addMailJob;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
const container_1 = require("../container");
const types_1 = require("../interfaces/types");
dotenv_1.default.config();
const redisUrl = process.env.REDIS_URL;
let mailQueue = null;
let mailWorker = null;
if (redisUrl) {
    try {
        // BullMQ requires maxRetriesPerRequest: null
        const connectionOptions = {
            maxRetriesPerRequest: null,
            tls: redisUrl.startsWith("rediss://") ? { rejectUnauthorized: false } : undefined,
        };
        const redisConnectionForQueue = new ioredis_1.default(redisUrl, connectionOptions);
        const redisConnectionForWorker = new ioredis_1.default(redisUrl, connectionOptions);
        mailQueue = new bullmq_1.Queue("mailQueue", {
            connection: redisConnectionForQueue,
        });
        console.log("BullMQ Mail Queue initialized.");
        // Worker to process mail jobs
        mailWorker = new bullmq_1.Worker("mailQueue", async (job) => {
            const { email, title, body, templateType, senderName } = job.data;
            console.log(`Processing mail job ${job.id} for ${email}`);
            // Resolve mail dependencies from our container
            const mailSender = container_1.container.resolve(types_1.TYPES.IMailSender);
            const mailRepository = container_1.container.resolve(types_1.TYPES.IMailRepository);
            await mailSender.sendMail(email, title, body, templateType, senderName);
            if (templateType === "message" && senderName) {
                await mailRepository.createMail(email, senderName, body);
            }
            console.log(`Mail job ${job.id} processed successfully`);
        }, {
            connection: redisConnectionForWorker,
            concurrency: 2, // process up to 2 jobs concurrently
        });
        mailWorker.on("completed", (job) => {
            console.log(`Job ${job.id} completed successfully`);
        });
        mailWorker.on("failed", (job, err) => {
            console.error(`Job ${job?.id} failed:`, err);
        });
    }
    catch (error) {
        console.error("Failed to initialize BullMQ:", error);
    }
}
else {
    console.warn("REDIS_URL not found. BullMQ queue is disabled. Falling back to synchronous email sending.");
}
async function addMailJob(email, title, body, templateType = "default", senderName) {
    if (mailQueue) {
        try {
            await mailQueue.add("sendMail", { email, title, body, templateType, senderName }, {
                attempts: 3, // retry up to 3 times on failure
                backoff: {
                    type: "exponential",
                    delay: 5000, // wait 5s before first retry
                },
            });
            return true;
        }
        catch (error) {
            console.error("Failed to add job to BullMQ queue:", error);
        }
    }
    return false;
}
