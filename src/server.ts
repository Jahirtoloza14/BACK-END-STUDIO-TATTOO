import app from "./app";
import { dataSource } from "./database/data-source";

const { PORT = 3000 } = process.env;

const startServer = async () => {
   try {
      await dataSource.initialize();
      console.log("🛢️  Data Source has been initialized");

      app.listen(PORT, () => {
         console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
   } catch (error) {
      console.error("⛔ Error during Database initialization", error);
      process.exit(1);
   }
};

startServer();