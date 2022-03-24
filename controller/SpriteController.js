const BaseController = require('./BaseController');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-southeast-1' });

module.exports = class SpriteController extends BaseController {
	async createSprite(req, res) {
		// make sure user is already authenticated first
		const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
		const attributes = JSON.parse(req.body.attributes);
		const username = req.body.username;
		const spriteBuffer = req.files[0].buffer;
		const headBuffer = req.files[1].buffer;
		const userId = req.userId;
		console.log(req.files);
	

		s3.putObject(
			{
				Bucket: 'babbo-motel',
				Body: spriteBuffer,
				ContentType: 'image/png',
				Key: `users/${userId}/sprite.png`,
			},
			function (err, data) {
				if (err) console.log(err);
				else {
					console.log(data);
				}
			}
		);


    s3.putObject(
			{
				Bucket: 'babbo-motel',
				Body: headBuffer,
				ContentType: 'image/png',
				Key: `users/${userId}/head.png`,
			},
			function (err, data) {
				if (err) console.log(err);
				else {
					console.log(data);
				}
			}
		);

		const attributesObj = {
			main: `${process.env.S3_URI}/${`users/${userId}/sprite.png`}`,
      head: `${process.env.S3_URI}/${`users/${userId}/head.png`}`,
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

		res.status(201).send(user);
	}


  	async updateSprite(req, res) {
		// make sure user is already authenticated first
		const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
		const attributes = JSON.parse(req.body.attributes);
		const spriteBuffer = req.files[0].buffer;
		const headBuffer = req.files[1].buffer;
		const userId = req.userId;
		console.log(req.files);
	

		s3.putObject(
			{
				Bucket: 'babbo-motel',
				Body: spriteBuffer,
				ContentType: 'image/png',
				Key: `users/${userId}/sprite.png`,
			},
			function (err, data) {
				if (err) console.log(err);
				else {
					console.log(data);
				}
			}
		);


    s3.putObject(
			{
				Bucket: 'babbo-motel',
				Body: headBuffer,
				ContentType: 'image/png',
				Key: `users/${userId}/head.png`,
			},
			function (err, data) {
				if (err) console.log(err);
				else {
					console.log(data);
				}
			}
		);

		const attributesObj = {
			main: `${process.env.S3_URI}/${`users/${userId}/sprite.png`}`,
      head: `${process.env.S3_URI}/${`users/${userId}/head.png`}`,
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
				sprite: {
					upsert: {
						create: attributesObj,
						update: attributesObj,
					},
				},
			},
		});

		res.status(201).send(user);
	}
};
