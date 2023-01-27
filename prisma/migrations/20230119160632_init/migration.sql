-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `hashedRefreshToken` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `legajo` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Agencia_legajo_key`(`legajo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('debit', 'credit', 'deposit') NOT NULL,
    `status` ENUM('pending', 'done') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `agenciaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PremioPagado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monto` DOUBLE NOT NULL,
    `juego` ENUM('Quini6', 'Brinco', 'Loto', 'Loto5', 'SorteoExtraordinario', 'QuinielaPlus', 'Quiniela') NOT NULL DEFAULT 'Quiniela',
    `sorteo` ENUM('N_A', 'Previa', 'Primera', 'Matutina', 'MatutinaMontevideo', 'Vespertina', 'Nocturna', 'NocturnaMontevideo') NOT NULL,
    `numeroSorteo` INTEGER NOT NULL,
    `agenciaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PremiosTotales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `juego` ENUM('Quini6', 'Brinco', 'Loto', 'Loto5', 'SorteoExtraordinario', 'QuinielaPlus', 'Quiniela') NOT NULL DEFAULT 'Quiniela',
    `sorteo` ENUM('N_A', 'Previa', 'Primera', 'Matutina', 'MatutinaMontevideo', 'Vespertina', 'Nocturna', 'NocturnaMontevideo') NOT NULL,
    `numeroSorteo` INTEGER NOT NULL,
    `monto` DOUBLE NOT NULL DEFAULT 0,
    `cantidad` INTEGER NOT NULL DEFAULT 1,
    `fechaSorteo` DATETIME(3) NOT NULL,
    `vencimiento` DATETIME(3) NOT NULL,
    `agenciaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Agencia` ADD CONSTRAINT `Agencia_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankTransaction` ADD CONSTRAINT `BankTransaction_agenciaId_fkey` FOREIGN KEY (`agenciaId`) REFERENCES `Agencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PremioPagado` ADD CONSTRAINT `PremioPagado_agenciaId_fkey` FOREIGN KEY (`agenciaId`) REFERENCES `Agencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PremiosTotales` ADD CONSTRAINT `PremiosTotales_agenciaId_fkey` FOREIGN KEY (`agenciaId`) REFERENCES `Agencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
