const mongoose = require('mongoose');

const wasteManagementSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    }
});

module.exports = mongoose.model('WasteManagementmodel', wasteManagementSchema);
