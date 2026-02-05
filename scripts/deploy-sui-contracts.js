#!/usr/bin/env node

/**
 * Deploy FairTest Sui Smart Contracts to Testnet
 * 
 * This script deploys the three core Move modules:
 * - fairtest::exam
 * - fairtest::submission
 * - fairtest::result
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

console.log('🚀 Deploying FairTest Sui Contracts to Testnet\n');

// Check Sui CLI is installed
try {
    execSync('sui --version', { stdio: 'pipe' });
    console.log('✓ Sui CLI found');
} catch (error) {
    console.error('❌ Sui CLI not found. Install from: https://docs.sui.io/build/install');
    process.exit(1);
}

// Check network configuration
const network = process.env.SUI_NETWORK || 'testnet';
console.log(`✓ Target network: ${network}`);

// Build contracts
console.log('\n📦 Building Move contracts...');
try {
    execSync('sui move build', {
        cwd: './sui-contracts',
        stdio: 'inherit'
    });
    console.log('✓ Contracts built successfully');
} catch (error) {
    console.error('❌ Build failed');
    process.exit(1);
}

// Deploy contracts
console.log('\n🌐 Deploying to Sui testnet...');
console.log('⚠️  This requires testnet SUI in your wallet');
console.log('   Get testnet SUI from: https://discord.gg/sui\n');

try {
    const output = execSync(`sui client publish --gas-budget 100000000 --skip-dependency-verification`, {
        cwd: './sui-contracts',
        encoding: 'utf-8'
    });
    
    console.log(output);
    
    // Parse package ID from output
    const packageIdMatch = output.match(/Published Objects:.*?PackageID: (0x[a-f0-9]+)/s);
    if (packageIdMatch) {
        const packageId = packageIdMatch[1];
        console.log('\n✅ Deployment successful!');
        console.log(`📦 Package ID: ${packageId}`);
        
        // Save to .env
        const envPath = '.env';
        let envContent = '';
        try {
            envContent = readFileSync(envPath, 'utf-8');
        } catch (e) {
            // File doesn't exist, will create new
        }
        
        if (!envContent.includes('SUI_PACKAGE_ID=')) {
            envContent += `\n# Sui Contract Deployment\nSUI_PACKAGE_ID=${packageId}\n`;
            writeFileSync(envPath, envContent);
            console.log('✓ Package ID saved to .env');
        }
        
        console.log('\n📝 Next steps:');
        console.log('1. Update frontend with package ID');
        console.log('2. Test contract interactions');
        console.log('3. Deploy ENS controller: npm run deploy:ens');
    }
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('- Ensure you have testnet SUI in your wallet');
    console.log('- Check your Sui client is configured: sui client active-address');
    console.log('- Get testnet SUI from Discord: https://discord.gg/sui');
    process.exit(1);
}
