const jwt = require('jsonwebtoken');
const BaseController = require('./BaseController');
const { getPasswordHash, comparePassword } = require('../utils');

const SALT = process.env.SALT || 'test';
module.exports = class UserController extends BaseController {
	async getUser(req, res, next) {
		try {
			const user = await this.model.findUnique({
				where: {
					id: req.userId,
				},
				include: {
					sprite: true,
				},
			});
      if (!user ){
        res.status(404).send({error: "User not found"})
      }
		res.status(200).send(user);
		} catch (err) {
			next(err);
		}
	}

	async createUser(req, res, next) {
		const { email, password } = req.body;
		try {
			const userExists = await this.model.findUnique({
				where: {
					email,
				},
			});

			if (userExists) {
				res.status(401).json({ error: 'User already exists' });
				return;
			}
			const hashedPassword = await getPasswordHash(password);
			const user = await this.model.create({
				data: {
					email,
					password: hashedPassword,
				},
			});

			const payload = { id: user.id, email: user.email };
			const token = jwt.sign(payload, SALT, { expiresIn: '1 day' });
			res.json({ token });
		} catch (err) {
			next(err);
		}
	}

	async loginUser(req, res, next) {
		const { email, password } = req.body;
		try {
			const user = await this.model.findUnique({
				where: {
					email,
				},
			});
			const match = await comparePassword(password, user.password);
			if (match) {
				//send jwt
				const payload = { id: user.id, email: user.email };
				const token = jwt.sign(payload, SALT, { expiresIn: '1 day' });
				res.json({ token });
			} else {
				res.status(401).json({ error: 'Invalid login credentials' });
			}
		} catch (err) {
			next(err);
		}
	}
};
