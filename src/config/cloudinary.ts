import cloudinary from 'cloudinary'
import config from './index'
cloudinary.v2.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryKey,
  api_secret: config.cloudinarySecret,
})
export default cloudinary
