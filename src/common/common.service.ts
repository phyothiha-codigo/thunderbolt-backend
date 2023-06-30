import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class CommonService {
  async upload(file, path) {
    const bucketS3 = path;
    return await this.uploadS3(file.buffer, bucketS3, new Date().getTime());
  }

  async uploadS3(file, bucket, name): Promise<string> {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data.Location as string);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    });
  }
}
