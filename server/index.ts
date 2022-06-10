
import app from './app';
import { env } from "./utils";

const PORT = env.PORT || 4000

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
})