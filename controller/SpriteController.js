const BaseController = require('./BaseController');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-southeast-1' });

module.exports = class SpriteController extends BaseController {
	async createSprite(req, res) {
		// make sure user is already authenticated first
		const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
		const attributes = JSON.parse(req.body.attributes);
    console.log(req.body)
		const username = req.body.username;
		const imgBuffer = req.file.buffer;
		const userId = req.userId;

		const key = `users/${userId}/sprite.png`;
		const params = {
			Bucket: 'babbo-motel',
			Body: imgBuffer,
			ContentType: 'image/png',
			Key: key,
		};
		s3.putObject(params, function (err, data) {
			if (err) console.log(err);
			else {
				console.log(data);
			}
		});

		const attributesObj = {
			main: `${process.env.S3_URI}/${key}`,
			body: attributes.Body,
			eyes: attributes.Eyes,
			outfit: attributes.Outfit,
			hairstyle: attributes.Hairstyle,
			accessory: attributes.Accessory,
		};

		const user = await this.db.User.update({
			where: {
				id: userId,
			},
			data: {
				username,
				sprite: {
					upsert: {
						create: attributesObj,
						update: attributesObj,
					},
				},
			},
		});

		console.log(user);
	}
};
