import { loadEnvConfig } from "@next/env";

async function seed() {
  loadEnvConfig(process.cwd());

  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  const [{ seedUser }, { seedJobApplications }, { closeAuthDatabase }, mongoose] =
    await Promise.all([
      import("./seeds/users.seed"),
      import("./seeds/job-applications.seed"),
      import("@/lib/auth/auth"),
      import("mongoose"),
    ]);

  try {
    console.log("🌱 Starting seed process…");

    console.log("👤 Creating user…");
    const user = await seedUser();

    console.log("Seeded user:");
    console.log(`• name: ${user.name}`);
    console.log(`• email: ${user.email}`);
    console.log(`• password: ${user.password}`);

    console.log("🗂️ Seeding job applications…");
    const count = await seedJobApplications(user.id);
    console.log(`🎉 Seed completed successfully with ${count} job applications for ${user.name}!`);
  } finally {
    await Promise.all([mongoose.default.disconnect(), closeAuthDatabase()]);
  }
}

seed().catch((error: unknown) => {
  console.error("Failed to seed :", error);
  process.exit(1);
});
