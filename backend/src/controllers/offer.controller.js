import {
    getOfferAll,
    getOfferofPost,
    getOfferbyId,
    createOffer,
    deleteOffer
} from "../services/offer.service.js";

export const getOfferAllController = async (req, res) => {
    const offer = await getOfferAll();
    if (!offer.length) {
        return res.status(404).json({ message: "No records available at the moment" });
    }
    return res.status(200).json(offer);
}

export const getOfferofPostController = async (req, res) => {
    const id = req.params.id;
    const offer = await getOfferofPost(id);
    if (!offer.length) {
        return res.status(404).json({ message: "No offer available at the moment" });
    }
    return res.status(200).json(offer);
}

export const getOfferbyIdController = async (req, res) => {
    const id = req.params.id;
    const offer = await getOfferbyId(id);
    if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
    }
    return res.status(200).json(offer);
}

export const createOfferController = async (req, res) => {
    const data = req.body;
    try {
        await createOffer(data);
        res.status(200).json({ message: "Offer created successfully "});
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error:  + ${error}`});
    }
};

export const deleteOfferController = async (req, res) => {
    const id = req.params.id;
    const offer = await getOfferbyId(id);
    if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
    }
    try {
        await deleteOffer(id);
        res.status(200).json({ message: "Offer deleted successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}