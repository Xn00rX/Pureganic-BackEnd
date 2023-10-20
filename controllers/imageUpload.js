exports.imageUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  else{
    console.log("image uploaded")
    console.log(req.file.path)
  return res.status(200).json({ message: 'File uploaded successfully' })
}
}