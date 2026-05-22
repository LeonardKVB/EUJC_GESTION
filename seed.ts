async function seed() {
  try {
    // Imports retardés pour éviter les cycles
    const dbModule = await import('./server/src/config/database');
    const sequelize = (dbModule as any).default ?? (dbModule as any);
    
    const { default: User } = await import('./server/src/models/User');
    const { ROLES } = await import('./server/src/utils/constants');

    await sequelize.sync({ force: true });
    
    await User.create({
      nom: 'Admin',
      prenom: 'EUJC',
      email: 'admin@eujc.org',
      mot_de_passe: 'Admin123!', // Haché automatiquement par le hook beforeCreate
      role: ROLES.SUPER_ADMIN,
    });

    console.log('✅ Seed terminé avec succès (1 SUPER_ADMIN créé).');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
}

seed();
