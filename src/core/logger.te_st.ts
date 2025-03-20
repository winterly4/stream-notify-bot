import { Logger } from "./logger";
import winston from "winston";

jest.mock("winston", () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };
  const mockFormat = {
    combine: jest.fn(),
    timestamp: jest.fn(),
    json: jest.fn(),
  };
  const mockTransports = {
    Console: jest.fn(),
  };
  return {
    format: mockFormat,
    transports: mockTransports,
    createLogger: jest.fn(() => mockLogger),
  };
});

describe("Logger", () => {
  let logger: Logger;
  let mockWinstonLogger: any;

  beforeEach(() => {
    logger = new Logger();
    mockWinstonLogger = winston.createLogger();
  });

  it("should initialize winston logger correctly", () => {
    // Проверяем, что winston.createLogger был вызван с правильными параметрами
    expect(winston.createLogger).toHaveBeenCalledWith({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [new winston.transports.Console()],
    });
  });

  it("should call logger.info when log method is called", () => {
    const message = "Test log message";
    const meta = { key: "value" };

    // Вызываем метод log
    logger.log(message, meta);

    // Проверяем, что winston.Logger.info был вызван с правильными аргументами
    expect(mockWinstonLogger.info).toHaveBeenCalledWith(message, meta);
  });

  it("should call logger.error when error method is called", () => {
    const message = "Test error message";
    const error = new Error("Test error");

    // Вызываем метод error
    logger.error(message, error);

    // Проверяем, что winston.Logger.error был вызван с правильными аргументами
    expect(mockWinstonLogger.error).toHaveBeenCalledWith(message, {
      error: error.stack,
    });
  });
});
