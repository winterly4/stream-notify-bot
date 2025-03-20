// import { Logger } from "../core/logger";

// describe("Logger", () => {
//   let logger: Logger;

//   beforeEach(() => {
//     logger = new Logger();
//   });

//   it("should log info message", () => {
//     const consoleSpy = jest.spyOn(console, "log");
//     logger.log("Test message");
//     expect(consoleSpy).toHaveBeenCalledWith(
//       expect.stringContaining("Test message")
//     );
//   });

//   it("should log error message", () => {
//     const consoleSpy = jest.spyOn(console, "error");
//     const error = new Error("Test error");
//     logger.error("Error occurred", error);
//     expect(consoleSpy).toHaveBeenCalledWith(
//       expect.stringContaining("Error occurred")
//     );
//   });
// });
