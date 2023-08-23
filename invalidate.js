const cloudfront = require('./cloudfront');
const distributions = require('./distributions');

async function invalidateCloudFrontDistributions() {
    const distributionConfig = await distributions()

    for (const distCfg of distributionConfig) {
        const callerReference = `bulk-invalidation-${distCfg.id}`;

        const params = {
            DistributionId: distributionId,
            InvalidationBatch: {
                CallerReference: callerReference,
                Paths: {
                    Quantity: distCfg.paths.length,
                    Items: distCfg.paths
                }
            }
        };

        try {
            const response = await cloudfront.createInvalidation(params).promise();
            console.log(`Invalidation created for Distribution ID: ${distributionId}`);
            console.log(`Invalidation ID: ${response.Invalidation.Id}`);
        } catch (error) {
            console.error(`Error invalidating Distribution ID ${distributionId}:`, error);
        }
    }
}

module.exports = invalidateCloudFrontDistributions;
