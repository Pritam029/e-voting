import userModel from "../models/candidateModel.js";

const migrateRefundField = async () => {
  try {
    const result = await userModel.updateMany(
      {
        voteCount: { $exists: false } // Simplified condition
      },
      {
        $set: {
          voteCount: 0
        }
      }
    );
    console.log(`✅ Migration completed. Updated ${result.modifiedCount} users.`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
};

export default migrateRefundField;
