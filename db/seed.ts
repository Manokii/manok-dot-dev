import { db } from "./client"
import { NewTechnologies, technologies } from "./schema"

/**
 * Seed the database with initial data
 */
async function seed() {
  // just technologies on top of my head
  // It'll have it's own admin panel
  const insertData: NewTechnologies[] = [
    // Databases
    {
      id: 1,
      name: "PostgreSQL",
      slug: "postgresql",
    },

    {
      id: 2,
      name: "MySQL",
      slug: "mysql",
    },
    {
      id: 3,
      name: "MongoDB",
      slug: "mongodb",
    },
    {
      id: 4,
      name: "Firestore",
      slug: "firestore",
    },
    {
      id: 5,
      name: "Firebase Realtime Database",
      slug: "firebase-rtdb",
    },
    {
      id: 6,
      name: "Supabase",
      slug: "supabase",
    },
    {
      id: 7,
      name: "Planetscale",
      slug: "planetscale",
    },
    {
      id: 8,
      name: "SQLite",
      slug: "sqlite",
    },
    {
      id: 9,
      name: "Vercel Postgres",
      slug: "vercel-postgres",
    },
    {
      id: 10,
      name: "Cockroach DB",
      slug: "cockroachdb",
    },

    // ORMs
    {
      id: 11,
      name: "Prisma",
      slug: "prisma",
    },
    {
      id: 12,
      name: "TypeORM",
      slug: "typeorm",
    },
    {
      id: 13,
      name: "drizzle-orm",
      slug: "drizzle-orm",
    },
    {
      id: 14,
      name: "sequelize",
      slug: "sequelize",
    },

    // Languages
    {
      id: 15,
      name: "TypeScript",
      slug: "typescript",
    },
    {
      id: 16,
      name: "JavaScript",
      slug: "javascript",
    },
    {
      id: 17,
      name: "Python",
      slug: "python",
    },
    {
      id: 18,
      name: "Go Lang",
      slug: "go-lang",
    },
    {
      id: 19,
      name: "Rust",
      slug: "rust",
    },
    {
      id: 20,
      name: "Java",
      slug: "java",
    },
    {
      id: 21,
      name: "C",
      slug: "c",
    },
    {
      id: 22,
      name: "C#",
      slug: "c-sharp",
    },
    {
      id: 23,
      name: "C++",
      slug: "c-plus-plus",
    },
    {
      id: 24,
      name: "PHP",
      slug: "php",
    },
    {
      id: 25,
      name: "Zig",
      slug: "zig",
    },
    {
      id: 26,
      name: "Ruby",
      slug: "ruby",
    },
    {
      id: 27,
      name: "Kotlin",
      slug: "kotlin",
    },
    {
      id: 28,
      name: "Swift",
      slug: "swift",
    },
    {
      id: 29,
      name: "Dart",
      slug: "dart",
    },

    // Infrastructure
    {
      id: 30,
      name: "Vercel",
      slug: "vercel",
    },
    {
      id: 31,
      name: "Netlify",
      slug: "netlify",
    },
    {
      id: 32,
      name: "AWS Lambda",
      slug: "aws-lambda",
    },
    {
      id: 33,
      name: "AWS EC2",
      slug: "aws-ec2",
    },
    {
      id: 34,
      name: "AWS S3",
      slug: "aws-s3",
    },
    {
      id: 35,
      name: "AWS RDS",
      slug: "aws-rds",
    },
    {
      id: 36,
      name: "AWS DynamoDB",
      slug: "aws-dynamodb",
    },
    {
      id: 37,
      name: "AWS Cloudformation",
      slug: "aws-cloudformation",
    },
    {
      id: 38,
      name: "Terraform",
      slug: "terraform",
    },
    {
      id: 39,
      name: "Digital Ocean",
      slug: "digital-ocean",
    },
    {
      id: 40,
      name: "Google Cloud Platform",
      slug: "gcp",
    },
    {
      id: 41,
      name: "Docker",
      slug: "docker",
    },
    {
      id: 42,
      name: "Kubernetes",
      slug: "kubernetes",
    },

    // Frameworks
    // Frontend
    {
      id: 43,
      name: "React",
      slug: "react",
    },
    {
      id: 44,
      name: "NextJS",
      slug: "nextjs",
    },
    {
      id: 45,
      name: "Gatsby",
      slug: "gatsby",
    },
    {
      id: 46,
      name: "Vue",
      slug: "vue",
    },
    {
      id: 47,
      name: "NuxtJS",
      slug: "nuxtjs",
    },
    {
      id: 48,
      name: "Svelte",
      slug: "svelte",
    },
    {
      id: 49,
      name: "Angular",
      slug: "angular",
    },
    {
      id: 50,
      name: "SolidJS",
      slug: "solidjs",
    },
    {
      id: 51,
      name: "Astro",
      slug: "astro",
    },

    // Backend
    {
      id: 52,
      name: "Express",
      slug: "express",
    },
    {
      id: 53,
      name: "Fastify",
      slug: "fastify",
    },
    {
      id: 54,
      name: "NestJS",
      slug: "nestjs",
    },

    // Tools and utilities
    {
      id: 55,
      name: "tRPC",
      slug: "trpc",
    },
    {
      id: 56,
      name: "SWR",
      slug: "swr",
    },
    {
      id: 57,
      name: "Tanstack Query",
      slug: "tanstack-query",
    },
    {
      id: 58,
      name: "Vite",
      slug: "vite",
    },
    {
      id: 59,
      name: "Snowpack",
      slug: "snowpack",
    },
    {
      id: 60,
      name: "ESBuild",
      slug: "esbuild",
    },
    {
      id: 61,
      name: "Webpack",
      slug: "webpack",
    },

    // UI
    {
      id: 62,
      name: "TailwindCSS",
      slug: "tailwindcss",
    },
    {
      id: 63,
      name: "Chakra UI",
      slug: "chakra-ui",
    },
    {
      id: 64,
      name: "Material UI",
      slug: "mui",
    },
    {
      id: 65,
      name: "Ant Design",
      slug: "ant-design",
    },
    {
      id: 66,
      name: "Mantine",
      slug: "mantine",
    },
    {
      id: 67,
      name: "Radix Primitives",
      slug: "radix-ui",
    },
    {
      id: 68,
      name: "shadcn/ui",
      slug: "shadcn-ui",
    },
  ]

  const result = await db
    .insert(technologies)
    .values(insertData)
    .onDuplicateKeyUpdate({})
  return result
}

seed().then(console.log)
