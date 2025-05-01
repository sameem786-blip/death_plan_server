const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const fs = require("fs");
const path = require("path");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadsDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const compressVideo = (filePath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .outputOptions([
        "-vcodec libx264", // Use H.264 codec
        "-crf 28", // Compression level (lower = better quality, higher = smaller size)
        "-preset veryfast", // Faster compression
      ])
      .on("end", () => resolve(outputPath))
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
};

const uploadFile = async (req, res) => {
  console.log(process.env.AWS_ACCESS_KEY_ID, "key");
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "File is required" });
  }

  const isVideo = file.mimetype.startsWith("video/");
  const isImage = file.mimetype.startsWith("image/");

  console.log("isVideo", isVideo);
  console.log("Uploading file...");

  try {
    let filePath = file.path;
    let uploadFilePath = filePath;

    if (isVideo) {
      const compressedFilePath = path.join(
        __dirname,
        "../uploads",
        `compressed-${Date.now()}.mp4`
      );
      await compressVideo(file.path, compressedFilePath);
      uploadFilePath = compressedFilePath;
    }

    const fileContent = fs.readFileSync(uploadFilePath);

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: fileContent,
      ContentType: file.mimetype,
    };

    const s3Response = await s3.send(new PutObjectCommand(uploadParams));

    fs.unlinkSync(file.path);
    if (isVideo) fs.unlinkSync(uploadFilePath);

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`,
    });
  } catch (error) {
    console.error(error);

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
};

module.exports = {
  uploadFile,
};
