import {
    getOfferAll,
    getOfferofPost,
    getOfferbyId,
    createOffer,
    deleteOffer,
    checkOffer
} from "../services/offer.service.js";
import { deletePost, getPostbyId } from "../services/post.service.js";
import { getMahasiswabyId } from "../services/mahasiswa.service.js";
import { getJadwalMahasiswaById } from "../services/jadwalmahasiswa.service.js";
import { createOfferValidation } from "../validations/offer.validation.js";
import { updateJadwalMahasiswa } from "../services/jadwalmahasiswa.service.js";

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

    const {error, value} = createOfferValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    const post = await getPostbyId(value.postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const mahasiswa = await getMahasiswabyId(value.mahasiswaId);
    if (!mahasiswa) {
        return res.status(404).json({ message: "Mahasiswa not found" });
    }

    const user = req.user;
    if (user.id !== mahasiswa.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    if (post.authorId == mahasiswa.id) {
        return res.status(404).json({ message: "You are not allowed to create offer for your own post" });
    }

    const offer = await checkOffer(mahasiswa.id, post.id);
    if (offer) {
        return res.status(404).json({ message: "You are not allowed to create duplicate offer" });
    }

    const jadwals = post.jadwal.map(jadwal => jadwal.id);
    const matkuls = post.jadwal.map(jadwal => jadwal.jadwal.mataKuliah.id);

    for (let id of value.jadwalId) {
        const jadwal = await getJadwalMahasiswaById(id);
        if (!jadwal) {
            return res.status(404).json({ message: "Jadwal not found" });
        }
        if (jadwal.mahasiswaId !== mahasiswa.id) {
            return res.status(404).json({ message: "You are not allowed to create offer for this Jadwal" });
        }
        if (jadwals.includes(id)) {
            return res.status(404).json({ message: "You can't offer the same jadwal" });
        }
        if (!matkuls.includes(jadwal.jadwal.mataKuliah.id)) {
            return res.status(404).json({ message: "You can't offer jadwal with different mata kuliah" });
        }
    }

    try {
        await createOffer(value);
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

    const user = req.user;
    if (user.role !== "Admin" && user.id !== offer.post.authorId && user.id !== offer.mahasiswaId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        await deleteOffer(id);
        res.status(200).json({ message: "Offer deleted successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}

export const acceptOfferController = async (req, res) => {
    const id = req.params.id;
    const offer = await getOfferbyId(id);
    if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
    }
    const penawar = offer.mahasiswaId;
    const penukar = offer.post.authorId;
    const jadwalPenukar = offer.post.jadwal.map(jadwal => jadwal.id);
    const jadwalPenawar = offer.jadwal.map(jadwal => jadwal.id);
    
    const user = req.user;
    if (user.id !== penukar) {
        return res.status(403).json({ message: "Forbidden" });
    }

    for (let id of jadwalPenukar) {
        try {
            updateJadwalMahasiswa(id, penawar);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error " + error});
        }
    }
    for (let id of jadwalPenawar) {
        try {
            updateJadwalMahasiswa(id, penukar);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error " + error});
        }
    }

    try {
        await deletePost(offer.post.id);
        res.status(200).json({ message: "Offer accepted successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}