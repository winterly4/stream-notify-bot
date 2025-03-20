import { DBService } from "./db.service";

type TestType = {
  data: number;
  lastUpdate: number;
};

async function testDb() {
  const db = new DBService("test.json");
  let result: TestType;

  db.set("test", { data: 11, lastUpdate: 121442342342 });

  result = await db.get<TestType>("test");

  console.log(result.data);

  db.update<TestType>("test", (x) => {
    return { ...x, data: 400 };
  });

  console.log(result.data);
}

testDb();
