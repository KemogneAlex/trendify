import 'dotenv/config';
import mongoose from 'mongoose';

async function main() {
  const uri = process.env.MONGODB_URL;
  if (!uri) {
    console.error('ERREUR: La variable MONGODB_URL doit être définie dans le fichier .env');
    process.exit(1);
  }

  try {
    const startedAt = Date.now();
    await mongoose.connect(uri, { bufferCommands: false });
    const elapsed = Date.now() - startedAt;

    const dbName = mongoose.connection?.name || '(unknown)';
    const host = mongoose.connection?.host || '(unknown)';

    console.log(
      `SUCCÈS: Connexion à MongoDB établie [base="${dbName}", serveur="${host}", temps=${elapsed}ms]`
    );
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('ERREUR: Échec de la connexion à la base de données');
    console.error(err);
    try {
      await mongoose.connection.close();
    } catch {}
    process.exit(1);
  }
}

main();
