const { db } = require("../db");
const { users } = require("../db/schema");
const { eq } = require("drizzle-orm");

// Validate if email domain is allowed
function isAllowedDomain(email: string): boolean {
  const allowedDomain = process.env.ALLOWED_DOMAIN || "blockful.io";
  return email.endsWith(`@${allowedDomain}`);
}

// Create or update user from Google OAuth data
async function createOrUpdateUser(googleProfile: any) {
  const { id: googleId, email, name, picture } = googleProfile;

  // Validate domain
  if (!isAllowedDomain(email)) {
    throw new Error(
      `Only ${
        process.env.ALLOWED_DOMAIN || "blockful.io"
      } email addresses are allowed`
    );
  }

  try {
    // Check if user exists by googleId
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.googleId, googleId))
      .limit(1);

    if (existingUser.length > 0) {
      // Update existing user
      const updatedUser = await db
        .update(users)
        .set({
          name,
          avatar: picture,
          lastLogin: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(users.googleId, googleId))
        .returning();

      return updatedUser[0];
    } else {
      // Check if user exists by email (in case they signed up before)
      const existingByEmail = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingByEmail.length > 0) {
        // Update existing user with Google ID
        const updatedUser = await db
          .update(users)
          .set({
            googleId,
            name,
            avatar: picture,
            lastLogin: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(users.email, email))
          .returning();

        return updatedUser[0];
      } else {
        // Create new user
        const newUser = await db
          .insert(users)
          .values({
            googleId,
            email,
            name,
            avatar: picture,
            lastLogin: new Date(),
          })
          .returning();

        return newUser[0];
      }
    }
  } catch (error: any) {
    throw new Error(`Failed to create or update user: ${error.message}`);
  }
}

// Get user by ID
async function getUserById(userId: number) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    return user.length > 0 ? user[0] : null;
  } catch (error) {
    return null;
  }
}

module.exports = {
  isAllowedDomain,
  createOrUpdateUser,
  getUserById,
};
