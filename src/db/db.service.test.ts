import { DBService } from "./db.service";

describe("db", () => {
  let db: DBService;

  beforeEach(() => {
    db = new DBService("test.json");
  });

  it("write", () => {
    db.set("test", { data: 1, lastUpdate: 121442342342 });
  });
});
