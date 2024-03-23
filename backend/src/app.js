import 'dotenv/config';
import web from './middlewares/web.js';

const PORT = process.env.PORT || 3000;
web.listen(PORT, () => console.log(`Server running on port ${PORT}`));