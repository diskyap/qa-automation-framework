import winston from 'winston'

const debugOnlyFilter = winston.format((info) => {
    return info.level === 'debug' ? info : false
})

export class LogHelper {
    static step(message: string) {
        logger.info(`➡️ ${message}`)
    }

    static debug(message: string) {
        logger.debug(message)
    }

    static error(message: string) {
        logger.error(`❌ ${message}`)
    }
}

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'error',

    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),

    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level}: ${message}`
                })
            )
        }),
        new winston.transports.File({
            filename: `logs/Test_run_${new Date().toISOString().slice(0, 10)}.log`,
            level: 'debug',
            format: winston.format.combine(debugOnlyFilter(), winston.format.json())
        })
    ]
})
