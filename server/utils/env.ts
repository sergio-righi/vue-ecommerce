import dotenv from 'dotenv'
import convict from 'convict';

dotenv.config();
export default convict({
  env: {
    default: 'dev',
    env: 'NODE_ENV',
  },
  http: {
    port: {
      doc: 'The port to listen on',
      default: 4001,
      env: 'PORT',
    },
    host: {
      default: 'http://localhost',
      env: 'HOST',
    }
  },
  api: {
    doc: 'Auth key for making requests',
    default: '',
    env: 'API_KEY',
  },
  mongoose: {
    doc: 'Mongoose connection string',
    default: 'mongodb://127.0.0.1:27017/vue-nuxt-sample',
    env: 'MONGODB_URI',
  },
  cors: {
    default: '*',
    env: 'CORS_ORIGIN'
  },
  authorization: {
    secret: {
      doc: 'The signing key for the JWT',
      default: '',
      env: 'AUTH_SECRET',
    },
    iv: {
      doc: 'The signing iv for the JWT',
      default: '',
      env: 'AUTH_IV',
    }
  }
}).validate()