// init
var ObsClient = require('esdk-obs-nodejs');

// create ObsClient instance
var obsClient = new ObsClient({
       access_key_id: 'AQJ7KZJR00DDWVOSEWIP',
       secret_access_key: 'vWWjq6rLRw9qpQ5GyoUsbQ0lWZWU3Q3OgYSkukdl',
       server : 'https://obs.ap-southeast-2.myhuaweicloud.com',
       max_retry_count : 1,
       timeout : 20,
       ssl_verify : false,
       long_conn_param : 0
});

// declare params
exports.handler = (event, context, callback) => {
       let recieved_request = JSON.stringify(event.img);
       let recieved_request_imageId = JSON.stringify(event.imageID);
       let recieved_request_ext = JSON.stringify(event.fileExt);
       let recieved_request_folder = JSON.stringify(event.folder);
    
       recieved_request = recieved_request.slice(1, -1);
       var filePath = recieved_request_imageId + "." + recieved_request_ext.replace('"','').replace('"','');
       let buffer = Buffer.from(recieved_request.replace(/^data:image\/\w+;base64,/, ""),'base64'); 

       //upload objects
       obsClient.putObject({
              Bucket : 'react-ap-webapp-images',
              Key : filePath,
              Body : buffer,
              ContentType: 'image/jpeg'
       },(err, result) => {
              if(err){
                     console.error('Error-->' + err);
              }else{
                     if(result.CommonMsg.Status < 300){
                            console.log('RequestId-->' + result.InterfaceResult.RequestId);
                            console.log('ETag-->' + result.InterfaceResult.ETag);
                            console.log('VersionId-->' + result.InterfaceResult.VersionId);
                            console.log('StorageClass-->' + result.InterfaceResult.StorageClass);
                     }else{
                            console.log('Code-->' + result.CommonMsg.Code);
                            console.log('Message-->' + result.CommonMsg.Message);
                     }
              }
       });
}
