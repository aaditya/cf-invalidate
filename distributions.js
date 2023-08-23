const cloudfront = require('./cloudfront')

module.exports = async function (){
    try {
      const response = await cloudfront.listDistributions().promise();
      const distributions = response.DistributionList.Items;

      const toShow = []
  
      for (const distribution of distributions) {
        const toPush = {
            id: distribution.Id,
            domain: distribution.DomainName,
            status: distribution.Status,
            paths: []
        }
        
        const config = distribution.DefaultCacheBehavior;

        if (config && config.TargetOriginId === 'S3-' + distribution.Id) {
          toPush.paths.push(`/*`);
        } else {
          for (const item of config.CacheBehaviors.Items) {
            toPush.paths.push(item.PathPattern);
          }
        }

        toShow.push(toPush)
      }

      return toShow;
    } catch (error) {
      console.error('Error fetching CloudFront distributions:', error);
    }
  }

listCloudFrontDistributions();