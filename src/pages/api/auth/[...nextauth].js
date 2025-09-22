import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb"; // Import the connection helper

// EXPORT your options
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signIn({ user }) {
      try {
        // Connect to the database
        const client = await clientPromise;
        const db = client.db("partners-portal-db"); // Select your database
        const collection = db.collection("login_logs"); // Select your collection

        // Create the document to insert
        const logEntry = {
          name: user.name,
          email: user.email,
          signInAt: new Date(),
        };

        // Insert the log entry into the collection
        await collection.insertOne(logEntry);

        console.log(`Successfully logged sign-in for ${user.email} to MongoDB`);
      } catch (error) {
        console.error("Failed to log user sign-in to MongoDB:", error);
      }
    }
  }
};

export default NextAuth(authOptions);