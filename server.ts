import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const PORT = 3000;
  // Test connexion DB (imports retardés pour éviter les cycles)
  try {
    const dbModule = await import("./server/src/config/database");
    const sequelize = (dbModule as any).default ?? (dbModule as any);

    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');

    // Importer les modèles avant de lancer `sync()` pour s'assurer
    // que tous les modèles sont enregistrés auprès de Sequelize.
    const { default: User } = await import("./server/src/models/User");

    await sequelize.sync();

    // Auto-seed admin if database is empty
    const adminCount = await User.count();
    if (adminCount === 0) {
      console.log('🌱 Base de données vide. Création du compte administrateur par défaut...');
      await User.create({
        nom: 'Admin',
        prenom: 'EUJC',
        email: 'admin@eujc.org',
        mot_de_passe: 'Admin123!',
        role: 'SUPER_ADMIN'
      });
      console.log('✅ Compte SUPER_ADMIN créé : admin@eujc.org / Admin123!');
    }

    // Importer l'app après l'initialisation de la DB et des modèles
    const appModule = await import("./server/src/app");
    const app = (appModule as any).default ?? appModule;

    // Vite middleware for development
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Serveur EUJC Manager prêt sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error);
  }

}

startServer();
