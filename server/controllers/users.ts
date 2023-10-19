import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDataFile = path.join(__dirname, "../data/data.json");

export const searchUsers = async (email: string, number: string) => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    const normalizedNumber = number.replace(/-/g, "");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fs.readFile(usersDataFile, "utf8", (err, data) => {
          if (err) {
            console.error(err);
            reject("Server error");
          }

          const usersData = JSON.parse(data);

          const filteredUsers = usersData.filter((user) => {
            if (email && user.email !== email) return false;
            if (normalizedNumber && user.number !== normalizedNumber)
              return false;
            return true;
          });

          resolve(filteredUsers);
        });
      }, 5000);
    });
  } catch (error) {
    console.error(error);
    throw "Server error";
  }
};
