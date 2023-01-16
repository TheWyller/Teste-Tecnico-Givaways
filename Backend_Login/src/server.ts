import app from "./app";
import { AppDataSource } from "./data-source";
import { createAdm } from "./helpers";

(async () => {
  const PORT = process.env.PORT || 8080;
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  app.listen(PORT, async () => {
    await createAdm();
    console.log("Running at http://localhost:" + PORT);
  });
})();
