module.exports.notFound = (req, res) => {
	res.status(404).json({ message: 'API not found!!' });
};

module.exports.welcome = (req, res) => {
	res.status(200).json({ message: 'Welcome to UDDESHYA BACKEND API!!' });
};

module.exports.index = async (req, res) => {
	try {
		let totalProjects = await Project.countDocuments();
		let projects = await Project.find()
			.sort({ updatedAt: 'desc' })
			.limit(3);
		res.status(200).json({
			message: 'success',
			totalProjects,
			projects
		});
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.volunteer = async (req, res) => {
	try {
		let volunteer = await Volunteer.findOne({ email: req.body.email });
		if (volunteer) {
			res.status(400).json({
				message: 'You have already filled the form'
			});
		} else {
			await Volunteer.create(req.body);
			res.status(200).json({ message: 'success' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};

module.exports.contact = async (req, res) => {
	let { name, email, phone, message } = req.body;
	try {
		await Message.create(req.body);
		res.status(200).json({ message: 'success' });
	} catch (err) {
		res.status(500).json({ message: err.message, error: true });
	}
};
