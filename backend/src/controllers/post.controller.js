import { 
    getPostAll,
    getPostbyId,
    getPostbyMatkul,
    getPostofUser,
    createPost,
    deletePost
} from "../services/post.service.js";
import { getMatkulbyKode } from "../services/matkul.service.js";
import { createPostValidation } from "../validations/post.validation.js";
import { getJadwalMahasiswaById } from "../services/jadwalmahasiswa.service.js";
import { getMahasiswabyId } from "../services/mahasiswa.service.js";


export const getPostAllController = async (req, res) => {
    const posts = await getPostAll();
    if (!posts.length) {
        return res.status(404).json({ message: "No records available at the moment" });
    }
    return res.status(200).json(posts);
}

export const getPostByIdController = async (req, res) => {
    const id = req.params.id;
    const post = await getPostbyId(id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
}

export const getPostbyMatkulController = async (req, res) => {
    const kode = req.params.kode;

    const matkul = await getMatkulbyKode(kode);
    if (!matkul) {
        return res.status(404).json({ message: "Mata Kuliah not found" });
    }
    const posts = await getPostbyMatkul(matkul.id);
    if (!posts.length) {
        return res.status(404).json({ message: `No Post about ${matkul.nama}` });
    }
    return res.status(200).json(posts);
}

export const getPostofUserController = async (req, res) => {
    const id = req.params.id;
    const user = await getMahasiswabyId(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const posts = await getPostofUser(id);
    if (!posts.length) {
        return res.status(404).json({ message: "No records available at the moment" });
    }
    return res.status(200).json(posts);
}

export const createPostController = async (req, res) => {
    const data = req.body;
    const {error, value} = createPostValidation(data);
    if (error) {
        return res.status(404).json({ message: `${error}` });
    }

    const author = await getMahasiswabyId(value.authorId);
    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }
    for (let id of value.jadwalId) {
        const jadwal = await getJadwalMahasiswaById(id);
        if (!jadwal) {
            return res.status(404).json({ message: "Jadwal not found" });
        }
    
        if (jadwal.mahasiswaId !== author.id) {
            return res.status(404).json({ message: "You are not allowed to create post for this Jadwal" });
        }
    }

    try {
        await createPost(value);
        res.status(200).json({ message : "Post created successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}

export const deletePostController = async (req, res) => {
    const id = req.params.id;
    const post = await getPostbyId(id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    try {
        await deletePost(id);
        res.status(200).json({ message: "Post deleted successfully "});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error});
    }
}