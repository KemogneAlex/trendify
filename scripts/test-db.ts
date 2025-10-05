import { connectToDatabase } from '../database/mongoose';

async function main() {
  try {
    await connectToDatabase();
    // Si connectToDatabase se résout sans erreur, la connexion est réussie
    console.log('SUCCÈS: Connexion à la base de données réussie');
    process.exit(0);
  } catch (err) {
    console.error('ERREUR: Échec de la connexion à la base de données');
    console.error(err);
    process.exit(1);
  }
}

main();
