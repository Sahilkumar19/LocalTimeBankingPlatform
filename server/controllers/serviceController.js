import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.title = new RegExp(search, 'i');
    const services = await Service.find(query);
    res.send(services);
  } catch (e) {
    res.status(500).send();
  }
};

export const createService = async (req, res) => {
  try {
    const service = new Service({
      ...req.body,
      userId: req.user.id
    });
    await service.save();
    res.status(201).send(service);
  } catch (e) {
    res.status(400).send(e);
  }
};