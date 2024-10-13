const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("../../config/lib/cloudinary.js");

const createPost = async (req, res) => {
  try {
    const {
      name_member,
      placeOfBirth,
      birth_date,
      address,
      phoneNumber,
      hobbies,
    } = req.body;

    const file = req.file;

    if (
      !name_member ||
      !placeOfBirth ||
      !birth_date ||
      !address ||
      !phoneNumber ||
      !hobbies
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields",
      });
    }

    if (!file) {
      return res.status(400).json({
        status: "error",
        message: "Please upload an image",
      });
    }

    // Upload gambar ke Cloudinary
    let imageUrl;
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "images/memberImages",
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "Failed to upload image to Cloudinary!",
        error: error.message,
      });
    }

    // Buat anggota komunitas baru
    const result = await prisma.communityMember.create({
      data: {
        name_member,
        placeOfBirth,
        birth_date: new Date(birth_date), // Pastikan ini adalah Date
        address,
        phoneNumber,
        hobbies: hobbies.split(",").map((hobby) => hobby.trim()), // Pastikan ini adalah array
        image_url: imageUrl,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getAllMembers = async (req, res) => {
  try {
    // Menggunakan findMany untuk mendapatkan semua anggota
    const result = await prisma.communityMember.findMany();
    res.status(200).json({
      status: "success",
      message: "Members retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    const id = req.params.id; // Ambil ID dari URL parameter
    const existingMember = await prisma.communityMember.findUnique({
      where: {
        id: id, // Pastikan untuk menggunakan ID yang tepat
      },
    });

    if (!existingMember) {
      return res.status(404).json({
        status: "error",
        message: "Member not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Member retrieved successfully",
      data: existingMember, // Mengembalikan data anggota
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const id = req.params.id; // Ambil ID dari URL parameter
    const { name_member, placeOfBirth, birth_date, address, hobbies } =
      req.body;

    // Memeriksa apakah anggota ada
    const existingMember = await prisma.communityMember.findUnique({
      where: { id: id },
    });

    if (!existingMember) {
      return res.status(404).json({
        status: "error",
        message: "Member not found",
      });
    }

    let image_url = existingMember.image_url; // Ambil URL gambar yang sudah ada

    // Jika ada file baru yang di-upload
    if (req.file) {
      // Hapus gambar lama dari Cloudinary jika ada
      if (image_url) {
        const publicId = image_url.split("/").pop().split(".")[0]; // Ambil public ID dari URL
        await cloudinary.uploader.destroy(publicId); // Hapus gambar lama dari Cloudinary
      }

      // Upload gambar baru ke Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "members", // Folder penyimpanan di Cloudinary
      });

      // Set URL gambar dari Cloudinary
      image_url = result.secure_url;
    }

    // Parsing hobbies jika dikirim sebagai string JSON
    let parsedHobbies = hobbies;
    if (typeof hobbies === "string") {
      parsedHobbies = JSON.parse(hobbies);
    }

    // Data yang akan diperbarui
    const data = {
      name_member,
      placeOfBirth,
      birth_date: new Date(birth_date), // Pastikan format date sesuai
      address,
      hobbies,
      image_url,
    };

    // Update anggota di database
    const updatedMember = await prisma.communityMember.update({
      where: { id: id },
      data: data,
    });

    res.status(200).json({
      status: "success",
      message: "Member updated successfully",
      data: updatedMember,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const id = req.params.id; // Ambil ID dari URL parameter

    // Pertama, ambil anggota yang ada untuk mendapatkan informasi image_url
    const existingMember = await prisma.communityMember.findUnique({
      where: { id: id },
    });

    if (!existingMember) {
      return res.status(404).json({
        status: "error",
        message: "Member not found",
      });
    }

    // Hapus file dari Cloudinary jika image_url ada
    if (existingMember.image_url) {
      const publicId = existingMember.image_url.split("/").pop().split(".")[0]; // Ambil public ID dari URL
      await cloudinary.uploader.destroy(publicId); // Hapus gambar dari Cloudinary
    }

    // Hapus anggota dari database
    const result = await prisma.communityMember.delete({
      where: { id: id },
    });

    res.status(200).json({
      status: "success",
      message: "Member deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
