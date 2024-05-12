import { seedRoles } from "./seedRoles";

(async ()=> {
    console.log("staring seeders...");
    await new seedRoles().start();
})();