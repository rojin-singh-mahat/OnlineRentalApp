const Property = require("../model/property.model");

const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await Property.findByIdAndDelete(propertyId);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server error while deleting property" });
  }
};

module.exports = { deleteProperty };
