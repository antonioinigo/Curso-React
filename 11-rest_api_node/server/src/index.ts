import colors from "colors";
import server from "./server";

const port = process.env.PORT || 4000;

server.listen(4000, () => {
  console.log(colors.bgBlue.white(`REST API en el puerto ${port}`));
});