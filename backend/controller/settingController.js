const Setting = require('../model/SettingModel');
exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne();
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.json({ initialStartTime: settings.startTime, initialEndTime: settings.endTime });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.updateSettings = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting({ startTime, endTime });
      await settings.save();
    } else {
      settings.startTime = startTime;
      settings.endTime = endTime;
      await settings.save();
    }
    res.json({ msg: 'Settings updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};